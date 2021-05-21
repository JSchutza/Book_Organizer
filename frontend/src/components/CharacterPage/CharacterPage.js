
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { thunk_getAllCharacters } from "../../store/thunks/characters.js";
import { showModal, contentModal, dataModal } from "../../store/actions/modal.js";
import { useHistory, NavLink } from "react-router-dom";
import ToolTip from "../ToolTip";
import { useUser } from "../../context/UserContext.js";

import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { BsFillPlusSquareFill } from "react-icons/bs";
import styles from "./characterpage.module.css"





const CharacterPage = () => {
  const [ specificChar, setSpecificChar ] = useState(false);
  const [ charId, setCharId ] = useState(false);
  const [ isHidden, setIsHidden ] = useState('');
  const allChars = useSelector((store) => store.characterPageReducer.characters)
  const dispatch = useDispatch();
  const history = useHistory();
  const { isUser } = useUser();


  useEffect(() => {
    dispatch(thunk_getAllCharacters());
    setIsHidden('');
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
    setIsHidden('hide');
    dispatch(contentModal("DeletePubChar"));
    dispatch(dataModal(payload));
    dispatch(showModal());
    history.push("/dropdown");
  }


  const handleUpdate = (event, payload) => {
    event.preventDefault();
    dispatch(contentModal("EditPubChar"));
    dispatch(dataModal(payload));
    dispatch(showModal());
    history.push("/dropdown");
  }




  const createCharactersClick = (event) => {
    event.preventDefault();
      setIsHidden('hide');
      dispatch(dataModal({ setIsHidden, lastpage: '/characters' }));
      dispatch(contentModal("CreatePubChar"));
      dispatch(showModal());
      history.push("/dropdown");
  }




  if(allChars === null) {
    return (
      <>
      <h1>Loading characters .... </h1>
      </>
    )
  }


  if(specificChar === true){
    return (
      <>
      <div>
      <div>
        <NavLink to={`/user/${allChars[charId].search_id}`} exact>
          Profile
        </NavLink>
      </div>

      <div>
          <a href='/' onClick={(event) => hideSpecificChar(event) }>
          <h1> {allChars[charId].username} </h1>
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

    <h1> Characters </h1>


    <div className={styles.page_wrapper}>
    {Object.values(allChars).reverse().map(eachChar => (
      <>
      <div className={styles.each_card}>
        <a href='/' onClick={(event) => showSpecificChar(event, eachChar.id) }>
        <div className={isHidden} >
        <li className={styles.each_detail} key={eachChar.id}>
          <div className={styles.each_detail_text}>
          <b> {eachChar.username} </b>
            <p> {eachChar.character_name} </p>
            <p> {eachChar.character_label} </p>
          </div>
        </li>
          </div>
          <img className={styles.each_img} src={eachChar.avatar} alt={eachChar.character_name} />
      </a>
      </div>


        {eachChar.user_id === isUser.id ?
          <div>
            <div>
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

            <div>
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
                  setIsHidden,
                  lastpage: "/characters"

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
