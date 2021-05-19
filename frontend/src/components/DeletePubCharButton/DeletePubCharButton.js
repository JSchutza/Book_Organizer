
import React from 'react';
import { useDispatch } from 'react-redux';
import { thunk_deleteUsersPubChars, thunk_getAllCharacters, thunk_searchForUsersPubChars } from "../../store/thunks/characters.js";
import { hideModal } from "../../store/actions/modal.js";


const DeletePubCharButton = ({ charId, search_id, data }) => {
  const dispatch = useDispatch();



  const handle = (event, choice) => {
    event.preventDefault();
    if (choice === true) {
      dispatch(thunk_deleteUsersPubChars(charId));
      dispatch(thunk_searchForUsersPubChars(search_id));
      dispatch(thunk_getAllCharacters());
      if (data === null) return;
      if (data.setIsHidden) {
        dispatch(hideModal());
        data.setIsHidden("");
      }
    }

    if (data === null) return;
    if (data.setIsHidden) {
      dispatch(hideModal());
      data.setIsHidden("");
    }

  }




  return (
    <>
        <div>
          <h3>Are you sure you want to delete this character? It can not be undone. </h3>
          <a href='/' onClick={(event) => handle(event, true)}>Yes</a>
          <br/>
          <a href='/' onClick={(event) => handle(event, false)}>No</a>
        </div>
    </>
  )
};



export default DeletePubCharButton;
