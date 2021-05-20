
import React from 'react';
import { useDispatch } from 'react-redux';

import { hideModal } from "../../store/actions/modal.js";
import { useHistory } from "react-router-dom";
import { thunk_deleteBook } from "../../store/thunks/books";


const DeleteBookButton = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();






  const handle = (event, choice) => {
    event.preventDefault();
    if (choice === true) {
      dispatch(thunk_deleteBook(data.bookId));
      dispatch(hideModal());
      history.push(data.lastpage);
      }
      dispatch(hideModal());
      history.push(data.lastpage);
    }






  return (
    <>
      <div>
        <h3>Are you sure you want to delete this Book? It can not be undone. </h3>
        <a href='/' onClick={(event) => handle(event, true)}>Yes</a>
        <br />
        <a href='/' onClick={(event) => handle(event, false)}>No</a>
      </div>
    </>
  )
};



export default DeleteBookButton;
