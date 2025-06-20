from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    google_id = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    profile_picture = db.Column(db.String(100), nullable=True)
    email_verified = db.Column(db.Boolean, default=False)
    click_counter = db.Column(db.Integer, default=0)
    
    def serialize(self):
        return {
            "id": self.id,
            "google_id": self.google_id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "profile_picture": self.profile_picture,
            "click_counter": self.click_counter
        }