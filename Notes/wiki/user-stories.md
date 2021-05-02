----------
# Sign up
 As an unauthorized user, I want to be able to sign up for the website via a sign up form, so that I can access Book_Organizer.

 * ## Questions
* Will the user enter a username and an email address to sign up?
  - Yes a user will login with an email.

* Will we confirm their password during sign up?
  - Yes the user will be prompted to confirm their password

* What routes should we use for sign up?
  - We will use /signup for the route

* Where should the user be redirected after sign up?
  - User will be redirected to their profile page

* What happens if there is a user with the same email they used to sign up?
  - An error will be displayed to the user and they will be prompted to try again

* What happens if the user enters the wrong password confirmation?
  - An error will be displayed to the user and they will be prompted to try again


* ## Acceptance Criteria

* Given that I'm a user who has not signed up yet and when I'm on the /signup route
  - Then there will be a sign in form with an username, email and password field and a "signup" button to submit the form.

* When I try to fill out the form with a password shorter than 6 characters and press Enter or press the "Sign Up" button
  - Then at the top of the form, I will see a red message that tells the user that the password must be at least 6 characters long.


* When I try to fill out the form with a valid username, email, password, and press Enter or press the "Sign Up" button
  - Then I will be redirected to the new users profile page.

* Given that I am a user that just signed up when I refresh the homepage at the / route
  - Then I will still be logged in and it will redirect to the users profile page.

--------
# Login
 As an unauthorized user, I want to be able to login to the website via a form, so that I can access my private information.
 * ## Questions

* Will the user enter a username or an email address to login?
  - User will login via email and password


* What routes should we use for login?
  - User will login via /login `POST` route

* Where should the user be redirected after login?
  - User will be redirected to their /profile

* Will we allow OAuth authentication via a third party?
  - Not yet -- maybe in a future story.

* What happens if the user doesn't exist yet?
   - Display the message "Invalid Login, please try again." and they are redirected to the user registration form

* What happens if the user enters the wrong password?
   - Asynchronously Display the message "Invalid Login, please try again."

* What happens if the user enters the wrong email?
   - Asynchronously Display the message "Invalid Login, please try again."

* Can a user reset their password?
   - Not yet -- will be implemented in future release

* Should logging in use session-based or use token-based authentication?
   - I will be using session based authentication


 * ## Acceptance Criteria

* Given that I'm a logged-out user and when I'm on the /login route
   - Then there will be a login form with an email and password field and a "Login" button to submit the form.

* When I try to fill out the form with an invalid email and password combination and press Enter or press the "Login" button
   - Then at the top of the form, I will see a red message "Invalid Login, please try again."

* When I try to fill out the form with an email that doesn't exist in the system and press Enter or press the "Login" button
  - Then at the top of the form, I will see a red message "Invalid Login, please try again."

* When I try to fill out the form with a valid email and password and press press Enter or press the "Login" button
  - Then I will be redirected to my profile page at the /profile route.

* Given that I am a logged-in user when I refresh the homepage at the / route
  - Then I will still be logged in

* Given that I am a logged-out user when I try to navigate to the profile page at the /profile route
  - Then I will be redirected to the '/' login route

-----------
# Logout
As a logged-in user, I want to logout via a button on the navigation bar, so that I can hide my account information to the rest of the users on this device.

   ## Questions
 * What page will the user be sent to after being logged out?
   - The user will be redirected to the login page so the next user can seamlessly access their profile.

 * Where will the logout button be located?
   - The logout button will be located in the navbar for ease of access.

 * Will there be a feature that will log an inactive user out of the application?
   - We will not be implementing an auto logout feature for inactive users at this time.


 ## Acceptance Criteria
 * Given that I am a Logged in user when I attempt to log out
    - Then I will be successfully logged out and sent to the '/' route

------------


# PublicCharcters
As a logged-in user, I want to be able to be able to create characters.
As a logged-in user, I want to be able to be able to update characters.
As a logged-in user, I want to be able to be able to delete characters that I created.
As a logged-in user, I want to be able to be able to view characters that I created and other users characters that they created.


   ## Questions
 * How can a logged-in user create a character?
   -  By navigating to the /characters route and clicking the create button at the top of the page

 * How can a logged-in user update a character?
   -  By navigating to the /characters route and entering there search_id  associated with their account into the search input on the page
   -  Then all of their characters are displayed and they can click an update button

 * How can a logged-in user delete a character?
    -  By navigating to the /characters route and entering there search_id  associated with their account into the search input on the page
    -  Then all of their characters are displayed and they can click an delete button

 * How can a logged-in user view characters?
    -  By navigating to the /characters route and entering there search_id  associated with their account into the search input on the page


 ## Acceptance Criteria
 * Given that I am a Logged in user when I navigate to the /characters route
    - Then I will be able to create, update, and delete characters as well as view other users characters

