import os

import sqlalchemy
from google.cloud.sql.connector import Connector, IPTypes

# Python Connector database connection function
from sqlalchemy import MetaData
from sqlalchemy.orm import declarative_base, sessionmaker


def getconn():
    USER = os.environ.get("USER")
    PASSWORD = os.environ.get("PASSWORD")
    INSTANCE_CONNECTION_NAME = os.environ.get("INSTANCE_CONNECTION_NAME")
    DB = os.environ.get("DB")

    with Connector() as connector:
        conn = connector.connect(INSTANCE_CONNECTION_NAME,
                                 "pg8000",
                                 user=USER,
                                 password=PASSWORD,
                                 db=DB,
                                 ip_type=IPTypes.PUBLIC
                                 )
        return conn


Base = declarative_base(metadata=MetaData(schema="bookorgdb"))
"""
base class for all models. NOTE: schema must be created manually in db before running.
"""


class DynamicDatabase:
    """
    Dynamic Database is used for spinning up a database engine and providing
    the gateway for transaction classes to conduct database queries.
    """

    def __init__(self):
        """
        Initialize the dynamic database connection.
        """
        # self.cloud_sql_dir: str = os.environ.get(CLOUD_SQL_DIR)
        self.is_engine_created: bool = False
        self.engine = None
        self.session = None

        self.test_connection()

    def create_engine(self) -> bool:
        """
        Create an instance of a SQL Alchemy database engine.
        :return: True if the instance has been created, false if the instance creation fails.
        """
        try:
            self.engine = sqlalchemy.create_engine("postgresql+pg8000://", creator=getconn)
            self.is_engine_created = True
            self.session = sessionmaker(bind=self.engine)

        except Exception as exception:
            print(f"CONNECTION EXCEPTION OCCURRED: {exception}")
            self.is_engine_created = False

        return self.is_engine_created

    def test_connection(self) -> bool:
        """
        Test the creation of a SQL Alchemy database engine.
        :return: True if the engine is active.  False if it is not.
        """

        if not self.is_engine_created and not self.create_engine():
            return False

        return self.is_engine_created

    def create_all_tables(self):
        # create all tables if they do not exist
        Base.metadata.create_all(self.engine)

    def execute(self):
        with self.engine.connect() as db_conn:
            # get current datetime from database
            results = db_conn.execute(sqlalchemy.text("SELECT NOW()")).fetchone()
            # output time
            print("Current time: ", results[0])
        return results


db = DynamicDatabase()
