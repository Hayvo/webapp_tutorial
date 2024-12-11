from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.security import check_password_hash, generate_password_hash
from models.models import User
from models.models import db
import traceback

users_routes = Blueprint('users_routes', __name__)

# Authentication endpoint
@users_routes.route('/login', methods=['POST'])
def login():
    '''
    This function logs in a user. The username and password are passed in the request body.
    '''
    try:
        print(request.json)
        body = request.json
        username = body.get('username')
        password = body.get('password')

        user = User.query.filter_by(username=username).first()

        if user and password == user.password:
            user_d = {"id": user.id,
                        "username": user.username, 
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "role": user.role}
            return user_d, 200
        else:
            return jsonify({"msg": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"msg": "Error logging in"}), 500
    
@users_routes.route('/user', methods=['POST'])
def create_user():
    '''
    This function creates a new user. The creator_id is passed in the request body.
    '''
    try:
        new_user_data = request.json
        new_user = User(**new_user_data)
        if new_user.username in [user.username for user in User.query.all()]:
            print("Username already taken")
            return jsonify({"msg": "Username already taken"}), 400
        db.session.add(new_user)
        db.session.commit()
        print(new_user.serialize())
        return jsonify(new_user.serialize()), 201
    except Exception as e:
        traceback.print_exc()
        return jsonify({"msg": "Error creating user"}), 500
    
@users_routes.route('/users', methods=['GET'])
def get_users():
    '''
    This function gets all users.
    '''
    try:
        users = User.query.all()
        return jsonify([user.serialize() for user in users]), 200
    except Exception as e:
        return jsonify({"msg": "Error getting users"}), 500
    
@users_routes.route('/user/<id>', methods=['GET'])
def get_user(id):
    '''
    This function gets a user by id.
    '''
    try:
        user = User.query.get(id)
        return jsonify(user.serialize()), 200
    except Exception as e:
        return jsonify({"msg": "Error getting user"}), 500
    
@users_routes.route('/user/<id>', methods=['DELETE'])
def delete_user(id):
    '''
    This function deletes a user by id.
    '''
    try:
        user = User.query.get(id)
        if user == None:
            return jsonify({"msg": "User not found"}), 404
        if user.role == 'Superadmin':
            return jsonify({"msg": "Cannot delete superadmin"}), 401
        db.session.delete(user)
        db.session.commit()
        return jsonify({"msg": "User deleted"}), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({"msg": "Error deleting user"}), 500
    
@users_routes.route('/user/<id>', methods=['PUT'])
def update_user(id):
    '''
    This function updates a user by id. The new data is passed in the request body.
    '''
    try:
        data = request.json
        user = User.query.get(id)
        for key, value in data.items():
            if value != None:
                setattr(user, key, value)
        db.session.commit()
        return jsonify(user.serialize()), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({"msg": "Error updating user"}), 500

@users_routes.route('/user/<id>/change_password', methods=['PUT'])
def change_password(id):
    '''
    This function changes a user's password. The old password and new password are passed in the request body.
    '''
    try:
        data = request.json
        user = User.query.get(id)
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        if user.password == old_password:
            user.password = new_password
            db.session.commit()
            return jsonify(user.serialize()), 200
        else:
            return jsonify({"msg": "Invalid password"}), 401
    except Exception as e:
        return jsonify({"msg": "Error changing password"}), 500
