import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { thunk_allPolls, thunk_getUsersSpecificComments, thunk_createComment, thunk_deleteSpecificComment, thunk_updateSpecificComment } from "../../store/thunks/polls.js";



import { GrUpdate } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import ToolTip from "../ToolTip";

import styles from "./comments.module.css";





const Comments = () => {
  const [ commentText, setCommentText ] = useState('');
  const [ updateText, setUpdateText ] = useState('');


  const [ show, setShow ] = useState(false);
  const [ updateInfo, setUpdateInfo ] = useState(null);

  const { pollId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(store => store.commentReducer.comments);
  const user = useSelector((store) => store.usersReducer.user);
  const poll = useSelector(store => store.allPollsReducer.polls);



  useEffect(() => {
    dispatch(thunk_getUsersSpecificComments(pollId));
    dispatch(thunk_allPolls());
  },[dispatch, pollId]);




  const createComment = (event) => {
    event.preventDefault();
    dispatch(thunk_createComment({ pollId, commentText }));
  }



  const handleDelete = (event, commentId) => {
    event.preventDefault();
    dispatch(thunk_deleteSpecificComment(pollId, commentId));
  }



  const handleUpdate = (event, payload) => {
    event.preventDefault();
    setShow(true);

    setUpdateInfo(payload);
    setUpdateText(payload.answer_text);
  }


  const updateComment = event => {
    event.preventDefault();
    dispatch(thunk_updateSpecificComment(updateInfo, updateText));
    setShow(false);

  }






  if (comments === null || poll === null){
    return (
      <>
      <h1> Loading ... </h1>
      </>
    );
  }






  return (
  <>

      {comments === false ?
          <>
          <div className={styles.no_comment_wrap}>
            <div className={styles.each_title}>
              <h1> { poll[pollId].title } </h1>
            </div>

            <div className={styles.each_question}>
              <p> { poll[pollId].question_text } </p>
            </div>

            <div className={styles.no_comment_message}>
              <h2> This poll currently does not have any comments. </h2>
            </div>
          </div>
          </>

        :
        <>

        <div className={styles.comment_title_wrap}>
        <div className={styles.each_title}>
            <h1> {Object.values(comments)[0].poll_title} </h1>
        </div>

        <div className={styles.each_question}>
            <p> {Object.values(comments)[0].poll_text} </p>
        </div>
      </div>



    <div className={styles.each_comment_wrap}>
      {Object.values(comments).map(eachComment => (
        <>
          <li key={nanoid()}>
            <p> <i>{eachComment.username}</i> </p>
            <p> <b>{eachComment.answer_text}</b> </p>
          </li>

          {user.id === eachComment.user_id ?
              <>
              <div className={styles.each_comment_buttons_wrap}>
              <div className={styles.each_comment_delete_button}>
                <ToolTip content={"Delete"}>
                  <a href='/' onClick={event => handleDelete(event, eachComment.id)} > <li> <RiDeleteBinFill /> </li> </a>
                </ToolTip>
              </div>

                <div className={styles.each_comment_update_button}>
                  <ToolTip content={"Update"}>
                    <a href='/' onClick={event => handleUpdate(event, { commentId: eachComment.id, answer_text: eachComment.answer_text,
                        pollId })} > <li> <GrUpdate /> </li> </a>
                  </ToolTip>
                </div>
                </div>
              </>

              :
            <></>
          }
          </>
        ))}
      </div>
    </>
    }









        {show ?
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

        :

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
              <a href='/' onClick={event => createComment(event)}> <AiOutlinePlus /> </a>
            </ToolTip>
          </div>
          </div>

          </div>
        }
  </>
  );


};





export default Comments;
