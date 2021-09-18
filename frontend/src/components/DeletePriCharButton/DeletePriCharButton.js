
import React from 'react';
import { useDispatch } from 'react-redux';
import { thunk_deleteUsersPrivateChars, thunk_getAllPriChars } from "../../store/thunks/books.js";


import { useHistory } from "react-router-dom";




const DeletePriCharButton = ({ bookId, charId }) => {
  const dispatch = useDispatch();
  const history = useHistory();




  const handle = (event, choice) => {
    event.preventDefault();
    if (choice === true) {
      dispatch(thunk_deleteUsersPrivateChars(bookId, charId));
      dispatch(thunk_getAllPriChars(bookId));

      history.push(`/books/${bookId}`);
    }

    history.push(`/books/${bookId}`);
  }




  return (
    <>
        <div>
          <h3>Are you sure you want to delete this character? It can not be undone. </h3>
          <a href='/' onClick={(event) => handle(event, true)}>Yes</a>
          <br />
          <a href='/' onClick={(event) => handle(event, false)}>No</a>
        </div>
    </>
  )
};



export default DeletePriCharButton;
