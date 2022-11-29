import bson
import bcrypt


class User: 

    """
    This module contains all methods that are required to preform CRUD operations on mondoDB user collection
    """
    
    def __init__(self,db) :
        self.db=db
        return

    def create(self,uid,ed,name:str="",email:str="",password:str=""):
        """
        method creates user document in user collection in mongoDB

        Args:
            fName (str): first name of the user. Defaults to "".
            lName (str): last name of the user. Defaults to "".
            email (str): email of the user. Defaults to "".
            password (str): password of the user. Defaults to "".

        Returns:
            dict: will return created user document in mongoDB if user does not exists else return None
        """
        user=self.get_by_email(email=email)

        if user:
            return
        
        new_user=self.db.user.insert_one(
            {
                "name":name,
                "email":email,
                "Uid":uid,
                "Email domain":ed,
                "password":self.passEncrypt(password)
            }
        )

        return self.get_by_id(new_user.inserted_id)
    
    def login(self,email:str,password:str):
        """
        method is used for user login

        Args:
            email (str): user email id
            password (str): password entered by the user

        Returns:
            dict: user document if email is present and password matches else None
        """

        user=self.get_by_email(email=email)
        if_true=bcrypt.checkpw(hashed_password=user["password"].encode('utf-8'),password=password.encode('utf-8'))
        if not user or not if_true:
            return
        user.pop("password")
        return user



    def change_password(self,user_id:str,oldPass:str,newPass:str):
        """
        method is used to change user password

        Args:
            user_id (str): id of the user document
            oldPass (str): old password of the user 
            newPass (str): new password of the user

        Returns:
            dict: if the password is changed returns updated dic of the user else None
        """

        user=self.get_by_id(user_id)

        if not user or not bcrypt.checkpw(password=oldPass.encode('utf-8'),hashed_password=user["password"]) :
            return
        salt=bcrypt.gensalt()
        update_pass=self.db.user.update_one(
            {"_id":bson.ObjectId(user_id)},{
                "$set":{
                    "password":bcrypt.hashpw(password=newPass.encode('utf-8'),salt=salt)
                }
            }
        )

        user=self.get_by_id(user_id)
        user.pop("password")
        
        return user
    
    def get_by_email(self,email:str):
        """
        method is used to find user by email 

        Args:
            email (str): email id of the user

        Returns:
            dict: user document if email matches else None
        """
        
        user=self.db.user.find_one({"email":email})
        if not user:
            return
        user["_id"]=str(user["_id"])
        return user

    def get_by_id(self,id:str):
        """
        method is used to find user by document id 

        Args:
            id (str): user document id 

        Returns:
            dict: user document if user id matches else None
        """

        user=self.db.user.find_one({"_id":bson.ObjectId(id)})
        if not user:
            return
        user["_id"]=str(user["_id"])
        return user
    
    def passEncrypt(self,password:str):
        """
        method is used to convert password into hash bytes 

        Args:
            password (str): password entered by user

        Returns:
            str: hash bytes of the password
        """
        
        salt=bcrypt.gensalt()
        passBytes=password.encode('utf-8')
        return bcrypt.hashpw(passBytes,salt).decode('utf-8')




