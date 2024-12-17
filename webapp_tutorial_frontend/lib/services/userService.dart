import 'dart:convert';
import 'package:webapp_tutorial_frontend/utils/config.dart';
import 'package:webapp_tutorial_frontend/models/userModel.dart';
import 'package:http/http.dart' as http;

class UserService {
  Future<List<UserModel>> getUsers() async {
    final response = await http.get(Uri.parse('$SERVERURL/users'));
    if (response.statusCode == 200) {
      final List<dynamic> body = jsonDecode(response.body) as List<dynamic>;
      final List<UserModel> users =
          body.map((dynamic item) => UserModel.fromJson(item)).toList();
      return users;
    } else {
      throw 'Failed to load users';
    }
  }

  Future<UserModel> getUser(int id) async {
    final response = await http.get(Uri.parse('$SERVERURL/user/$id'));
    if (response.statusCode == 200) {
      return UserModel.fromJson(jsonDecode(response.body));
    } else {
      throw 'Failed to load user';
    }
  }

  Future<UserModel> addUser(UserModel user) async {
    final response = await http.post(
      Uri.parse('$SERVERURL/user'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(user.toJson()),
    );
    if (response.statusCode == 201) {
      print(response.body);
      return UserModel.fromJson(jsonDecode(response.body));
    } else {
      throw '${jsonDecode(response.body)['msg']}, Response code :${response.statusCode}';
    }
  }

  Future<String> updateUser(UserModel user) async {
    final response = await http.put(
      Uri.parse('$SERVERURL/user/${user.id}'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(user.toJson()),
    );
    if (response.statusCode == 200) {
      return 'User updated successfully';
    } else {
      return 'Failed to update user';
    }
  }

  Future<List<dynamic>> deleteUser(int id) async {
    final response = await http.delete(Uri.parse('$SERVERURL/user/$id'));
    String responseMsg = jsonDecode(response.body)['msg'];
    return [responseMsg, response.statusCode];
  }
}
