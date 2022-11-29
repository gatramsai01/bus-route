from functools import wraps
import jwt
from flask import request
from flask import current_app
from models.User import *
from connection import db



def token_required(f):
    """
    Description:
                This function is used as a warpper function to authenticate user

    Args:
        f (function): It is the warpped funtion

    Returns:
        (dict): user details and the input function
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        
        token = None
        if "Authorization" in request.headers:
            
            token = request.headers["Authorization"].split(" ")[1]
        # print(request.headers)
        if not token:
            return {
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized"
            }, 401
        try:
            data=jwt.decode(token, current_app.config["JWT_SECRET"], algorithms=["HS256"])
            current_user=User(db).get_by_id(data["user_id"])
            if current_user is None:
                return {
                "message": "Invalid Authentication token!",
                "data": None,
                "error": "Unauthorized"
            }, 401
        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e)
            }, 500
        
        current_user.pop("password")
        return f(current_user, *args, **kwargs)

    return decorated