from google.cloud.sql.connector import Connector
import sqlalchemy

# IAM database user parameter (IAM user's email)
IAM_USER = "js.joshua.schutza@gmail.com"

# initialize connector
connector = Connector()


# getconn now using IAM user and requiring no password with IAM Auth enabled
def getconn():
    conn = connector.connect(
        INSTANCE_CONNECTION_NAME,
        "pg8000",
        user=IAM_USER,
        db="postgres",
        enable_iam_auth=True
    )
    return conn


# create connection pool
pool = sqlalchemy.create_engine(
    "postgresql+pg8000://",
    creator=getconn,
)

# connect to connection pool
with pool.connect() as db_conn:
    # get current datetime from database
    results = db_conn.execute(sqlalchemy.text("SELECT NOW()")).fetchone()
    # output time
    print("Current time: ", results[0])

# cleanup connector
connector.close()
