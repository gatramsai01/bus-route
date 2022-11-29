from datetime import timedelta,datetime
from flask import request,jsonify
import jwt,os
from werkzeug.utils import secure_filename
from pytimeparse.timeparse import timeparse
from connection import db
from models.User import User

from auth_token import token_required
from validate import allowed_file, validate_emailandpassword
from context import app




# /user/

# /image/

@app.route('/user',methods=["GET"])
@token_required
def user(current_user):
    """
    gets the current user data 

    Args:
        current_user (dict): return value from token_required warper function

    Return:
            
    """

    return{
        "data":current_user,
        "message":"jwt token valid"
    },200


# request body{
# 
# 
# email:
# password:
# 
# 
# }

@app.route("/user/login",methods=["POST"])
def login():
    """
    user login route

    Method: POST

    Request body:
        email(string), password(string)

    Returns:
        : _description_
    """


    try:
        data=request.json
        # print(data)
        if not data:
                return {
                    "message": "Please provide user details",
                    "data": None,
                    "error": "Bad request"
                }, 400

        #validate mail and password
        is_validate=validate_emailandpassword(email=data["email"],password=data["password"])
        if not is_validate:
            return dict(
                data=None,
                message="email and password invaild"

            ),401
        
        user=User(db).login(email=data["email"],password=data["password"])
        if user:
            print(datetime.now()+timedelta(seconds=timeparse(app.config['JWT_EXPIRE'])))
            try:
                user["token"]=jwt.encode(
                    {
                        'user_id':user['_id'],
                        'exp':datetime.now().timestamp()+timedelta(seconds=timeparse(app.config['JWT_EXPIRE'])).total_seconds()
                    }
                    ,app.config['JWT_SECRET'],
                    algorithm="HS256"
                )
                return jsonify({
                    "data":user,
                    "message":"login successful"
                })
            except Exception as err:
                return dict(
                    data=None,
                    message=str(err)
                ),500

        # if not user:
        #     return{
        #         "message": "user does not exists",
        #         "data": None,
        #         "error": "Unauthorized"
        #     },404
        return {
                "message": "invalid email or password",
                "data": None,
                "error": "Unauthorized"
            }, 404
    
    except Exception as err:

        return jsonify({
            "data":None,
            "message":str(err),
            "error_in":"out of mail try block"
        }),500




# request body{
# 
# fName
# lName
# email
# password
# }

@app.route('/user/add',methods=["POST"])
def add_user():
    """_summary_

    Returns:
        _type_: _description_
    """

    try:
        data=request.json

        if not data:
                return {
                    "data":None,
                    "message":"please provide details"
                    
                },400
        
        user=User(db).get_by_email(data["email"])

        if user:
            return {
                "data":None,
                "message":"user already exists"
            },409

        is_valid=validate_emailandpassword(data['email'],data['password'])

        if is_valid:
            user=User(db).create(name=data['name'],email=data['email'],password=data['password'],uid=data['uid'],ed=data['ed'])
            user.pop("password")

            return {
                "data":user,
                "message":" user created successfully"
            }

        else:
            return {
                "data":None,
                "message":"Please enter valid email and password"
            },400
    except Exception as err:
        return jsonify( {
            "data":None,
            "message":str(err)
        }),500



# 

if __name__=="__main__":
    app.run(debug=True)
