#!/bin/bash

source secret_values.sh
cd ../

# export GOOGLE_APPLICATION_CREDENTIALS="/Users/mindybraasch/Documents/joshua/work/Book_Organizer/app/cloud_credentials/book-organizer-credentials.json"
# python3 cloud_sql_connecter.py
export GOOGLE_APPLICATION_CREDENTIALS="B:\Portfolio_Pieces\App_Academy\Final_Projects\Book_Organizer\Book_Organizer\app\cloud_credentials\book-organizer-credentials.json"
C:/Users/MasterPudu/.pyenv/pyenv-win/versions/3.9.4/python.exe cloud_sql_connecter.py
