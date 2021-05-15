import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { thunk_getUsersSpecificComments } from "../../store/thunks/polls.js";



const Comments = () => {
  const { pollId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(store => store.commentReducer.comments);
  const user = useSelector((store) => store.usersReducer.user);



  useEffect(() => {
    dispatch(thunk_getUsersSpecificComments(pollId));
  },[dispatch, pollId]);




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
            { Object.values(comments)[0].poll_title }
        </div>

        <div>
          { Object.values(comments)[0].poll_text }
        </div>
      </div>



    <div>
      {Object.values(comments).map(eachComment => (
        <>
          <li key={nanoid()}>
            <p> { eachComment.username } </p>
            <p> { eachComment.answer_text } </p>
          </li>

          {user.id === eachComment.user_id ?
              <>
              <a href='/' onClick={event => event.preventDefault()} >
                <li>
                    Delete
                </li>
              </a>


              <a href='/' onClick={event => event.preventDefault()} >
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
    </>

  );


};





export default Comments;
