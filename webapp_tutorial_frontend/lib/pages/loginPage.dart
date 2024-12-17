import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:webapp_tutorial_frontend/models/userModel.dart';
import 'package:webapp_tutorial_frontend/utils/config.dart';
import 'package:webapp_tutorial_frontend/pages/homePage.dart';
import 'package:webapp_tutorial_frontend/components/signUpPopUp.dart';
import 'package:crypto/crypto.dart';
import 'package:provider/provider.dart';
import 'package:webapp_tutorial_frontend/main.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  bool _obscurePassword = true;

  void login(BuildContext context) async {
    final String username = usernameController.text;
    final String password = passwordController.text;
    final String usernameHashed;
    final String passwordHashed;

    usernameHashed = sha256.convert(utf8.encode(username)).toString();
    passwordHashed = sha256.convert(utf8.encode(password)).toString();

    final response = await http.post(
      Uri.parse('$SERVERURL/login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'username': usernameHashed,
        'password': passwordHashed,
      }),
    );

    if (response.statusCode == 200) {
      final activeUser = UserModel.fromJson(jsonDecode(response.body));
      // Ensure UserModel is correctly set
      Provider.of<AppState>(context, listen: false).setUser(activeUser);

      // Ensure home navigation without passing name
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => const HomePage(),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Invalid username or password.'),
        ),
      );
    }
  }

  void signup(BuildContext context) {
    showDialog(context: context, builder: (context) => SignupPopUp()).then(
      (value) {
        if (value != false) {
          Provider.of<AppState>(context, listen: false).setUser(value);
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Sign up successful.'),
            ),
          );
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const HomePage(),
            ),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Failed to sign up.'),
            ),
          );
        }
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('DateGem Consulting Admin Platform'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(100.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              autofocus: true,
              controller: usernameController,
              decoration: const InputDecoration(labelText: 'Username'),
            ),
            TextField(
              controller: passwordController,
              obscureText: _obscurePassword,
              decoration: InputDecoration(
                labelText: 'Password',
                suffixIcon: IconButton(
                  icon: _obscurePassword
                      ? const Icon(Icons.visibility)
                      : const Icon(Icons.visibility_off),
                  onPressed: () {
                    setState(() {
                      _obscurePassword = !_obscurePassword;
                    });
                  },
                ),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => login(context),
              child: const Text('Login'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => signup(context),
              child: const Text('Sign Up'),
            ),
          ],
        ),
      ),
    );
  }
}
