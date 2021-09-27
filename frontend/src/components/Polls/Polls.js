
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";
import { thunk_getUsersPolls, thunk_getUsersSpecificComments, thunk_deleteSpecificPoll, thunk_allPolls } from "../../store/thunks/polls.js";

import { GrUpdate } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { useModalStyle } from "../../context/ReactModalStylesContext.js";
import LoadScreen from "../LoadScreen";
import ToolTip from "../ToolTip";
import ReactModal from 'react-modal';
import CreatePollForm from "../CreatePollForm";



import styles from "./polls.module.css";



const Polls = () => {
  const [ loading, setLoading ] = useState(false);
  const [ openCreatePollModal, setOpenCreatePollModal ] = useState(false);
  const [ openUpdatePollModal, setOpenUpdatePollModal ] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const polls = useSelector(store => store.pollsReducer.polls);
  const allPolls = useSelector(store => store.allPollsReducer.polls);
  const { currentStyle } = useModalStyle();


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
    // set state with the current poll info so it can be passed as props to the
    // form
    setOpenUpdatePollModal(true);
  }



  const closeCreatePollModal = () => {
    setOpenCreatePollModal(false);
  }


  const closeUpdatePollModal = () => {
    setOpenUpdatePollModal(false);
  }



  if (!polls || !allPolls || !loading) return ( <LoadScreen /> );




  return (
    <>
      <ReactModal
        isOpen={openCreatePollModal}
        onRequestClose={closeCreatePollModal}
        style={currentStyle}
        appElement={document.getElementById('root')}
      >
        <CreatePollForm closeModal={closeCreatePollModal} />

      </ReactModal>



      <ReactModal
        isOpen={openUpdatePollModal}
        onRequestClose={closeUpdatePollModal}
        style={currentStyle}
        appElement={document.getElementById('root')}
      >

        <CreatePollForm
          update={true}
          closeModal={closeUpdatePollModal}

        />

      </ReactModal>



      <div className={styles.create_poll_button}>
        <ToolTip content={"New Poll"}>
          <NavLink to='/' onClick={event => handleCreate(event)} > <BsFillPlusSquareFill /> </NavLink>
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
              <NavLink to='/' onClick={event => handleEachClick(event, eachPoll.id)}>
                <li key={eachPoll.id}>
                  <h3> { eachPoll.title } </h3>
                </li>
              </NavLink>
            </div>
          </div>


            <div className={styles.each_poll_button_wrap}>
            <div className={styles.each_poll_delete_button}>
              <ToolTip content={"Delete"}>
                <NavLink to='/' onClick={event => handleDelete(event, eachPoll.id)} > <RiDeleteBinFill /> </NavLink>
              </ToolTip>
            </div>

            <div className={styles.each_poll_update_button}>
              <ToolTip content={"Update"}>
                <NavLink to='/' onClick={event => handleUpdate(event, eachPoll.id)} > <GrUpdate /> </NavLink>
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
            <NavLink to='/' onClick={event => handleEachClick(event, eachPoll.id)}>
              <li key={eachPoll.id}>
                <h3> {eachPoll.title} </h3>
              </li>
            </NavLink>
          </div>
          </>
        ))}
    </div>

    </>
  )
};



export default Polls;
