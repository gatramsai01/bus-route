from pymongo import MongoClient
from context import app


mongo_url=app.config['MONGO_URL']


try:
    client=MongoClient(mongo_url)
    db=client['test']
    #:mongoDB database connection
    db.__doc__="mongoDB database connection"
    print("database connection successful")
except Exception as err:
    print(str(err))
