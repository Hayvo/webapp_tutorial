from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin 
from models.models import User
from models.models import db
import traceback

users_routes = Blueprint('users_routes', __name__)
    
@users_routes.route('/users', methods=['GET'])
@cross_origin()
@jwt_required()
def get_users():
    '''
    This function gets all users.
    '''
    try:
        users = User.query.all()
        return jsonify({"users": [user.serialize() for user in users], "msg": "Users retrieved"}), 200
    except Exception as e:
        return jsonify({"msg": "Error getting users"}), 500
    
@users_routes.route('/user/<id>', methods=['DELETE'])
@cross_origin()
@jwt_required()
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
@cross_origin()
@jwt_required()
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

@users_routes.route('/user/<id>/increase-counter', methods=['POST'])
@cross_origin()
@jwt_required()
def increase_user_counter(id):
    '''
    This function increases the click counter of a user by id.
    '''
    try:
        user = User.query.get(id)
        if user is None:
            return jsonify({"msg": "User not found"}), 404
        user.click_counter += 1
        db.session.commit()
        return jsonify({"msg": "User click counter increased", "user": user}), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({"msg": "Error increasing user click counter"}), 500
