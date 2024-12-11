from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models.models import db
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config.from_object(Config)
migrate = Migrate(app, db)

jwt = JWTManager(app)

# from routes.ETLs_routes import etls_routes
from routes.userRoutes import users_routes

app.register_blueprint(users_routes)

if __name__ == '__main__':
    # Create initial database tables within the application context
    try:
        with app.app_context():
            db.init_app(app)
            db.create_all()
            print("Database tables created successfully.")
    except Exception as e:
        print(f"Error creating database tables: {e}")

    app.run(debug=True)