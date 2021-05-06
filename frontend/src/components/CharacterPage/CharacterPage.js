
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import CreateCharacterForm from "../CreateCharacterForm";
import CharacterSearch from "../CharacterSearch";
import { thunk_getAllCharacters } from "../../store/thunks/characters.js";


const CharacterPage = () => {
  const [ specificChar, setSpecificChar ] = useState(false);
  const [ charId, setCharId ] = useState(false);
  const [ openModal, setOpenModal ] = useState(false);
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
    setOpenModal(true);
  }

  const closeModalModal = (event) => {
    event.preventDefault();
    setOpenModal(false);
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



  if(openModal === true){
    return(
      <>
        <a href='/' onClick={(event) => closeModalModal(event)}>
          <h1> Create a Character </h1>
        </a>
        <CreateCharacterForm />
      </>
    )
  }


  return (
    <>
    <div>
      <h1> Characters </h1>
    <div>

    <div>
      <CharacterSearch />
    </div>

    <div>
      <a href='/' onClick={(event) => createCharactersClick(event)}> Create Character </a>
    </div>

    {Object.values(allChars).map(eachChar => (
      <>
        <a href='/' onClick={(event) => showSpecificChar(event, eachChar.id) }>
        <li key={eachChar.id}>
          By: {eachChar.username}
          <br/>
          {eachChar.character_name}
          <br/>
          {eachChar.character_label}
        </li>
        <img src={eachChar.avatar} alt={eachChar.character_name} />
      </a>
      </>
      ))}
      </div>

    </div>
    </>
  )





}



export default CharacterPage;
