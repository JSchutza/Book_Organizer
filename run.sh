#!/bin/bash

source ./app/scripts/secret_values.sh

export GOOGLE_APPLICATION_CREDENTIALS="/Users/mindybraasch/Documents/joshua/work/Book_Organizer/app/cloud_credentials/book-organizer-credentials.json"
python3 main.py