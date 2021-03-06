import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

import { thunk_allPolls, thunk_getUsersSpecificComments, thunk_deleteSpecificComment } from "../../store/thunks/polls.js";
import { useUser } from "../../context/UserContext.js";
import { useModalStyle } from "../../context/ReactModalStylesContext.js";
import { resetErrors } from '../../store/actions/errors.js';


import { GrUpdate } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";

import ReactModal from 'react-modal';
import ToolTip from "../ToolTip";
import LoadScreen from "../LoadScreen";
import CommentForm from "../CommentForm";


import styles from "./comments.module.css";



const Comments = () => {
  const [ loaded, setLoaded ] = useState(false);
  const [ openModal, setOpenModal ] = useState(false);
  const [ updateInfo, setUpdateInfo ] = useState(null);
  const { isUser } = useUser();
  const { pollId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(store => store.commentReducer.comments);
  const poll = useSelector(store => store.allPollsReducer.polls);
  const { commentFormStyle } = useModalStyle();



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
    setOpenModal(true);
  }




  const closeModal = () => {
    dispatch(resetErrors());
    setOpenModal(false);
  }





  if (!poll || !loaded) return ( <LoadScreen />);



  const NoComments = () => {
    return (
      <div className={styles.no_comment_wrap}>
        <div className={styles.each_title}>
          <h1> {poll[pollId].title} </h1>
        </div>

        <div className={styles.each_question}>
          <p> {poll[pollId].question_text} </p>
        </div>

        <div className={styles.no_comment_message}>
          <h2> This poll currently does not have any comments. </h2>
        </div>
      </div>
    );
  };



  const EachComment = () => {
    return (
      <>
        <div className={styles.comment_title_wrap}>
          <div className={styles.each_title}>
            <h1> {Object.values(comments)[0].poll_title} </h1>
          </div>

          <div className={styles.each_question}>
            <p> {Object.values(comments)[0].poll_text} </p>
          </div>
        </div>




          {Object.values(comments).map(eachComment => (
            <div key={eachComment.id}>
            <div className={styles.username_text} >
              <p className={styles.each_comment_text} > <i>{eachComment.username}</i> </p>
            </div>

            <div className={styles.answer_text}>
              <p className={styles.each_comment_text} > <b>{eachComment.answer_text}</b> </p>
            </div>

              {isUser.id === eachComment.user_id ?
                <div className={styles.each_comment_buttons_wrap}>

                  <div className={styles.each_comment_delete_button}>
                    <ToolTip content={"Delete"}>
                      <NavLink to='/' onClick={event => handleDelete(event, eachComment.id)} >
                        <li> <RiDeleteBinFill /> </li>
                      </NavLink>
                    </ToolTip>
                  </div>

                  <div className={styles.each_comment_update_button}>
                    <ToolTip content={"Update"}>
                      <NavLink to='/' onClick={event => handleUpdate(event, {
                        commentId: eachComment.id,
                        answer_text: eachComment.answer_text,
                        pollId
                      })} > <li> <GrUpdate /> </li> </NavLink>
                    </ToolTip>
                  </div>

                </div>
                :
                null
              }
            </div>
          ))}

    </>
    );
  };




  return (
  <>

      <ReactModal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={commentFormStyle}
        appElement={document.getElementById('root')}
      >
        <CommentForm
          closeModal={closeModal}
          update={true}
          data={updateInfo}
        />

      </ReactModal>



      {!comments ? <NoComments /> : <EachComment /> }

      <CommentForm data={ { pollId } } />
  </>
  );


};





export default Comments;
