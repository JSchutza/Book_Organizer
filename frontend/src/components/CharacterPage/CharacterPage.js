
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { thunk_getAllCharacters } from "../../store/thunks/characters.js";


const CharacterPage = () => {
  const allChars = useSelector((store) => store.characterPageReducer.characters)
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(thunk_getAllCharacters());
  }, []);





  if(allChars === null) {
    return (
      <>
      <h1>Loading characters .... </h1>
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
      <a>
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
