import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { thunk_updateSpecificComment } from "../../store/thunks/polls.js";

import { GrUpdate } from "react-icons/gr";


import styles from "./updatecommentform.module.css";


const UpdateCommentForm = ({ update=false, data, closeModal }) => {
  const [ updateText, setUpdateText ] = useState('');
  const dispatch = useDispatch();


  const updateComment = event => {
    event.preventDefault();
    // dispatch(thunk_updateSpecificComment(updateInfo, updateText));
  }




  return (
    <>
      <div className={styles.comment_form_input_wrap}>
        <div className={styles.comment_form_containter}>
          <textarea
            type="text"
            name="comment"
            value={updateText}
            onChange={event => setUpdateText(event.target.value)}
          />


          <div className={styles.comment_update_button}>
            <ToolTip content={"Update"}>
              <a href='/' onClick={event => updateComment(event)}> <GrUpdate /> </a>
            </ToolTip>
          </div>
        </div>

      </div>
    </>
  )
};

export default UpdateCommentForm;
