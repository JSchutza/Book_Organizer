import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunk_getAllBooks } from "../../store/thunks/books.js";
import { hideModal } from "../../store/actions/modal.js";
import {Book} from "../Book";
import { NavLink } from "react-router-dom";
import { thunk_getUsersPolls } from "../../store/thunks/polls.js";
import { useUser } from "../../context/UserContext.js";

import styles from "./profile.module.css";




const Profile = () => {
  const { isUser } = useUser();
  const bookInfo = useSelector((store) => store.booksReducer.books);
  const pollInfo = useSelector(store => store.pollsReducer.polls);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(hideModal());
    dispatch(thunk_getAllBooks());
    dispatch(thunk_getUsersPolls());
  },[dispatch]);



  if (isUser === null) {
    return (
      <div>
        <h1> Loading ... </h1>
      </div>
    );
  }





  return bookInfo && pollInfo && (
    <>
    <div>
      {/* users info here */}
    <div className={styles.user_info_wrap}>
          <div className={styles.user_avatar}>
            <img src={isUser.avatar} alt='avatar' />
          </div>

          <div></div>
            <div className={styles.user_text}>

            <p>Search Id: {isUser.search_id} </p>
              <br/>
            <p>Username: {isUser.user_name}</p>
              <br/>
            <p>Email: {isUser.email}</p>
              <br/>
            <p>Bio: {isUser.bio} </p>
              <br/>
            <p>Birthday: {isUser.birthday} </p>
              <br/>
            <p>Address: {isUser.location} </p>
              <br />
            <p> Number of followers {isUser.followers.length} </p>
            </div>
    </div>

      <div className={styles.recent_books_header}>
        <h2>Recently Created Books</h2>
      </div>

      {/* book info here */}
      <div>
          {bookInfo ?

        <div className={styles.book_link_wrap}>
        {Object.values(bookInfo).map(eachBook => (
          <div className={styles.each_book_link}>
            <Book bookId={eachBook.id} title={eachBook.the_title} creatorId={eachBook.creator_id} creationDate={eachBook.created_at} />
          </div>
        ))}
      </div>
          :
        <h1>Loading books... </h1>
          }
      </div>



        <div className={styles.recent_polls_header}>
          <h2>Recently Created polls</h2>
        </div>

      <div>
          {pollInfo ?
            <>
            <div className={styles.poll_link_wrap}>
            {Object.values(pollInfo).map(eachPoll => (
              <div className={styles.each_poll_link}>
                <NavLink to={`/comments/${eachPoll.id}`} exact>
                  <h3> {eachPoll.title} </h3>
                </NavLink>
              </div>
            ))}
            </div>
            </>
            :
            <h3> You currently do not have any polls. </h3>
          }
      </div>


    </div>
    </>
  )


};

export default Profile;
