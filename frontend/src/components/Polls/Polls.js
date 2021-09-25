
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { thunk_getUsersPolls, thunk_getUsersSpecificComments, thunk_deleteSpecificPoll, thunk_allPolls } from "../../store/thunks/polls.js";

import { GrUpdate } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";
import { BsFillPlusSquareFill } from "react-icons/bs";
import LoadScreen from "../LoadScreen";
import ToolTip from "../ToolTip";
import ReactModal from 'react-modal';
import CreatePollForm from "../CreatePollForm";



import styles from "./polls.module.css";



const Polls = () => {
  const [ loading, setLoading ] = useState(false);
  const [ openCreatePollModal, setOpenCreatePollModal ] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const polls = useSelector(store => store.pollsReducer.polls);
  const allPolls = useSelector(store => store.allPollsReducer.polls);


  useEffect(() => {
    if (!loading) {
      dispatch(thunk_getUsersPolls());
      dispatch(thunk_allPolls());
      setTimeout(() => {
        setLoading(true);
      }, 1000);
    }
  },[dispatch]);





  const handleEachClick = (event, pollId) => {
    event.preventDefault();
    dispatch(thunk_getUsersSpecificComments(pollId));
    history.push(`/comments/${pollId}`);
  }




  const handleCreate = event => {
    event.preventDefault();
    setOpenCreatePollModal(true);
  }




  const handleDelete = (event, pollId) => {
    event.preventDefault();
    dispatch(thunk_deleteSpecificPoll(pollId));
  }




  const handleUpdate = (event, pollId) => {
    event.preventDefault();
  }



  const closeCreatePollModal = () => {
    setOpenCreatePollModal(false);
  }




  if (!polls || !allPolls || !loading){
    return (
      <>
        <LoadScreen />
      </>
    );
  }




  return (
    <>
      <ReactModal
        isOpen={openCreatePollModal}
        onRequestClose={closeCreatePollModal}
        appElement={document.getElementById('root')}
      >
        <CreatePollForm closeModal={closeCreatePollModal} />

      </ReactModal>



      <div className={styles.create_poll_button}>
        <ToolTip content={"New Poll"}>
          <a href='/' onClick={event => handleCreate(event)} > <BsFillPlusSquareFill /> </a>
        </ToolTip>
      </div>


    <div className={styles.main_titles}>
      <h1> Your Polls </h1>
    </div>


    <div className={styles.each_personal_poll_wrap}>
        {Object.values(polls).reverse().map(eachPoll => (
          <>
          <div>
            <div className={styles.each_poll_title}>
              <a href='/' onClick={event => handleEachClick(event, eachPoll.id)}>
              <li key={eachPoll.id}>
                  <h3> { eachPoll.title } </h3>
              </li>
            </a>
            </div>
          </div>


            <div className={styles.each_poll_button_wrap}>
            <div className={styles.each_poll_delete_button}>
              <ToolTip content={"Delete"}>
                <a href='/' onClick={event => handleDelete(event, eachPoll.id)} > <RiDeleteBinFill /> </a>
              </ToolTip>
            </div>

            <div className={styles.each_poll_update_button}>
              <ToolTip content={"Update"}>
                <a href='/' onClick={event => handleUpdate(event, eachPoll.id)} > <GrUpdate /> </a>
              </ToolTip>
            </div>
          </div>

          </>
        ))}
    </div>




    <div className={styles.main_titles}>
      <h1> All Polls </h1>
    </div>


    <div className={styles.all_polls_wrapper}>
        {Object.values(allPolls).reverse().map(eachPoll => (
          <>
          <div className={styles.all_polls_each_link}>
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
