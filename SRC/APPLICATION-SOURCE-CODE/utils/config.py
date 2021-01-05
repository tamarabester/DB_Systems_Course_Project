import os
import mysql.connector
from utils.config import *


UI_FILES_DIR = os.getcwd() + "/ui/dynamic/"
UI_IMG_DIR = os.getcwd() + "/images/"

MYSQL_HOST = 'mysqlsrv1.cs.tau.ac.il'
MYSQL_USER = 'DbMysql19'
MYSQL_PASSWORD = 'DbMysql19'
MYSQL_DB = 'DbMysql19'

def init_db_connection():
    return mysql.connector.connect(
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        host=MYSQL_HOST,
        database=MYSQL_DB
    )

CONNECTION = init_db_connection()