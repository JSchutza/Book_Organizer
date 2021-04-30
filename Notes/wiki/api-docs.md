
# Login
`POST  /api/users/login`
   * used to login the user

# Logout
`DELETE /api/users/logout`
   * used to logout the user


# Signup
`POST /api/users/signup`
   * used to sign up a new user

# show user
`GET /api/users/`
   * used to show if a user is logged in or not.
   * gives JSON if there is a user and empty JSON object if there is not a user

# Posts
   * `GET /api/post`
   * `GET /api/post/:id`
   * `GET /api/post/u/:userId`
   * `POST /api/post`
   * `PUT /api/post/:id`
   * `DELETE /api/post/:id`

# Comments
   * `POST /api/post/:id/comments`
   * `PUT /api/post/:id/comments/:id`
   * `DELETE /api/post/:id/comments/:id`

# Search
   * `GET /api/search`

# Likes
   * `POST /api/post/:id/likes`
   * `DELETE /api/post/:id/likes/:id`
