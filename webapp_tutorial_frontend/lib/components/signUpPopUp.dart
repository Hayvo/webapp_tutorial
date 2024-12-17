import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:webapp_tutorial_frontend/utils/config.dart';
import 'package:webapp_tutorial_frontend/models/userModel.dart';
import 'package:crypto/crypto.dart';

class SignupPopUp extends StatefulWidget {
  const SignupPopUp({super.key});

  @override
  _SignupPopUpState createState() => _SignupPopUpState();
}

class _SignupPopUpState extends State<SignupPopUp> {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController firstNameController = TextEditingController();
  final TextEditingController lastNameController = TextEditingController();
  bool _obscurePassword = true;

  void signUp(BuildContext context) async {
    final String username = usernameController.text;
    final String password = passwordController.text;
    final String email = emailController.text;
    final String firstName = firstNameController.text;
    final String lastName = lastNameController.text;
    final String usernameHashed;
    final String passwordHashed;

    usernameHashed = sha256.convert(utf8.encode(username)).toString();
    passwordHashed = sha256.convert(utf8.encode(password)).toString();

    final UserModel user = UserModel(
      username: usernameHashed,
      password: passwordHashed,
      email: email,
      first_name: firstName,
      last_name: lastName,
    );

    // try {
    final response = await http.post(
      Uri.parse('$SERVERURL/user'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(user.toJson()),
    );

    print("Ok1");

    if (response.statusCode == 201) {
      final activeUser = UserModel.fromJson(jsonDecode(response.body));

      Navigator.of(context).pop(activeUser);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Failed to sign up'),
        ),
      );
      Navigator.of(context).pop(false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign Up'),
      ),
      body: Column(
        children: [
          const SizedBox(height: 20),
          TextField(
            controller: usernameController,
            decoration: const InputDecoration(
              labelText: 'Username',
            ),
          ),
          TextField(
            controller: passwordController,
            obscureText: _obscurePassword,
            decoration: const InputDecoration(
              labelText: 'Password',
            ),
          ),
          TextField(
            controller: emailController,
            decoration: const InputDecoration(
              labelText: 'Email',
            ),
          ),
          TextField(
            controller: firstNameController,
            decoration: const InputDecoration(
              labelText: 'First Name',
            ),
          ),
          TextField(
            controller: lastNameController,
            decoration: const InputDecoration(
              labelText: 'Last Name',
            ),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () => signUp(context),
            child: const Text('Sign Up'),
          ),
        ],
      ),
    );
  }
}
