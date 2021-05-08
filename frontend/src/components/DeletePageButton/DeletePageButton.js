
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { RiDeleteBinFill } from "react-icons/ri";


const DeletePageButton = ({ bookId, pageId }) => {
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const dispatch = useDispatch();



  const showConfirmation = event => {
    event.preventDefault();
    setConfirmPopUp(true);
  }




  const handle = (event, choice) => {
    event.preventDefault();
    if (choice === true) {
      // dispatch(thunk_deleteUsersPrivateChars(bookId, pageId));
      // dispatch(thunk_getAllPriChars(bookId));
    }
    setConfirmPopUp(choice);
  }




  return (
    <>
      { confirmPopUp === false ?
        <div>
          <a href='/' onClick={(event) => showConfirmation(event)}> <RiDeleteBinFill /> </a>
        </div>
        :
        <div>
          <h3>Are you sure you want to delete this page? It can not be undone. </h3>
          <a href='/' onClick={(event) => handle(event, true)}>Yes</a>
          <br />
          <a href='/' onClick={(event) => handle(event, false)}>No</a>
        </div>
      }
    </>
  )
};



export default DeletePageButton;
