// icon imports here
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";
import ToolTip from "../ToolTip";
import styles from "./charactersearch.module.css";
import React, { useState, useEffect } from 'react';
import Modal from "../Modal";
import { useDispatch, useSelector } from 'react-redux';
import { thunk_searchForUsersPubChars } from "../../store/thunks/characters.js";
import { searchTriggered, clearSearchResults } from "../../store/actions/characters.js";
import { showModal, contentModal, dataModal } from "../../store/actions/modal.js";;







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


  const handleDelete = (event, charId) => {
    event.preventDefault();
    dispatch(contentModal("DeletePubChar"));
    dispatch(dataModal(charId));
    dispatch(showModal());
  }


  const handleUpdate = (event, charId) => {
    event.preventDefault();
    dispatch(contentModal("EditPubChar"));
    dispatch(dataModal(charId));
    dispatch(showModal());
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
        <h2>Search Results</h2>
          <ToolTip content={"Back"} >
            <a href='/' onClick={(event) => clearSearch(event)} > <IoIosArrowDropleftCircle/> </a>
          </ToolTip>


      <div className={styles.search_results_wrap}>
            {Object.values(char).map(eachChar => (
              <>
              <div className={styles.search_results_each_card}>
                <a href='/' onClick={(event) => showSpecificChar(event, eachChar.id)}>
                  <li className={styles.search_results_each_detail} key={eachChar.id}>
                    <div className={styles.search_results_each_detail_text}>
                      <b> Name </b>
                        <p>{eachChar.character_name}</p>
                      <b>Label</b>
                        <p>{eachChar.character_label}</p>
                    </div>
                  </li>
                <img className={styles.search_results_each_img} src={eachChar.avatar} alt={eachChar.character_name} />
                </a>

                <a href='/' onClick={(event) => handleDelete(event, eachChar.id)}> <RiDeleteBinFill /> </a>
                <a href='/' onClick={(event) => handleUpdate(event, eachChar.id)}> Update </a>

              </div>
              </>
            ))}
      </div>


        <Modal user={user} />


      </>
    )
  }







  return (
    <>
    <div className={styles.search_wrapper}>
      <div className={styles.search_input}>
      <label>
        Search
        <input
          type="text"
          name="search"
          value={searchId}
          onChange={(event) => setSearchId(event.target.value)}
          />
      </label>
    </div>


      <div className={styles.search_icon}>
          <ToolTip content={"Search"} >
            <a href='/' onClick={(event) => handleSearch(event)} > <BsSearch/> </a>
          </ToolTip>
      </div>
    </div>
    </>
  )
};




export default CharacterSearch;
