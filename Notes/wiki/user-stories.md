----------
# Sign up
 As an unauthorized user, I want to be able to sign up for the website via a sign up form, so that I can access Remind_Me.

 * ## Questions
* Will the user enter a username and an email address to sign up?
  - Yes a user will login with an username.

* Will we confirm their password during sign up?
  - Yes the user will be prompted to confirm their password

* What routes should we use for sign up?
  - We will use /signup for the route

* Where should the user be redirected after sign up?
  - User will be redirected to their profile page

* What happens if there is a user with the same username they used to sign up?
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
  - User will login via username and password


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

* What happens if the user enters the wrong username?
   - Asynchronously Display the message "Invalid Login, please try again."

* Can a user reset their password?
   - Not yet -- will be implemented in future release

* Should logging in use session-based or use token-based authentication?
   - I will be using token based authentication


 * ## Acceptance Criteria

* Given that I'm a logged-out user and when I'm on the /login route
   - Then there will be a login form with an username and password field and a "Login" button to submit the form.

* When I try to fill out the form with an invalid username and password combination and press Enter or press the "Login" button
   - Then at the top of the form, I will see a red message "Invalid Login, please try again."

* When I try to fill out the form with an username that doesn't exist in the system and press Enter or press the "Login" button
  - Then at the top of the form, I will see a red message "Invalid Login, please try again."

* When I try to fill out the form with a valid username and password and press press Enter or press the "Login" button
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
 * Then I will be redirected to the log in page as a logged out user

------------

`more to come`
