# Users
### used to login the user
   * `POST  /api/users/login`
--------------------------------------
### used to logout the user
   * `DELETE /api/users/logout`
--------------------------------------
### used to sign up a new user
   * `POST /api/users/signup`
--------------------------------------
### gives JSON if there is a user and empty JSON object if there is not a user
   * `GET /api/users/`
### used to find a user by there unique search_id
   * `GET /api/users/:searchId`

--------------------------------------


# PublicCharacters
### used to get all of the public characters
   * `GET /api/allCharacters`
--------------------------------------
### used to get all of the public characters that a specific user has created
   * `GET /api/users/:userId/characters`
--------------------------------------
### used to create a new public character
   * `POST /api/characters/`
--------------------------------------
### used to delete a specific public character
   * `DELETE /api/characters/:characterId`
--------------------------------------
### used to update a specific public character
   * `PUT /api/characters/:characterId`
--------------------------------------


# Following
### used to follow another user
   * `POST /api/follows/:userId`
--------------------------------------
### used to unfollow another user
   * `DELETE /api/follows/:userId`
--------------------------------------
### used to view the users you follow and view their books
   * `GET /api/follows/:userId`
--------------------------------------


# Books
### used to create a new book for a user
   * `POST /api/books/new`
--------------------------------------
### used to update a existing book for a user
   * `PUT /api/books/:bookId`
--------------------------------------
### used to delete a existing book for a user
   * `DELETE /api/books/:bookId`
--------------------------------------

# PrivateCharacters
### used to create an character for a specific book
   *`POST /api/book/:bookId/character/new`
--------------------------------------
### used to update an specific character for a specific book
   * `PUT /api/book/:bookId/character/:characterId`
--------------------------------------
### used to delete an specific character from a specific book
   * `DELETE /api/book/:bookId/character/:characterId`
--------------------------------------


# Pages
### used to create an page for a specific book
   *`POST /api/book/:bookId/page/new`
--------------------------------------
### used to update an specific page for a specific book
   * `PUT /api/book/:bookId/page/:pageId`
--------------------------------------
### used to delete an specific page from a specific book
   * `DELETE /api/book/:bookId/page/:pageId`
--------------------------------------



# Polls
### used to create a poll
   * `POST /api/polls/new`
--------------------------------------
### used to delete a poll and all of its data
   * `DELETE /api/poll/:pollId`
--------------------------------------
### used to update a poll
   * `PUT /api/poll/:pollId`
--------------------------------------



# Comments
### used to create a comment on a specific poll
   * `POST /api/poll/:pollId/comment/new`
--------------------------------------
### used to delete a specific comment on a specific poll
   * `DELETE /api/poll/:pollId/comments/:commentId`
--------------------------------------
