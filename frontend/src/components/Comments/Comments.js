import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { thunk_getUsersSpecificComments, thunk_createComment, thunk_deleteSpecificComment, thunk_updateSpecificComment } from "../../store/thunks/polls.js";



const Comments = () => {
  const [ commentText, setCommentText ] = useState('');
  const [ updateText, setUpdateText ] = useState('');

  const [ buttonText, setButtonText  ] = useState('Create');
  const [ show, setShow ] = useState(false);
  const [ updateInfo, setUpdateInfo ] = useState(null);

  const { pollId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(store => store.commentReducer.comments);
  const user = useSelector((store) => store.usersReducer.user);



  useEffect(() => {
    dispatch(thunk_getUsersSpecificComments(pollId));
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
    setButtonText("Update");

    setUpdateInfo(payload);
    setUpdateText(payload.answer_text);
  }


  const updateComment = event => {
    event.preventDefault();
    dispatch(thunk_updateSpecificComment(updateInfo, updateText));
  }






  if(comments === null){
    return (
      <>
      <h1> Loading ... </h1>
      </>
    );
  }






  return (
  <>

      {comments === false ?
          <div>
            <h2> This poll currently does not have any comments. </h2>
          </div>

        :
        <>

      <div>
        <div>
            <h1> {Object.values(comments)[0].poll_title} </h1>
        </div>

        <div>
            <p> {Object.values(comments)[0].poll_text} </p>
        </div>
      </div>



    <div>
      {Object.values(comments).map(eachComment => (
        <>
          <li key={nanoid()}>
            <p> <i>{eachComment.username}</i> </p>
            <p> <b>{eachComment.answer_text}</b> </p>
          </li>

          {user.id === eachComment.user_id ?
              <>
              <a href='/' onClick={event => handleDelete(event, eachComment.id)} >
                <li>
                    Delete
                </li>
              </a>



              <a href='/' onClick={event => handleUpdate(event, {
                commentId: eachComment.id,
                answer_text: eachComment.answer_text,
                pollId
              })} >

                <li>
                  Update
                  </li>
                </a>
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
          <div>

          <div>
            <textarea
              type="text"
              name="comment"
              value={updateText}
              onChange={event => setUpdateText(event.target.value)}
              />
            </div>


          <div>
              <a href='/' onClick={event => updateComment(event)}> { buttonText } Comment </a>
          </div>

          </div>

        :

          <div>

            <div>
              <textarea
                type="text"
                name="comment"
                value={commentText}
                onChange={event => setCommentText(event.target.value)}
                />
            </div>

          <div>
              <a href='/' onClick={event => createComment(event)}> { buttonText } Comment </a>
          </div>

          </div>
        }
  </>
  );


};





export default Comments;
