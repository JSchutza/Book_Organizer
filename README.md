
# [Book_Organizer](https://github.com/JSchutza/Book_Organizer)
Welcome to the **Book_Organizer** README!

A app to help authors create and organize books they are currently writting and to connect authors to other aspiring authors.

-----------
# Technology Used
  * React
  * Redux
  * Flask
  * Flask-SQLAlchemy
  * WTForms
  * Postgress
  * Alembic

-----------
# Splash Page
- Where a unauthenticated user first comes when they visit the site.
<img src="https://i.ibb.co/6XL2kTy/splash-page.jpg" alt="splash-page" border="0">


-----------
# Signup Page
- Where an unauthenticated user can create a new account.
<img src="https://i.ibb.co/XFqZww6/signup-page.jpg" alt="signup-page" border="0">


-----------
# Login Page
- Where an unauthenticated user can login to a preexisting account.
<img src="https://i.ibb.co/s1T7bJ7/login-page.jpg" alt="login-page" border="0">


-----------
# Public Character Page
- Where authenticated users can create new public characters for people to enjoy.
<img src="https://i.ibb.co/Yb3d1kR/character-page.jpg" alt="character-page" border="0">


-----------
# Public Character Search
- Where authenticated users can search for public characters.
<img src="https://i.ibb.co/v3pQ0k1/character-search.jpg" alt="character-search" border="0">


-----------
# New Public Character Modal
- Where authenticated users can create new public characters.
<img src="https://i.ibb.co/BZNBhsk/new-pub-char-page.jpg" alt="new-pub-char-page" border="0">


-----------
# Update Public Charcter Modal
- Where authenticated users can update preexisting public characters.
<img src="https://i.ibb.co/W6rVxTh/update-pub-char-page.jpg" alt="update-pub-char-page" border="0">


-----------
# Profile Page
- Where authenticated users can view their personal account information.
<img src="https://i.ibb.co/VVj0G7P/profile-page.jpg" alt="profile-page" border="0">


-----------
# Books Page
- Where authenticated users can view their personal books.
<img src="https://i.ibb.co/tK5Ww7v/books-page.jpg" alt="books-page" border="0">


-----------
# Each Book Detail Page
- Where authenticated users can view specific details within a book.
<img src="https://i.ibb.co/cgk5T4d/each-book-detail-page.jpg" alt="each-book-detail-page" border="0">


-----------
# Private Character Modal
- Where authenticated users can create new characters for a book.
<img src="https://i.ibb.co/r3Zf9nz/new-pri-char-page.jpg" alt="new-pri-char-page" border="0">


-----------
# Your Polls
- Where authenticated users can view their created polls.
<img src="https://i.ibb.co/nznZHn6/your-polls-page.jpg" alt="your-polls-page" border="0">


-----------
# All Polls
- Where authenticated users can view all of the currently created polls for the site.
<img src="https://i.ibb.co/m9pLRX2/all-polls-page.jpg" alt="all-polls-page" border="0">


-----------
# Each Poll Page
- Where authenticated users can view specific details within a specific poll.
<img src="https://i.ibb.co/M2QbV3D/each-poll-page.jpg" alt="each-poll-page" border="0">


-----------
# Update Comment Modal
- Where authenticated users can update their comments on a poll.
<img src="https://i.ibb.co/ckcxhSc/update-poll-comment-page.jpg" alt="update-poll-comment-page" border="0">




-----------
# [Feature List](https://github.com/JSchutza/Book_Organizer/wiki/MVP-Feature-List)

-----------
# [Frontend Routes](https://github.com/JSchutza/Book_Organizer/wiki/Frontend-Routes)

-----------
# [API Documentation](https://github.com/JSchutza/Book_Organizer/wiki/API-Documentation)

-----------
# [Database Schema](https://github.com/JSchutza/Book_Organizer/wiki/Database-Schema)

-----------
# React Components
- ## Book
- Reusable component that returns a link to a specific book that the authenticated user has created.

- ## EachBook
- Displays the PrivateCharacter and Pages components for a specific book that was created by a authenticated user.

- ## BookViewer
- Displays all of the authenticated users books.

- ## CharacterPage
- Displays all of the public characters currently created by users on the site.

- ## CharacterSearch
- Displays characters from a user by their unique search id.

- ## CommentForm
- Reusable component that allows users to comment on another users poll.

- ## Comments
- Displays comments for a specific poll. 

- ## CreateBookForm
- Reusable component that allows an authenticated user to create a new book.

- ## CreateCharacterForm
-  Reusable component that allows an authenticated user to create a new public character. 

- ## CreatePageForm 
- Reusable component that allow an authenticated user to create a new page or update an existing page if the update prop is set to true.

- ## CreatePollForm
- Reusable component that allow an authenticated user to create a new poll or update an existing poll if the update prop is set to true.

- ## CreatePriCharForm
- Reusable component that allow an authenticated user to create a new private character or update an existing private character if the update prop is set to true.

- ## EachPage
- Displays all of the pages for a specific book. 

- ## EachPriChar
- Displays all of the private characters for a specific book.

- ## EachUsersProfile
- Displays user information for a user that is not the currently authenticated user.

- ## Errors
- Reusable component that displays generic backend validation errors.

- ## Followers
- Displays an authenticated users followers. 

- ## Following
- Displays the users that an authenticated user is following.

- ## Footer
- Displays basic social links with their coresponding icons.

- ## HomeLoader
- Displays the splash page. 

- ## ImgPreview
- Reusable component that will render a selected image when creating a public or private character.

- ## LoadScreen
- Reusable component that renders a gif when the application is loading.

