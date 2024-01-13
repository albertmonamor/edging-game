import binascii
import os
from datetime import timedelta
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


FILE_NAME_DB = "edging"


M_APP = Flask("main", template_folder="tmp")

M_APP.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{FILE_NAME_DB}.db"
M_APP.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # // default
M_APP.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=30)
M_APP.secret_key = binascii.hexlify(os.urandom(25)).decode()
db = SQLAlchemy(M_APP)