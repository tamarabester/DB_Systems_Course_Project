import mysql.connector
from utils.config import *

DB_CONNECTION = None

def init_db_connection():
    global DB_CONNECTION
    DB_CONNECTION = mysql.connector.connect(
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        host=MYSQL_HOST,
        database=MYSQL_DB
    )

