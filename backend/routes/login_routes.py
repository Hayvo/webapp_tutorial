from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token,jwt_required
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from flask_cors import cross_origin 
from dotenv import load_dotenv
import os
import traceback
from models.models import User, db

login_routes = Blueprint('login_routes', __name__)
load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


def verify_google_token(token):
    try:
        # Verify the token
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), GOOGLE_CLIENT_ID)

        # Ensure the token is from Google
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Invalid token issuer.')

        # Ensure the token is intended for this client
        if idinfo['aud'] != GOOGLE_CLIENT_ID:
            raise ValueError('Token not meant for this app.')

        # Extract user information
        return idinfo

    except Exception as e:
        print(f"Error verifying Google token: {e}")
        return {"success": False, "error": str(e)}


@login_routes.route('/health', methods=['GET'])
def health_check():
    '''
    Health check endpoint to verify the service is running.
    '''
    return jsonify({"status": "healthy"})

@login_routes.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin()
def login():
    ''' Login endpoint that verifies Google ID token and retrieves user information.
    This endpoint expects a JSON body with an "id_token" field containing the Google ID token.
    If the token is valid, it retrieves user information and creates a JWT access token.
    If the token is invalid, it returns an error message.
    '''
    try:
        data = request.get_json()
        google_token = data.get("id_token")

        if not google_token:
            return jsonify({"success": False, "error": "Missing Google ID token"}), 400

        user_info = verify_google_token(google_token)

        if not user_info["success"]:
            return jsonify({"status": "error", "message": user_info["error"]}), 401

        # VALIDATE USER INFO
        userExists = User.query.filter_by(google_id=user_info["sub"]).first()

        if not userExists:
            return jsonify({'status': 'error', 'message': 'User does not exist! Please sign up.'}), 401

        if  user_info.get("email_verified", False):
            access_token = create_access_token(identity=user_info["user_id"])
            user_info["access_token"] = access_token
            return jsonify({'status': 'success', 'user': user_info,  'message': 'Login successful!'}), 200
        else:
            return jsonify({'status': 'error', 'message': 'Invalid credentials!'}), 401

    except Exception as e:
        traceback.print_exc()
        return jsonify({'status': 'error', 'message': f'Error logging in: {e}'}), 500
    
@login_routes.route('/register', methods=['POST'])
@cross_origin()
def register():
    ''' Register endpoint that verifies Google ID token and registers a new user.
    This endpoint expects a JSON body with an "id_token" field containing the Google ID token'''

    try:
        data = request.get_json()
        google_token = data.get("id_token")

        if not google_token:
            return jsonify({"success": False, "error": "Missing Google ID token"}), 400

        user_info = verify_google_token(google_token)

        if not user_info["success"]:
            return jsonify({"status": "error", "message": user_info["error"]}), 401

        # Check if user already exists
        userExists = User.query.filter_by(google_id=user_info["sub"]).first()

        if userExists:
            return jsonify({'status': 'error', 'message': 'User already exists! Please log in.'}), 409

        # Register new user
        new_user = {
            "google_id": user_info["sub"],
            "email": user_info["email"],
            "first_name": user_info.get("given_name"),
            "last_name": user_info.get("family_name"),
            "profile_picture": user_info.get("picture"),
            "click_counter": 0  
        }

        # Create a new User instance
        user = User(**new_user)
        db.session.add(user)
        db.session.commit()

        access_token = create_access_token(identity=user_info["sub"])
        new_user["access_token"] = access_token

        return jsonify({'status': 'success', 'user': new_user, 'message': 'Registration successful!'}), 201

    except Exception as e:
        traceback.print_exc()
        return jsonify({'status': 'error', 'message': f'Error registering: {e}'}), 500