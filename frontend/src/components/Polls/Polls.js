
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";
import { thunk_getUsersPolls, thunk_getUsersSpecificComments, thunk_deleteSpecificPoll, thunk_allPolls } from "../../store/thunks/polls.js";
import { resetErrors } from '../../store/actions/errors.js';

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
  const [ updatePollPayload, setUpdatePollPayload ] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const polls = useSelector(store => store.pollsReducer.polls);
  const allPolls = useSelector(store => store.allPollsReducer.polls);
  const { smallFormStyle } = useModalStyle();


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




  const handleUpdate = (event, payload) => {
    event.preventDefault();
    setUpdatePollPayload(payload);
    setOpenUpdatePollModal(true);
  }



  const closeCreatePollModal = () => {
    dispatch(resetErrors());
    setOpenCreatePollModal(false);
  }


  const closeUpdatePollModal = () => {
    dispatch(resetErrors());
    setOpenUpdatePollModal(false);
  }




  if (!polls || !allPolls || !loading) return ( <LoadScreen /> );




  const YourPolls = () => {

    return (
      <div className={styles.each_personal_poll_wrap}>
        {Object.values(polls).reverse().map(eachPoll => (
          <>
            <div>
              <div className={styles.each_poll_title}>
                <NavLink to='/' onClick={event => handleEachClick(event, eachPoll.id)}>
                  <li key={eachPoll.id}>
                    <h3> {eachPoll.title} </h3>
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
                  <NavLink to='/' onClick={event => handleUpdate(event, {
                    pollId: eachPoll.id,
                    isTitle: eachPoll.title,
                    isQuestion: eachPoll.question_text
                  })} > <GrUpdate /> </NavLink>
                </ToolTip>
              </div>
            </div>

          </>
        ))}
      </div>
    );
  };




  const AllPolls = () => {

    return (
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
    );
  };





  const Tabs = () => {
    const components = { onePoll: <YourPolls />, allPolls: <AllPolls /> };
    const [ eachPoll, setEachPoll ] = useState(components.onePoll);

    const toggle = (event, key) => {
      event.preventDefault();
      setEachPoll(components[key]);
    }


    return (
      <>
        <div className={styles.main_titles}>
          <NavLink to='/' onClick={event => toggle(event, 'onePoll')} >
            <h1 className={styles.polls_title}> Your Polls </h1>
          </NavLink>

          <NavLink to='/' onClick={event => toggle(event, 'allPolls')} >
            <h1 className={styles.allpolls_title} > All Polls </h1>
          </NavLink>
        </div>

        { eachPoll }
      </>
    );

  };



  return (
    <>
      <ReactModal
        isOpen={openCreatePollModal}
        onRequestClose={closeCreatePollModal}
        style={smallFormStyle}
        appElement={document.getElementById('root')}
      >
        <CreatePollForm closeModal={closeCreatePollModal} />

      </ReactModal>



      <ReactModal
        isOpen={openUpdatePollModal}
        onRequestClose={closeUpdatePollModal}
        style={smallFormStyle}
        appElement={document.getElementById('root')}
      >

        <CreatePollForm
          update={true}
          closeModal={closeUpdatePollModal}
          payload={updatePollPayload}
        />

      </ReactModal>



      <div className={styles.create_poll_button}>
        <ToolTip content={"New Poll"}>
          <NavLink to='/' onClick={event => handleCreate(event)} > <BsFillPlusSquareFill /> </NavLink>
        </ToolTip>
      </div>

      <Tabs />
    </>
  )
};



export default Polls;
