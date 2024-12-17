import 'package:webapp_tutorial_frontend/models/userModel.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:webapp_tutorial_frontend/main.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  void logout(BuildContext context) {
    // Clear the user data or perform any other logout actions
    Provider.of<AppState>(context, listen: false).resetUser();
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final UserModel currentUser = Provider.of<AppState>(context).currentUser;

    return Scaffold(
        appBar: AppBar(
          title: const Text('Home Page'),
          actions: [
            IconButton(
              icon: const Icon(Icons.logout),
              onPressed: () => logout(context),
            ),
          ],
        ),
        body: Column(children: [
          const SizedBox(height: 20),
          Text('Welcome ${currentUser.first_name} ${currentUser.last_name}'),
          const SizedBox(height: 20),
        ]));
  }
}
