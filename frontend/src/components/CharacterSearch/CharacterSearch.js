import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunk_searchForUsersPubChars } from "../../store/thunks/characters.js";




const CharacterSearch = () => {
  const [ searchId, setSearchId ] = useState("");
  const dispatch = useDispatch();
  const searchedChar = useSelector((store) => store.searchCharacterPageReducer.characters)


  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(thunk_searchForUsersPubChars(searchId))
  }


  if (searchedChar !== null) {
    return(
      <>
      <div>
        <h1>Search Results</h1>
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
