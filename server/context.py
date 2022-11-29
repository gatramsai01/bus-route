from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app=Flask(__name__)
cors=CORS(app)  



app.config['MONGO_URL']=os.getenv('MONGO_URL')
app.config['MONGO_DATABASE']=os.getenv('MONGO_DATABASE')

app.config['JWT_SECRET']=os.getenv('JWT_SECRET')
app.config['JWT_EXPIRE']=os.getenv('JWT_EXPIRE')


