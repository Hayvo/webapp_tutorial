class UserModel {
  int? id;
  String? first_name;
  String? email;
  String? role;
  String? last_name;
  String? username;
  String? password;

  UserModel({
    this.id,
    this.first_name,
    this.email,
    this.role,
    this.last_name,
    this.username,
    this.password,
  });

  UserModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    first_name = json['first_name'];
    email = json['email'];
    role = json['role'];
    last_name = json['last_name'];
    username = json['username'];
    password = json['password'];
  }

  Map<String, dynamic> toJson([int? creatorId]) {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['first_name'] = first_name;
    data['email'] = email;
    data['role'] = role;
    data['last_name'] = last_name;
    data['username'] = username;
    data['password'] = password;
    if (creatorId != null) {
      data['creator_id'] = creatorId;
    }
    return data;
  }
}
