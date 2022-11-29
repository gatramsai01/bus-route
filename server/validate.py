import re
import string
mail_format= r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
pass_format= r'[A-Za-z0-9@#$%^&+=]{8,}'

def validate_emailandpassword(email: string,password : string):
    """
        validation of the user email and password

    Args:
        email (string): email of the user   
        password (string): password of the user

    Returns:
        boolean : 
    """

    email_vaild=re.fullmatch(mail_format,email)
    pass_vaild=re.fullmatch(pass_format,password)

    if  not email_vaild:
        return False
    
    return True



def allowed_file(filename:str):
    """
    Checks if the file is in the allowed file extensions 

    Args:
        filename (str): name of the upload file 

    Returns:
        bool: if file extension is present in allowed extension returns True else False
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS