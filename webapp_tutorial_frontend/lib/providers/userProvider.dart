import 'package:flutter/material.dart';
import 'package:webapp_tutorial_frontend/models/userModel.dart';
import 'package:webapp_tutorial_frontend/services/userService.dart';

class UserProvider extends ChangeNotifier {
  final UserService userService = UserService();

  List<UserModel> _users = [];
  List<UserModel> get users => _users;

  Future<UserModel> addUser(UserModel user) async {
    try {
      UserModel newUser = await userService.addUser(user);
      _users.add(newUser);
      notifyListeners();
      return newUser;
    } catch (e) {
      // Handle exceptions or show error messages
      print('Error adding user: $e');
      // Optionally throw an exception or return a default value
      throw 'Error adding user : $e';
    }
  }

  Future<String> deleteUser(UserModel user) async {
    List<dynamic> response = await userService.deleteUser(user.id ?? -1);
    if (response[1] == 200) {
      _users.remove(user);
      notifyListeners();
      print(users.length);
    }
    return response[0];
  }

  Future<String> updateUser(UserModel user) async {
    try {
      String response = await userService.updateUser(user);
      if (response == 'User updated successfully') {
        final index = _users.indexWhere((element) => element.id == user.id);
        if (index != -1) {
          _users[index] = user;
          notifyListeners();
        }
      } else {
        // Handle failed user update
        throw Exception('Failed to update user');
      }
      return response;
    } catch (e) {
      // Handle exceptions or show error messages
      print('Error updating user: $e');
      // Optionally use a dialog or snackbar to show the error message
      return 'Error updating user';
    }
  }

  Future<void> getUsers() async {
    try {
      _users = await userService.getUsers();
      notifyListeners();
    } catch (e) {
      // Handle exceptions or show error messages
      print('Error fetching users: $e');
      // Optionally use a dialog or snackbar to show the error message
    }
  }

  Future<UserModel> getUser(int id) async {
    try {
      UserModel user = await userService.getUser(id);
      return user;
    } catch (e) {
      // Handle exceptions or show error messages
      print('Error fetching user: $e');
      // Optionally throw an exception or return a default value
      throw Exception('Error fetching user');
    }
  }
}
