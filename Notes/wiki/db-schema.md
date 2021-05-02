-----------------------------------------------------------
# Users
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
| user_name      | string(45)    | not null,             |
| email          | string()      | not null, unique      |
| hashed_password| string(255)   | not null,             |
| bio            | text          | null,                 |
| location       | string(100)   | null,                 |
| avatar         | string()      | null,                 |
| birthday       | date          | null,                 |
| created_at     | datetime      | not null,             |

-----------------------------------------------------------
# PublicCharacters
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
| avatar         | string()      | null,                 |
| character_name | string(100)   | not null,             |
| character_label| string(100)   | not null,             |
| pub_date       | datetime      | not null,             |
| user_id        | int           | not null, FK          |
| created_at     | datetime      | not null,             |



-----------------------------------------------------------
# Books
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
| the_title      | string(100)   | not null,             |
| creator_id     | int           | not null, FK          |
| created_at     | datetime      | not null,             |


-----------------------------------------------------------
# PrivateCharacters
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
| avatar         | string()      | null,                 |
| character_name | string(100)   | not null,             |
| character_label| string(100)   | not null,             |
| book_id        | int           | not null, FK          |
| created_at     | datetime      | not null,             |

-----------------------------------------------------------
# Pages
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
| title          | string(100)   | not null,             |
| text           | text          | not null,             |
| book_id        | int           | not null, FK          |
| created_at     | datetime      | not null,             |





-----------------------------------------------------------
# Polls
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
| title          | string(100)   | not null,             |
| question_text  | string(100)   | not null,             |
| pub_date       | datetime      | not null,             |
| user_id        | int           | not null, FK          |
| created_at     | datetime      | not null,             |



-----------------------------------------------------------
# Comments
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
| answer_text    | string(100)   | not null,             |
| poll_id        | int           | not null, FK          |
| user_id        | int           | not null, FK          |
| created_at     | datetime      | not null,             |

-----------------------------------------------------------



-----------------------------------------------------------
# Following
| column name    | data type     | details               |
|----------------|---------------|-----------------------|
| id             | int           | not null, primary key |
| follower_id    | int           | not null, FK          |
| followee_id    | int           | not null, FK          |
-----------------------------------------------------------
