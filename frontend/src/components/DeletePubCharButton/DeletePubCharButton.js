
import React from 'react';
import { useDispatch } from 'react-redux';
import { thunk_deleteUsersPubChars, thunk_getAllCharacters, thunk_searchForUsersPubChars } from "../../store/thunks/characters.js";
import { hideModal } from "../../store/actions/modal.js";
import { useHistory } from "react-router-dom";



const DeletePubCharButton = ({ charId, search_id, data }) => {
  const dispatch = useDispatch();
  const history = useHistory();






  const handle = (event, choice) => {
    event.preventDefault();
    if (data === null) return;
    if (choice === true) {
      if (data.charPage === true) {
        dispatch(thunk_deleteUsersPubChars({ charPage: true, characterId: charId, search_id: undefined }));
        dispatch(hideModal());
        history.push(data.lastpage);
      } else if (data.charPage === undefined) {
        dispatch(thunk_deleteUsersPubChars({ charPage: false, characterId: charId, search_id }));
        dispatch(hideModal());
        history.push(data.lastpage);
      }
        if (data.setIsHidden) {
          dispatch(hideModal());
          data.setIsHidden("");
          history.push(data.lastpage);
        }
    }
      if (data.setIsHidden) {
        dispatch(hideModal());
        data.setIsHidden("");
        history.push(data.lastpage);
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
