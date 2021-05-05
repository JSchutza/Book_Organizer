
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { thunk_getAllCharacters } from "../../store/thunks/characters.js";


const CharacterPage = () => {
  const [ specificChar, setSpecificChar ] = useState(false);
  const [ charId, setCharId ] = useState(false);
  const allChars = useSelector((store) => store.characterPageReducer.characters)
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(thunk_getAllCharacters());
  }, [specificChar]);


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
          <a onClick={(event) => hideSpecificChar(event) }>
          <h1> {allChars[charId].username} </h1>
            <li key={charId} >
              {allChars[charId].character_name}
              <br/>
              {allChars[charId].character_label}
            </li>
            <img src={allChars[charId].avatar} />
          </a>
      </div>
      </>
      )
  }





  return (
    <>
    <div>
      <h1> Characters </h1>
    <div>
    {Object.values(allChars).map(eachChar => (
      <>
        <a onClick={(event) => showSpecificChar(event, eachChar.id) }>
        <li key={eachChar.id}>
          By: {eachChar.username}
          <br/>
          {eachChar.character_name}
          <br/>
          {eachChar.character_label}
        </li>
        <img src={eachChar.avatar}/>
      </a>
      </>
      ))}
      </div>


    </div>
    </>
  )





}



export default CharacterPage;
