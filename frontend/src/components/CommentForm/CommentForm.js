import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { thunk_updateSpecificComment, thunk_createComment } from "../../store/thunks/polls.js";

import { GrUpdate } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import ToolTip from "../ToolTip";
import Errors from "../Errors";


import styles from "./commentform.module.css";


const CommentForm = ({ update=false, data, closeModal }) => {
  const { pollId, commentId, answer_text,  } = data;
  const [ commentText, setCommentText ] = useState('');
  const [ updateText, setUpdateText ] = useState(answer_text);
  const dispatch = useDispatch();






  const updateComment = async event => {
    event.preventDefault();
    const result = await dispatch(thunk_updateSpecificComment({ pollId, commentId, updateText }));
    if (result) {
      closeModal();
    }

  };




  const createComment = async event => {
    event.preventDefault();
    const result = await dispatch(thunk_createComment({ pollId, commentText }));
  }




  if(update) {
    return (
      <>
        <Errors />

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
                <NavLink to='/' onClick={event => updateComment(event)}> <GrUpdate /> </NavLink>
              </ToolTip>
            </div>
          </div>
        </div>
      </>
    )
  }





  return (
    <div className={styles.comment_form_input_wrap}>
      <div className={styles.comment_form_containter}>
        <textarea
          type="text"
          name="comment"
          value={commentText}
          onChange={event => setCommentText(event.target.value)}
        />

        <div className={styles.comment_add_button}>
          <ToolTip content={"Comment"}>
            <NavLink to='/' onClick={event => createComment(event)}> <AiOutlinePlus /> </NavLink>
          </ToolTip>
        </div>
      </div>
    </div>
  )
};

export default CommentForm;
