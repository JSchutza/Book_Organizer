import React from 'react';
import { useDispatch } from 'react-redux';

import { useHistory } from "react-router-dom";
import { thunk_deleteUserAccount } from "../../store/thunks/session.js";



const DeleteUserButton = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();




  const handle = (event, choice) => {
    event.preventDefault();

    if (choice === true) {
      if (data === null) return;
      dispatch(thunk_deleteUserAccount(data.isUser.id));
      history.push(data.lastpage);

    }


      history.push(data.lastpage);
  }




  return (
    <>
      <div>
        <h3>Are you sure you want to delete your account? It can not be undone. </h3>
        <a href='/' onClick={(event) => handle(event, true)}>Yes</a>
        <br />
        <a href='/' onClick={(event) => handle(event, false)}>No</a>
      </div>
    </>
  )
};



export default DeleteUserButton;
