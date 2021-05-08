
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunk_deleteUsersPrivateChars, thunk_getAllPriChars } from "../../store/thunks/books.js";


const DeletePriCharButton = ({ bookId, charId, user }) => {
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const dispatch = useDispatch();



  const showConfirmation = event => {
    event.preventDefault();
    setConfirmPopUp(true);
  }




  const handle = (event, choice) => {
    event.preventDefault();
    if (choice === true) {
      dispatch(thunk_deleteUsersPrivateChars(bookId, charId));
      dispatch(thunk_getAllPriChars(bookId));
    }
    setConfirmPopUp(choice);
  }




  return (
    <>
      { confirmPopUp === false ?
        <div>
          <a href='/' onClick={(event) => showConfirmation(event)}> Delete </a>
        </div>
        :
        <div>
          <h3>Are you sure you want to delete this character? It can not be undone. </h3>
          <a href='/' onClick={(event) => handle(event, true)}>Yes</a>
          <br />
          <a href='/' onClick={(event) => handle(event, false)}>No</a>
        </div>
      }
    </>
  )
};



export default DeletePriCharButton;
