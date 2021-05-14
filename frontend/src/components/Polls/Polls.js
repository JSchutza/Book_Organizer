
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { thunk_getUsersPolls } from "../../store/thunks/polls.js";





const Polls = () => {
  const dispatch = useDispatch();
  const polls = useSelector(store => store.pollsReducer.polls);



  useEffect(() => {
    dispatch(thunk_getUsersPolls());
  },[dispatch]);


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
            <a href='/' onClick={event => event.preventDefault()}>
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
