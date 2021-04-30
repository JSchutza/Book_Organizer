-----------------------------------------------------------


# Users
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
| username       | string()      | not null,             |
| email          | string()      | null,                 |
| is_staff       | boolean       | not null,             |
| bio            | text          | null,                 |
| location       | string(100)   | null,                 |
| birthday       | date          | null,                 |
|liked_characters| int           | null, FK              |
|users_private_chars| int        | null, FK              |
|created_entries | int           | null, FK              |
|current_books   | int           | null, FK              |




-----------------------------------------------------------




# PublicCharacter
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
| character_name | string(100)   | not null,             |
| character_label| string(100)   | not null,             |
| pub_date       | datetime      | not null,             |
| published      | boolean       | not null,default=false|
| creator        | string(100)   | null,                 |


-----------------------------------------------------------

# PrivateCharacter
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
| character_name | string(100)   | not null,             |
|character_label | string(100)   | not null,             |
| creator        | string(100)   | null,                 |



-----------------------------------------------------------

# Entry
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
| title          | string(100)   | not null,             |
| text           | text          | not null,             |


-----------------------------------------------------------


# Books
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
|the_title       | string(100)   | not null              |
|the_entries     | int           | null, FK              |
|assigned_private_chars| int     | null, FK              |
|assigned_liked_chars| int       | null, FK              |



-----------------------------------------------------------


# Question
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
|question_text   | string(100)   | not null,             |
|pub_date        | datetime      | not null,             |




-----------------------------------------------------------

# Choice
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
|question        | int           | null, FK              |

-----------------------------------------------------------
