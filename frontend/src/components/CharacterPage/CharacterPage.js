
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { thunk_getAllCharacters } from "../../store/thunks/characters.js";
import { showModal, contentModal, hideModal, dataModal } from "../../store/actions/modal.js";

import ToolTip from "../ToolTip";


import { BsFillPlusSquareFill } from "react-icons/bs";
import styles from "./characterpage.module.css"





const CharacterPage = () => {
  const [ specificChar, setSpecificChar ] = useState(false);
  const [ charId, setCharId ] = useState(false);
  const [ isHidden, setIsHidden ] = useState('');
  const allChars = useSelector((store) => store.characterPageReducer.characters)
  const dispatch = useDispatch();



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


  const createCharactersClick = (event) => {
    event.preventDefault();
      setIsHidden('hide');
      dispatch(dataModal({ setIsHidden }));
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






  return (
    <>

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
      </>
      ))}
    </div>

    </>
  )





}



export default CharacterPage;
