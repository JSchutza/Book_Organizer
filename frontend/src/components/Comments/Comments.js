import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";

import { thunk_allPolls, thunk_getUsersSpecificComments, thunk_deleteSpecificComment } from "../../store/thunks/polls.js";
import { useUser } from "../../context/UserContext.js";


import { GrUpdate } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";

import ReactModal from 'react-modal';
import ToolTip from "../ToolTip";
import LoadScreen from "../LoadScreen";



import styles from "./comments.module.css";



const Comments = () => {
  const [ loaded, setLoaded ] = useState(false);
  const [ updateInfo, setUpdateInfo ] = useState(null);
  const { isUser } = useUser();
  const { pollId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(store => store.commentReducer.comments);
  const poll = useSelector(store => store.allPollsReducer.polls);



  useEffect(() => {
    if(!loaded) {
      dispatch(thunk_getUsersSpecificComments(pollId));
      dispatch(thunk_allPolls());
      setTimeout(() => {
        setLoaded(true);
      }, 1000)
    }
  },[dispatch, pollId]);







  const handleDelete = (event, commentId) => {
    event.preventDefault();
    dispatch(thunk_deleteSpecificComment(pollId, commentId));
  }



  const handleUpdate = (event, payload) => {
    event.preventDefault();
    setUpdateInfo(payload);
  }









  if (!poll || !loaded){
    return (
      <>
        <LoadScreen />
      </>
    );
  }






  return (
  <>

      {/* <ReactModal
        isOpen={openModal}
        onRequestClose={closeModal}
        appElement={document.getElementById('root')}
      >
        <CreateCharacterForm closeModal={closeModal} />

      </ReactModal> */}



      {!comments ?
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

          {isUser.id === eachComment.user_id ?
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
              :
            <></>
          }
          </>
        ))}
      </div>
    </>
    }
  </>
  );


};





export default Comments;
