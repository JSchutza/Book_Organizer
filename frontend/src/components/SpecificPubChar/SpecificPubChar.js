import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";


import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";


import { thunk_deleteUsersPubChars } from "../../store/thunks/characters.js";
import { thunk_followOrUnfollow } from "../../store/thunks/following.js";
import { useUser } from "../../context/UserContext";
import { useModalStyle } from "../../context/ReactModalStylesContext.js";

import UpdatePubCharForm from "../UpdatePubCharForm";
import ToolTip from "../ToolTip";

import ReactModal from 'react-modal';

import styles from "./specificpubchar.module.css"




const SpecificPubChar = ({ theChar=false, followingInfo=false, hideSpecificChar, setSpecificChar }) => {
  const [ openModal, setOpenModal ] = useState(false);
  const [ updatePayload, setUpdatePayload ] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const { isUser } = useUser();
  const { characterFormStyle } = useModalStyle();






  const closeModal = () => {
    setOpenModal(false);
    setSpecificChar(false);
  }




  const handleFollowOrUnfollow = (event, userId) => {
    event.preventDefault();
    dispatch(thunk_followOrUnfollow(userId));
  }





  const toProfile = event => {
    event.preventDefault();
    history.push('/profile');
  }




  const handleUpdate = (event, payload) => {
    event.preventDefault();
    setUpdatePayload(payload);
    setOpenModal(true);
  }




  const handleDelete = (event, { charId }) => {
    event.preventDefault();
    dispatch(thunk_deleteUsersPubChars(charId));
    setSpecificChar(false);
  };







  // if theChar is false show loading screen
  if (!theChar) return (<h1>Loading character information ... </h1>);





  return (
    <>
      <div className={styles.specific_char_wrap}>

        <ReactModal
          isOpen={openModal}
          onRequestClose={closeModal}
          style={characterFormStyle}
          appElement={document.getElementById('root')}
        >
          <UpdatePubCharForm
            closeUpdateModal={closeModal}
            payload={updatePayload}
          />

        </ReactModal>

        {/* if the selected character belongs to the currently logged-in user */}
        {theChar.user_id === isUser.id ?
          <>
            <div className={styles.profile_button} >
              <NavLink to='/' onClick={event => toProfile(event)}> Profile </NavLink>
            </div>


            <div className={styles.specific_char_buttons_wrap}>
              <div className={styles.specific_char_update_button}>
                <ToolTip content={'Update'} >
                  <NavLink to='/' onClick={event => handleUpdate(event, {
                    charId: theChar.id,
                    avatar: theChar.avatar,
                    character_label: theChar.character_label,
                    character_name: theChar.character_name,
                    created_at: theChar.created_at,
                    pub_date: theChar.pub_date,
                    user_id: theChar.user_id,
                    username: theChar.username,
                    search_id: theChar.search_id
                  })}> <GrUpdate /> </NavLink>
                </ToolTip>
              </div>

              <div className={styles.specific_char_delete_button}>
                <ToolTip content={'Delete'} >
                  <NavLink to='/' onClick={event => handleDelete(event, { charId: theChar.id })} > <RiDeleteBinFill /> </NavLink>
                </ToolTip>
              </div>
            </div>
          </>

          :

          <>
            <div className={styles.specific_char_userprofile_button}>
              <NavLink to={`/user/${theChar.search_id}`} exact>
                Profile
              </NavLink>
            </div>

            {followingInfo[theChar.user_id] ?
              <div className={styles.specific_char_follow_unfollow_button}>
                <NavLink to='/' onClick={event => handleFollowOrUnfollow(event, theChar.user_id)}>
                  Unfollow
                </NavLink>
              </div>

              :

              <div className={styles.specific_char_follow_unfollow_button}>
                <NavLink to='/' onClick={event => handleFollowOrUnfollow(event, theChar.user_id)}>
                  Follow
                </NavLink>
              </div>
            }
          </>
        }







        {/* if the selected char does NOT belong to the currently logged in user */}
        <div className={styles.specific_char_containter}>
          <NavLink to='/' onClick={(event) => hideSpecificChar(event)}>

            <div className={styles.specific_char_username}>
              <h1> {theChar.username} </h1>
            </div>

            <li>
              {theChar.character_name}
              <br />
              {theChar.character_label}
            </li>

            <img src={theChar.avatar} alt={theChar.character_name} />
          </NavLink>
        </div>

      </div>
    </>
  );

};

export default SpecificPubChar;
