#!/bin/bash

source secret_values.sh
cd ../
export GOOGLE_APPLICATION_CREDENTIALS="/Users/mindybraasch/Documents/joshua/work/Book_Organizer/app/cloud_credentials/book-organizer-credentials.json"
python3 cloud_sql_connecter.py