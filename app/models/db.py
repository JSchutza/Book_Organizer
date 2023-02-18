from flask_sqlalchemy import SQLAlchemy
from google.cloud.sql.connector import Connector, IPTypes


# Python Connector database connection function
def getconn():
    with Connector() as connector:
        conn = connector.connect(
            "project:region:instance-name",  # Cloud SQL Instance Connection Name
            "pg8000",
            user="my-user",
            password="my-password",
            db="my-database",
            ip_type=IPTypes.PUBLIC  # IPTypes.PRIVATE for private IP
        )
        return conn


db = SQLAlchemy()
