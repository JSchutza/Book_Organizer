import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";


import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";


import { thunk_deleteUsersPubChars } from "../../store/thunks/characters.js";
import { thunk_getFollowing, thunk_followOrUnfollow } from "../../store/thunks/following.js";
import { useUser } from "../../context/UserContext";



import ToolTip from "../ToolTip";


import styles from "./specificpubchar.module.css"




const SpecificPubChar = ({ theChar=false, followingInfo=false, hideSpecificChar }) => {
  const [update, setUpdate] = useState(false);
  const [updatePayload, setUpdatePayload] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const { isUser } = useUser();

// need to on first render / if page is reloaded get specific char information









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
    setUpdate(true);
  }




  const handleDelete = (event, { charId }) => {
    event.preventDefault();
    dispatch(thunk_deleteUsersPubChars(charId));

  };







  // if theChar is false show loading screen
  if (!theChar) {
    return (
    <>
      <h1>Loading character information ... </h1>
    </>
    );
  }





  return (
    <>
      <div className={styles.specific_char_wrap}>
        {/* if the selected character belongs to the currently logged-in user */}
        {theChar.user_id === isUser.id ?
          <>
            <div>
              <a href='/' onClick={event => toProfile(event)}> Profile </a>
            </div>


            <div className={styles.specific_char_buttons_wrap}>
              <div className={styles.specific_char_update_button}>
                <ToolTip content={'Update'} >
                  <a href='/' onClick={event => handleUpdate(event, {
                    charId: theChar.id,
                    avatar: theChar.avatar,
                    character_label: theChar.character_label,
                    character_name: theChar.character_name,
                    created_at: theChar.created_at,
                    pub_date: theChar.pub_date,
                    user_id: theChar.user_id,
                    username: theChar.username,
                    search_id: theChar.search_id
                  })}> <GrUpdate /> </a>
                </ToolTip>
              </div>

              <div className={styles.specific_char_delete_button}>
                <ToolTip content={'Delete'} >
                  <a href='/' onClick={event => handleDelete(event, { charId: theChar.id })} > <RiDeleteBinFill /> </a>
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

            {followingInfo.following[theChar.user_id] ?
              <div className={styles.specific_char_follow_unfollow_button}>
                <a href='/' onClick={event => handleFollowOrUnfollow(event, theChar.user_id)}>
                  Unfollow
                </a>
              </div>

              :

              <div className={styles.specific_char_follow_unfollow_button}>
                <a href='/' onClick={event => handleFollowOrUnfollow(event, theChar.user_id)}>
                  Follow
                </a>
              </div>
            }
          </>
        }








        <div className={styles.specific_char_containter}>
          <a href='/' onClick={(event) => hideSpecificChar(event)}>

            <div className={styles.specific_char_username}>
              <h1> {theChar.username} </h1>
            </div>

            <li>
              {theChar.character_name}
              <br />
              {theChar.character_label}
            </li>

            <img src={theChar.avatar} alt={theChar.character_name} />
          </a>
        </div>

      </div>
    </>
  );

};

export default SpecificPubChar;