------------


# Following
As a logged-in user, I want to be able to be able to follow other users.
As a logged-in user, I want to be able to be able to un-follow other users.
As a logged-in user, I want to be able to be able to view the users I am following.

## Questions
 * How can a logged in user follow other users?
   - By navigating to /profile/:search_id or navigating to their profile and clicking the follow button

 * How can a logged in user un-follow other users?
   - By navigating to /profile and looking at the users they are following and clicking the un-follow button that is next to their username

 * How can a logged in user view the users they are following?
   - By navigating to /profile and looking at the users they are following


 ## Acceptance Criteria
 * Given that I am a Logged in user when I search or go to /profile
    - Then I will be able to follow, un-follow, view the users I am following



------------
# Books
As a logged-in user, I want to be able to create books
As a logged-in user, I want to be able to update books
As a logged-in user, I want to be able to delete books

As a logged-in user, I want to be able to create characters for a book
As a logged-in user, I want to be able to update characters for a book
As a logged-in user, I want to be able to delete characters for a book

As a logged-in user, I want to be able to create pages for a book
As a logged-in user, I want to be able to update pages for a book
As a logged-in user, I want to be able to delete pages for a book

## Questions
 * How can a logged-in user create books?
   - By navigating to /books and clicking the create book button at the top
 * How can a logged-in user update books?
   - By navigating to /books looking at their current books and clicking the update button next to it
 * How can a logged-in user delete books?
   - By navigating to /books looking at their current books and clicking the delete button next to it


 * How can a logged-in user create characters for a book?
   - By navigating to /books and looking at their current books and clicking the title which will take them to the individual book page
    here they can then click the create character button which will create a character for that book
 * How can a logged-in user update characters for a book?
   - By navigating to /books and looking at their current books and clicking the title which will take them to the individual book page
    here they can then click the update character button which will update a character for that book
 * How can a logged-in user delete characters for a book?
   - By navigating to /books and looking at their current books and clicking the title which will take them to the individual book page
    here they can then click the delete character button which will delete a character for that book


   * How can a logged-in user create pages for a book?
   - By navigating to /books and looking at their current books and clicking the title which will take them to the individual book page
    here they can then click the create page button which will create a page for that book
 * How can a logged-in user update pages for a book?
   - By navigating to /books and looking at their current books and clicking the title which will take them to the individual book page
    here they can then click the update page button which will update a page for that book
 * How can a logged-in user delete pages for a book?
   - By navigating to /books and looking at their current books and clicking the title which will take them to the individual book page
    here they can then click the delete page button which will delete a page for that book



 ## Acceptance Criteria
 * Given that I am a Logged in user when I navigate to /books
    - Then I will be able to create, delete, and update books, characters and pages.


------------

------------
# Polls
As a logged-in user, I want to be able to create, update and delete polls.
As a logged-in user, I want to be able to create, and delete comments on a specific poll.

## Questions
 * How can a logged-in user create a poll?
   - By navigating to /polls they can then click the create poll button at the top of the page
 * How can a logged-in user update a poll?
   - By navigating to /polls they can type in the search input at the top of the page and if the search_id the entered matches the one
      associated with their personal account the search results that show will have a update button by each of the titles
 * How can a logged-in user delete a poll?
   - By navigating to /polls they can type in the search input at the top of the page and if the search_id the entered matches the one
      associated with their personal account the search results that show will have a delete button by each of the titles
 * How can a logged-in user create a comment on a specific poll?
   - By clicking on a poll title which will take them to /polls/:pollId there they can click the create comment button at the bottom of the comments
    feed
 * How can a logged-in user delete a comment on a specific poll?
   - By clicking on a poll title which will take them to /polls/:pollId there they can click the delete comment button that shows by a comment they
    created



 ## Acceptance Criteria
 * Given that I am a Logged in user when I navigate to /polls
    - Then I will be able to create, update and delete polls, as well as create and delete comments on a specific poll.


------------
