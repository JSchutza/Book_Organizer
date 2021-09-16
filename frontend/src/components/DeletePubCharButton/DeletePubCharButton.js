

import { useDispatch } from 'react-redux';
import { thunk_deleteUsersPubChars } from "../../store/thunks/characters.js";

import { useHistory } from "react-router-dom";



const DeletePubCharButton = ({ charId }) => {
  const dispatch = useDispatch();
  const history = useHistory();


  const handleDelete = event => {
    event.preventDefault();
    dispatch(thunk_deleteUsersPubChars(charId));
  }



  return (
    <>
      <button onClick={event => handleDelete(event)}> Delete </button>
    </>
  )
};



export default DeletePubCharButton;
