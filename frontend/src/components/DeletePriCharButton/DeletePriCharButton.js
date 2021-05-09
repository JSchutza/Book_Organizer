
import React from 'react';
import { useDispatch } from 'react-redux';
import { thunk_deleteUsersPrivateChars, thunk_getAllPriChars } from "../../store/thunks/books.js";
import { hideModal, contentModal, dataModal } from "../../store/actions/modal.js";


const DeletePriCharButton = ({ bookId, charId }) => {

  const dispatch = useDispatch();




  const handle = (event, choice) => {
    event.preventDefault();
    if (choice === true) {
      dispatch(thunk_deleteUsersPrivateChars(bookId, charId));
      dispatch(thunk_getAllPriChars(bookId));
      dispatch(hideModal());
      dispatch(contentModal(null));
      dispatch(dataModal(null));
    }
    dispatch(hideModal());
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
