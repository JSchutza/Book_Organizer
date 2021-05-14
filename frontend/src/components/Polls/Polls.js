
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { thunk_getUsersPolls, thunk_getUsersSpecificComments } from "../../store/thunks/polls.js";





const Polls = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const polls = useSelector(store => store.pollsReducer.polls);



  useEffect(() => {
    dispatch(thunk_getUsersPolls());
  },[dispatch]);


  const handleEachClick = (event, pollId) => {
    event.preventDefault();
    dispatch(thunk_getUsersSpecificComments(pollId));
    history.push(`/comments/${pollId}`);
  }



  if (polls === null){
    return (
      <>
      <h1> Loading ... </h1>
      </>
    );
  }




  return (
    <>
    <div>
      <h1> Your Polls </h1>
    </div>

    <div>
        {Object.values(polls).map(eachPoll => (
          <>
          <div>
              <a href='/' onClick={event => handleEachClick(event, eachPoll.id)}>
              <li key={eachPoll.id}>
                  <h3> { eachPoll.title } </h3>
              </li>
            </a>
          </div>
          </>
        ))}
    </div>
    </>
  )
};



export default Polls;
