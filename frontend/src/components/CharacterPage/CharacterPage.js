import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"

import { useHistory, NavLink, Link } from "react-router-dom";

import { thunk_getAllCharacters } from "../../store/thunks/characters.js";
import { thunk_getFollowing, thunk_followOrUnfollow } from "../../store/thunks/following.js";


import { useUser } from "../../context/UserContext.js";

import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { BsFillPlusSquareFill } from "react-icons/bs";
import LoadScreen from "../LoadScreen";
import ToolTip from "../ToolTip";

import styles from "./characterpage.module.css"





const CharacterPage = () => {
  const [ loading, setLoading ] = useState(false);
  const [ specificChar, setSpecificChar ] = useState(false);
  const [ charId, setCharId ] = useState(false);
  let endloading;

  const allChars = useSelector((store) => store.characterPageReducer.characters);
  const followingInfo = useSelector(store => store.followingReducer.following);

  const dispatch = useDispatch();
  const history = useHistory();
  const { isUser } = useUser();




  useEffect(() => {
    dispatch(thunk_getFollowing());
  }, [dispatch]);







  useEffect(() => {
    if (!loading) {
      dispatch(thunk_getAllCharacters());

      endloading = setTimeout(() => {
        setLoading(true);
      }, 1000);
    }

    return () => {
      clearTimeout(endloading);
    }
  }, [specificChar, dispatch]);





  const showSpecificChar = (event, the_char_id) => {
    event.preventDefault();
    setCharId(the_char_id);
    setSpecificChar(true);
  }




  const hideSpecificChar = (event) => {
    event.preventDefault();
    setCharId(false);
    setSpecificChar(false);
  }





  const handleDelete = (event, payload) => {
    event.preventDefault();
  }




  const handleUpdate = (event, payload) => {
    event.preventDefault();

  }






  const createCharactersClick = (event) => {
    event.preventDefault();

  }








  const toProfile = event => {
    event.preventDefault();
    history.push('/profile');
  }







  const handleFollowOrUnfollow = (event, userId) => {
    event.preventDefault();
    dispatch(thunk_followOrUnfollow(userId));
  }





  if (allChars === null || !loading) {
    return (
      <>
        <LoadScreen />
      </>
    )
  }





  if(specificChar === true){
    return (
      <>
      <div className={styles.specific_char_wrap}>
          {/* if the selected character belongs to the currently logged-in user */}
          {allChars[charId].user_id === isUser.id ?
          <>
            <div>
              <a href='/' onClick={event => toProfile(event)}> Profile </a>
            </div>


              <div className={styles.specific_char_buttons_wrap}>
                <div className={styles.specific_char_update_button}>
                  <ToolTip content={'Update'} >
                    <a href='/' onClick={event => handleUpdate(event, {
                      charId: allChars[charId].id,
                      avatar: allChars[charId].avatar,
                      character_label: allChars[charId].character_label,
                      character_name: allChars[charId].character_name,
                      created_at: allChars[charId].created_at,
                      pub_date: allChars[charId].pub_date,
                      user_id: allChars[charId].user_id,
                      username: allChars[charId].username,
                      search_id: allChars[charId].search_id,
                      lastpage: "/characters",
                      charPage: true

                    })}> <GrUpdate /> </a>
                  </ToolTip>
                </div>

                <div className={styles.specific_char_delete_button}>
                  <ToolTip content={'Delete'} >
                    <a href='/' onClick={event => handleDelete(event, {
                      charId: allChars[charId].id,
                      avatar: allChars[charId].avatar,
                      character_label: allChars[charId].character_label,
                      character_name: allChars[charId].character_name,
                      created_at: allChars[charId].created_at,
                      pub_date: allChars[charId].pub_date,
                      user_id: allChars[charId].user_id,
                      username: allChars[charId].username,
                      search_id: allChars[charId].search_id,
                      charPage: true

                    })} > <RiDeleteBinFill /> </a>
                  </ToolTip>
                </div>
            </div>
          </>

          :

          <>
          <div className={styles.specific_char_userprofile_button}>
            <NavLink to={`/user/${allChars[charId].search_id}`} exact>
              Profile
            </NavLink>
          </div>

                {followingInfo.following[allChars[charId].user_id] ?
                  <div className={styles.specific_char_follow_unfollow_button}>
                    <a href='/' onClick={event => handleFollowOrUnfollow(event, allChars[charId].user_id)}>
                      Unfollow
                    </a>
                  </div>

                  :

                <div className={styles.specific_char_follow_unfollow_button}>
                    <a href='/' onClick={event => handleFollowOrUnfollow(event, allChars[charId].user_id)}>
                      Follow
                    </a>
                  </div>
                }
        </>
        }


      <div className={styles.specific_char_containter}>
          <a href='/' onClick={(event) => hideSpecificChar(event) }>

            <div className={styles.specific_char_username}>
              <h1> {allChars[charId].username} </h1>
            </div>

            <li key={charId} >
              {allChars[charId].character_name}
              <br/>
              {allChars[charId].character_label}
            </li>

            <img src={allChars[charId].avatar} alt={allChars[charId].character_name} />
          </a>
      </div>

      </div>
      </>
      )
  }






  return (
    <>

    <div className={styles.create_button}>
      <ToolTip content='Create'>
        <a href='/' onClick={(event) => createCharactersClick(event)}> <BsFillPlusSquareFill/> </a>
      </ToolTip>
    </div>

    <div className={styles.characters_header}>
      <h1> Characters </h1>
    </div>


    <div className={styles.page_wrapper}>
    {Object.values(allChars).reverse().map(eachChar => (
      <>
      <div className={styles.each_card}>
        <a href='/' onClick={(event) => showSpecificChar(event, eachChar.id) }>

        <li className={styles.each_detail} key={eachChar.id}>
          <div className={styles.each_detail_text}>
          <b> {eachChar.username} </b>
            <p> {eachChar.character_name} </p>
            <p> {eachChar.character_label} </p>
          </div>
        </li>

          <img className={styles.each_img} src={eachChar.avatar} alt={eachChar.character_name} />
      </a>
      </div>


        {eachChar.user_id === isUser.id ?
          <div className={styles.users_character_button_wrap}>
            <div className={styles.each_button}>
              <ToolTip content={'Update'} >
                <a href='/' onClick={event => handleUpdate(event, {
                  charId: eachChar.id,
                  avatar: eachChar.avatar,
                  character_label: eachChar.character_label,
                  character_name: eachChar.character_name,
                  created_at: eachChar.created_at,
                  pub_date: eachChar.pub_date,
                  user_id: eachChar.user_id,
                  username: eachChar.username,
                  search_id: eachChar.search_id,
                  lastpage: "/characters",
                  charPage: true

                })}> <GrUpdate /> </a>
              </ToolTip>
            </div>

            <div className={styles.each_button}>
              <ToolTip content={'Delete'} >
                <a href='/' onClick={event => handleDelete(event, {
                  charId: eachChar.id,
                  avatar: eachChar.avatar,
                  character_label: eachChar.character_label,
                  character_name: eachChar.character_name,
                  created_at: eachChar.created_at,
                  pub_date: eachChar.pub_date,
                  user_id: eachChar.user_id,
                  username: eachChar.username,
                  search_id: eachChar.search_id,
                  charPage: true

                })} > <RiDeleteBinFill /> </a>
              </ToolTip>
            </div>
          </div>
        :
        <></>
        }
      </>
      ))}
    </div>

    </>
  )





}



export default CharacterPage;
