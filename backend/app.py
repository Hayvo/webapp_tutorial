from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models.models import db
from flask_migrate import Migrate
from flask import request
from config import Config

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = Config.JWT_ACCESS_TOKEN_EXPIRES
app.config["SQLALCHEMY_DATABASE_URI"] = Config.SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = Config.SQLALCHEMY_TRACK_MODIFICATIONS
migrate = Migrate(app, db)

jwt = JWTManager(app)

# from routes.ETLs_routes import etls_routes
from routes.user_routes import users_routes
from routes.login_routes import login_routes

app.register_blueprint(users_routes)
app.register_blueprint(login_routes)

@app.after_request
def add_security_headers(response):
    ''' Add security headers to the response for CORS and security policies. 
    This function checks the request's origin and sets appropriate headers to allow CORS
    and to enforce security policies like Cross-Origin-Opener-Policy.'''
    origin = request.headers.get("Origin")
    print(f"Origin: {origin}")
    if origin in Config.ALLOWED_ORIGINS:
        response.headers["Cross-Origin-Opener-Policy"] = "same-origin-allow-popups"
        response.headers["Access-Control-Allow-Origin"] = origin  
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

if __name__ == '__main__':
    # Create initial database tables within the application context
    try:
        with app.app_context():
            db.init_app(app)
            db.create_all()
            print("Database tables created successfully.")
    except Exception as e:
        print(f"Error creating database tables: {e}")

    app.run(debug=True, port=5000)