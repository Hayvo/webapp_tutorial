import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:webapp_tutorial_frontend/providers/userProvider.dart';
import 'package:webapp_tutorial_frontend/models/userModel.dart';
import 'package:webapp_tutorial_frontend/pages/loginPage.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<AppState>(
          create: (_) => AppState(),
        ),
        ChangeNotifierProvider<UserProvider>(
          create: (_) => UserProvider(),
        ),
      ],
      child: MaterialApp(
        title: 'WebApp Tutorial',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(
              seedColor: const Color.fromARGB(255, 99, 47, 219)),
          useMaterial3: true,
        ),
        home: const LoginPage(),
      ),
    );
  }
}

class AppState with ChangeNotifier {
  UserModel _currentUser = UserModel(
      id: null,
      first_name: null,
      email: null,
      role: null,
      last_name: null,
      username: null);
  UserModel get currentUser => _currentUser;

  void setUser(UserModel user) {
    _currentUser = user;
    notifyListeners();
  }

  void resetUser() {
    _currentUser = UserModel(
        id: null,
        first_name: null,
        email: null,
        role: null,
        last_name: null,
        username: null);
    notifyListeners();
  }
}