- ## LoginForm
- Reusable component for previous users to login to their existing account.

- ## LogoutButton
- Component that will logout an authenticated user.

- ## MainRouter
- Component that sets up all of the authenticated routes and unauthenticated routes based on if a user is currently logged in or not.

- ## NavBar
- Component that dynamically changes based on if a user is authenticated or not.

- ## Pages
- Displays all of the pages for a specific book created by the user.

- ## Polls
- Displays all of the current polls created by users on the site.
 
- ## PrivateCharacters
- Displays the private characters for a specific book.

- ## Profile
- Displays the authenticated users personal information.

- ## SearchResults
- Reusable component that displays the search results returned from a search by a users unique id.

- ## SignupForm
- Reusable component that allows an unauthenticated user to create a new account.

- ## SpecificPubChar
- Component that displays a specific public character when a character card is clicked on.

- ## SuccessMessage
- Reusable component that displays a loading gif on a successful request to an aws image upload.

- ## ToolTip
- Reusable component that shows a custom tooltip when hovering over a icon.

- ## UpdatePubCharForm
- Reusable component that allows an authenticated user to update an existing public character.

- ## UpdateUserForm
- Reusable component that allows an authenticated user to update their personal account information.

-----------
# Redux Store
- ## globalReducer
- Used to hold global state setter functions for use in other parts of the application.

- ## errorsReducer
- Used to hold generic backend validation error messages.

- ## usersReducer
- Holds the authenticated users personal information.

- ## characterPageReducer
- Allows for full crud on public character information.

- ## searchCharacterPageReducer
- Holds a searched for users public character data. 

- ## booksReducer
- Allows for full crud on a authenticated users books.

- ## priCharReducer
- Allows for full crud on a authenticated users private characters.

- ## pageReducer
- Allows for full crud on a authenticated users pages.

- ## pollsReducer
- Allows for full crud on a authenticated users polls.

- ## commentReducer
- Allows for full crud on a authenticated users comments.

- ## allPollsReducer
- Holds all of the currently created polls by users of the site.

- ## followersReducer
- Holds all of the users following the currently authenticated user.

- ## followingReducer
- Allows for full crud on a users a authenticated user is following.

-----------
# Challenges
- One aspect that was particularly challenging for this project was being able to create a reusable component that displayed a preview of a users selected image to upload to AWS. This was challenging because it needed to be completely reusable and have responsive styles. 
- Related to the challenge above, was a completely reusable and responsive modal that would be used across the site.

```js


const ImgPreview = ({ update=false, prevAvatar, urlpreview, cancelImgChoice, avatarUrl, openModal, setOpenModal  }) => {
  const { currentStyle, initImgPreviewStyle } = useModalStyle();


  useEffect(() => {
    initImgPreviewStyle();
  },[]);



  const closeModal = () => {
    setOpenModal(false);
  }



  if(update) {
    return (
      <>
          <div className={styles.url_preview_wrap}>
            <img src={prevAvatar} alt={"cool"} />
            <span>Last Avatar: </span>
          </div>

        <ReactModal
          isOpen={openModal}
          onRequestClose={closeModal}
          style={currentStyle}
          appElement={document.getElementById('root')}
        >
          <div className={styles.url_preview_wrap}>

            {urlpreview === null ?
              null
              :
              <>
                <img src={avatarUrl} alt={"cool"} />
                <button onClick={cancelImgChoice}> Cancel </button>
              </>
            }
          </div>
        </ReactModal>
      </>
    )
  }





  return (
    <>
     <ReactModal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={currentStyle}
        appElement={document.getElementById('root')}
      >
      <div className={styles.url_preview_wrap}>
        {urlpreview === null ?
          null
          :
          <>
            <img src={avatarUrl} alt={"cool"} />
            <button onClick={cancelImgChoice}> Cancel </button>
          </>
        }
      </div>

    </ReactModal>
    </>
  )

};

export default ImgPreview;
```
- Above is the reusable image preview component. This component was challenging because it had to be responsive and reusable for both first time uploads and updates to previous uploads. Along with what was mentioned before, this component is also a modal that will appear after a user has selected a image to upload to AWS. 
- In order to know if the component was being used for a update or first time use, the prop `update` will conditionally render JSX based on if it is set to either `true` or `false`. As for solving the styling issues, inline styles are set within a context value which is passed to the `ReactModal` style prop. These styles are constructed in the function call `initImgPreviewStyle();`, which is called when the component initially renders. The modal can be closed either by clicking anywhere on the page besides the modal window or clicking on the cancel button that displays within the modal window. This is accomplished by declaring state outside of the `ImgPreview` component and passing its state and state setter function as props(`openModal, setOpenModal`). 
- Due to time constraints on the project, my original implementation of a reusable modal was naive and something I was not proud of. I decided to come back and do a full refactor of my initial implementation and decided to use a package called `ReactModal`. I chose this package because it was intuitive and its documentation was excellent.

-----------
# Future Features
- Allowing users to associate public characters to a private book. 
- Allowing users to direct message the users they are following.
- Allowing users to upload pages to a book if they do not want to manually input page data.
- Allowing users to update a uploaded page file.

-----------

## Installing / Getting Started / Developing
If you want to contribute to this project all you have to do is:


```shell
git clone https://github.com/JSchutza/Book_Organizer.git
cd Book_Organizer/
pipenv install

cd frontend/
npm install
```

-----------
## Links
- [Live Site](https://book-organizer-44fd3.web.app/)
- [Repository](https://github.com/JSchutza/Book_Organizer)
-----------
