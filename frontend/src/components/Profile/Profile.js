import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunk_getAllBooks } from "../../store/thunks/books.js";
import { showModal } from "../../store/actions/modal.js";
import {Book} from "../Book";
import Modal from "../Modal";




const Profile = () => {
  const userInfo = useSelector((store) => store.usersReducer)
  const bookInfo = useSelector((store) => store.booksReducer.books)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(showModal(true))
    dispatch(thunk_getAllBooks());
  },[dispatch]);



  console.log(bookInfo);

  return (
    <>
    <div>
      <div>
        {Object.values(userInfo).map(each => (
          <>
            <img src={each.avatar} alt='avatar' />
            <p>Search Id: {each.search_id} </p>
            <p>Username: {each.user_name}</p>
            <p>Email: {each.email}</p>
            <p>Bio: {each.bio} </p>
            <p>Birthday: {each.birthday} </p>
            <p>Address: {each.location} </p>
          </>
        ))}
      </div>

      <div>
        <h2>Recently Created Books</h2>
      </div>

      <div>
        <h2>Books</h2>
          {bookInfo ?
            <div>
              {Object.values(bookInfo).map(eachBook => (
                <div>
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
