import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunk_searchForUsersPubChars } from "../../store/thunks/characters.js";
import { searchTriggered, clearSearchResults } from "../../store/actions/characters.js";

import DeletePubCharButton from "../DeletePubCharButton";
import EditPubCharButton from "../EditPubCharButton";


const CharacterSearch = ({ user }) => {
  const [ searchId, setSearchId ] = useState("");
  const [ specificChar, setSpecificChar ] = useState(false);
  const [ charId, setCharId ] = useState(false);
  const dispatch = useDispatch();
  const searchedChar = useSelector((store) => store.searchCharacterPageReducer.characters)
  const char = useSelector((store) => store.searchCharacterPageReducer)




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


  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(thunk_searchForUsersPubChars(searchId))
    dispatch(searchTriggered({ search: true }))
  }



  const clearSearch = (event) => {
    event.preventDefault();
    dispatch(clearSearchResults({ characters: null }))
    dispatch(searchTriggered({ search: null }))
  }



  if(specificChar === true) {
    return (
        <div>
          <h1>Search Results</h1>

          <a href='/' onClick={(event) => hideSpecificChar(event)}>
            <h1> {char[charId].username} </h1>
            <li key={charId} >
              {char[charId].character_name}
              <br />
              {char[charId].character_label}
            </li>
            <img src={char[charId].avatar} alt={char[charId].character_name} />
          </a>
        </div>

    )
  }



  if (searchedChar !== null && char) {

    return(
      <>
      <div>
        <h1>Search Results</h1>

          <a href='/' onClick={(event) => clearSearch(event)} > Back </a>

      <div>
            {Object.values(char).map(eachChar => (
              <>
                <a href='/' onClick={(event) => showSpecificChar(event, eachChar.id)}>
                  <li key={eachChar.id}>
                    By: {eachChar.username}
                    <br />
                    {eachChar.character_name}
                    <br />
                    {eachChar.character_label}
                  </li>
                  <img src={eachChar.avatar} alt={eachChar.character_name} />
                </a>

                <DeletePubCharButton charId={eachChar.id} user={user} />
                <EditPubCharButton charId={eachChar.id} />
              </>
            ))}
      </div>
      </div>
      </>
    )
  }







  return (
    <>
    <div>
      <label>
        Search
        <input
          type="text"
          name="search"
          value={searchId}
          onChange={(event) => setSearchId(event.target.value)}
        />
      </label>

      <div>
          <a href='/' onClick={(event) => handleSearch(event) } > Search Characters </a>
      </div>

    </div>
    </>
  )
};




export default CharacterSearch;
