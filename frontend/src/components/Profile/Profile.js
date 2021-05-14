import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunk_getAllBooks } from "../../store/thunks/books.js";
import { hideModal } from "../../store/actions/modal.js";
import {Book} from "../Book";



import styles from "./profile.module.css";




const Profile = () => {
  const userInfo = useSelector((store) => store.usersReducer)
  const bookInfo = useSelector((store) => store.booksReducer.books)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(hideModal());
    dispatch(thunk_getAllBooks());
  },[dispatch]);





  return (
    <>
    <div>
      {/* users info here */}

    <div className={styles.user_info_wrap}>
        {Object.values(userInfo).map(each => (
          <>
          <div className={styles.user_avatar}>
            <img src={each.avatar} alt='avatar' />
          </div>

          <div></div>
            <div className={styles.user_text}>

            <p>Search Id: {each.search_id} </p>
              <br/>
            <p>Username: {each.user_name}</p>
              <br/>
            <p>Email: {each.email}</p>
              <br/>
            <p>Bio: {each.bio} </p>
              <br/>
            <p>Birthday: {each.birthday} </p>
              <br/>
            <p>Address: {each.location} </p>
            </div>
          </>
        ))}
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


    </div>
    </>
  )


};

export default Profile;
