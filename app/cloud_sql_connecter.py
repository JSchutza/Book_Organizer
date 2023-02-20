from google.cloud.sql.connector import Connector, IPTypes
import sqlalchemy

from config import Config

USER = Config.USER
PASSWORD = Config.PASSWORD
INSTANCE_CONNECTION_NAME = Config.INSTANCE_CONNECTION_NAME
DB = Config.DB

# initialize connector
connector = Connector()


def getconn():
    if INSTANCE_CONNECTION_NAME is None:
        print("An issue occurred with the connection values.")
        exit()
    conn = connector.connect(
        INSTANCE_CONNECTION_NAME,
        "pg8000",
        user=USER,
        password=PASSWORD,
        db=DB,
        ip_type=IPTypes.PUBLIC
    )
    return conn


# create connection pool
pool = sqlalchemy.create_engine("postgresql+pg8000://", creator=getconn)

# connect to connection pool
with pool.connect() as db_conn:
    # get current datetime from database
    results = db_conn.execute(sqlalchemy.text("SELECT NOW()")).fetchone()
    # output time
    print("Current time: ", results[0])

# cleanup connector
connector.close()
