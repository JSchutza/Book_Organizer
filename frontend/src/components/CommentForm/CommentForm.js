import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { thunk_updateSpecificComment, thunk_createComment } from "../../store/thunks/polls.js";
import { useModalStyle } from "../../context/ReactModalStylesContext.js";
import { resetErrors } from '../../store/actions/errors.js';

import { GrUpdate } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";

import ToolTip from "../ToolTip";
import Errors from "../Errors";

import ReactModal from 'react-modal';

import styles from "./commentform.module.css";


const CommentForm = ({ update=false, data, closeModal }) => {
  const { pollId, commentId, answer_text,  } = data;
  const [ errorModal, setErrorModal ] = useState(false);
  const [ commentText, setCommentText ] = useState('');
  const [ updateText, setUpdateText ] = useState(answer_text);
  const { smallFormStyle } = useModalStyle();
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
    if (!result) {
      // open modal to show errors
      setErrorModal(true);
    }
  }




  const closeErrorModal = () => {
    dispatch(resetErrors());
    setErrorModal(false);
  }





  if(update) {
    return (
      <>
        <Errors />

        <div className={styles.comment_form_input_wrap}>
          <form onSubmit={updateComment}>

            <div className={styles.comment_form_containter}>
              <textarea
                type="text"
                name="comment"
                value={updateText}
                onChange={event => setUpdateText(event.target.value)}
                />


              <div className={styles.comment_update_button}>
                <button> Update </button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }





  return (
    <>
      <ReactModal
        isOpen={errorModal}
        onRequestClose={closeErrorModal}
        style={smallFormStyle}
        appElement={document.getElementById('root')}
      >
        <Errors />
      </ReactModal>

      <form onSubmit={createComment}>

        <div className={styles.comment_form_input_wrap}>

          <textarea
            type="text"
            name="comment"
            value={commentText}
            onChange={event => setCommentText(event.target.value)}
            />

          <div className={styles.comment_add_button}>
            <button> <AiOutlinePlus /> </button>
          </div>
        </div>
      </form>
    </>
  )
};

export default CommentForm;
