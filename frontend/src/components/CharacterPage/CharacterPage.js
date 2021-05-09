
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { thunk_getAllCharacters } from "../../store/thunks/characters.js";
import { showModal, contentModal } from "../../store/actions/modal.js";

import ToolTip from "../ToolTip";
import Modal from "../Modal";

import { BsFillPlusSquareFill } from "react-icons/bs";
import styles from "./characterpage.module.css"





const CharacterPage = () => {
  const [ specificChar, setSpecificChar ] = useState(false);
  const [ charId, setCharId ] = useState(false);
  const allChars = useSelector((store) => store.characterPageReducer.characters)
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(thunk_getAllCharacters());
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


  const createCharactersClick = (event) => {
    event.preventDefault();
    dispatch(contentModal("CreatePubChar"));
    dispatch(showModal());
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
      </>
      )
  }



  // if(openModal === true){
  //   return(
  //     <>
  //       <a href='/' onClick={(event) => closeModalModal(event)}>
  //         <h1> Create a Character </h1>
  //       </a>
  //       <CreateCharacterForm />
  //     </>
  //   )
  // }


  return (
    <>
    <Modal />

    <div className={styles.create_button}>
      <ToolTip content='Create'>
        <a href='/' onClick={(event) => createCharactersClick(event)}> <BsFillPlusSquareFill/> </a>
      </ToolTip>
    </div>

    <h1> Characters </h1>


    <div className={styles.page_wrapper}>
    {Object.values(allChars).map(eachChar => (
      <>
      <div className={styles.each_card}>
        <a href='/' onClick={(event) => showSpecificChar(event, eachChar.id) }>
        <li className={styles.each_detail} key={eachChar.id}>
          By: {eachChar.username}
          <br/>
          {eachChar.character_name}
          <br/>
          {eachChar.character_label}
        </li>
          <img className={styles.each_img} src={eachChar.avatar} alt={eachChar.character_name} />
      </a>
      </div>
      </>
      ))}
    </div>

    </>
  )





}



export default CharacterPage;
