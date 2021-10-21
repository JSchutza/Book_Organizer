import boto3
import uuid
import os


s3 = boto3.client("s3", aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY") )
BUCKET = "bookorganizer"
S3_LOCATION = f"https://{BUCKET}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


def get_s3_location():
  return S3_LOCATION


def allowed_file(filename):
  return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS




def get_unique_filename(filename):
  ext = filename.rsplit(".", 1)[1].lower()
  unique_filename = uuid.uuid4().hex
  return f"{unique_filename}.{ext}"




def upload_file(file, acl="public-read"):
  try:
    s3.upload_fileobj(file, BUCKET, file.filename, ExtraArgs={"ACL": acl, "ContentType": file.content_type} )
  except Exception as error:
    return {"errors": str(error)}

  return {"url": f"{S3_LOCATION}{file.filename}"}


def purge_aws_resource(the_key):
  s3.delete_object(Bucket=BUCKET, Key=the_key)
