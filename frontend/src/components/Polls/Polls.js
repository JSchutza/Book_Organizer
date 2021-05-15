
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { thunk_getUsersPolls, thunk_getUsersSpecificComments, thunk_deleteSpecificPoll, thunk_allPolls } from "../../store/thunks/polls.js";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";
import { BsFillPlusSquareFill } from "react-icons/bs";
import ToolTip from "../ToolTip";
import { showModal, contentModal, dataModal } from "../../store/actions/modal.js";




const Polls = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const polls = useSelector(store => store.pollsReducer.polls);
  const allPolls = useSelector(store => store.allPollsReducer.polls);


  useEffect(() => {
    dispatch(thunk_getUsersPolls());
    dispatch(thunk_allPolls());
  },[dispatch]);


  const handleEachClick = (event, pollId) => {
    event.preventDefault();
    dispatch(thunk_getUsersSpecificComments(pollId));
    history.push(`/comments/${pollId}`);
  }



  const handleCreate = (event) => {
    event.preventDefault();
    dispatch(contentModal("CreatePoll"));
    dispatch(showModal());
  }



  const handleDelete = (event, pollId) => {
    event.preventDefault();
    dispatch(thunk_deleteSpecificPoll(pollId));
  }


  const handleUpdate = (event, pollId) => {
    event.preventDefault();
    dispatch(dataModal({ pollId }))
    dispatch(contentModal("UpdatePoll"));
    dispatch(showModal());
  }




  if (polls === null || allPolls === null){
    return (
      <>
      <h1> Loading ... </h1>
      </>
    );
  }




  return (
    <>
      <div>
        <ToolTip content={"New Poll"}>
          <a href='/' onClick={event => handleCreate(event)} > <BsFillPlusSquareFill /> </a>
        </ToolTip>
      </div>

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

            <div>
              <ToolTip content={"Delete"}>
                <a href='/' onClick={event => handleDelete(event, eachPoll.id)} > <RiDeleteBinFill /> </a>
              </ToolTip>
            </div>

            <div>
              <ToolTip content={"Update"}>
                <a href='/' onClick={event => handleUpdate(event, eachPoll.id)} > <GrUpdate /> </a>
              </ToolTip>
            </div>

          </div>
          </>
        ))}
    </div>


    <div>
      <h1> All Polls </h1>
    </div>

    <div>
        {Object.values(allPolls).map(eachPoll => (
          <>
          <div>
              <a href='/' onClick={event => handleEachClick(event, eachPoll.id)}>
              <li key={eachPoll.id}>
                <h3> {eachPoll.title} </h3>
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
