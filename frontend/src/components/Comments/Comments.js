import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { thunk_getUsersSpecificComments } from "../../store/thunks/polls.js";



const Comments = () => {
  const { pollId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(store => store.commentReducer.comments);


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
    <div>
      {Object.values(comments).map(eachComment => (
        <>
          <li key={nanoid()}>
            <p> { eachComment.username } </p>
            <p> { eachComment.answer_text } </p>
          </li>
        </>
      ))}
    </div>
    </>
  );

};





export default Comments;
