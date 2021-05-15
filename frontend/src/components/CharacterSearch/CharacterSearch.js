// icon imports here
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import ToolTip from "../ToolTip";
import styles from "./charactersearch.module.css";
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { resetErrors } from "../../store/actions/errors.js";
import { thunk_searchForUsersPubChars } from "../../store/thunks/characters.js";
import { searchTriggered, clearSearchResults } from "../../store/actions/characters.js";
import { showModal, contentModal, dataModal } from "../../store/actions/modal.js";;






const CharacterSearch = () => {
  const [ searchId, setSearchId ] = useState("");
  const [ isHidden, setIsHidden] = useState("");
  const [ backenderrors, setBackenderrors ] = useState(null);

  const dispatch = useDispatch();
  const searchedChar = useSelector((store) => store.searchCharacterPageReducer.characters);
  const char = useSelector((store) => store.searchCharacterPageReducer);
  const errors = useSelector((store)  => store.errorsReducer.errors);

  useEffect(() => {
    if(errors !== null ) {
      setBackenderrors(Object.values(errors));
    } else if (errors === null) {
      setBackenderrors(null);
    }
  }, [errors]);





  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(thunk_searchForUsersPubChars(searchId));
    dispatch(searchTriggered({ search: true }));
  }



  const clearSearch = (event) => {
    event.preventDefault();
    dispatch(clearSearchResults({ characters: null }));
    dispatch(searchTriggered({ search: null }));
  }


  const handleDelete = (event, payload) => {
    event.preventDefault();
    setIsHidden("hide");
    dispatch(contentModal("DeletePubChar"));
    dispatch(dataModal(payload));
    dispatch(showModal());
  }


  const handleUpdate = (event, payload) => {
    event.preventDefault();
    dispatch(contentModal("EditPubChar"));
    dispatch(dataModal(payload));
    dispatch(showModal());
  }


  const clearErrors = (event) => {
    event.preventDefault();
    dispatch(resetErrors());
    setBackenderrors(null);
    setSearchId("");
  }






  if (searchedChar !== null && char) {

    return(
      <>
      <div className={styles.search_title_backbutton}>
        <h2>Search Results</h2>
        <div className={styles.search_back_button}>
          <ToolTip content={"Back"} >
            <a href='/' onClick={(event) => clearSearch(event)} > <IoIosArrowDropleftCircle/> </a>
          </ToolTip>
        </div>
        </div>


      <div className={styles.search_results_wrap}>
            {Object.values(char).map(eachChar => (
              <>
              <div className={styles.search_results_each_card}>
                <a href='/' onClick={event => event.preventDefault()}>
                    <div className={isHidden} >
                  <li className={styles.search_results_each_detail} key={eachChar.id}>
                    <div className={styles.search_results_each_detail_text}>
                      <b> Name </b>
                        <p>{eachChar.character_name}</p>
                      <b>Label</b>
                        <p>{eachChar.character_label}</p>
                    </div>
                  </li>
                  </div>
                <img className={styles.search_results_each_img} src={eachChar.avatar} alt={eachChar.character_name} />
                </a>


              <ToolTip content={"Delete"} >
                <a href='/' onClick={(event) => handleDelete(event, {
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

                  })}> <RiDeleteBinFill /> </a>
                </ToolTip>

                <ToolTip content={"Update"} >
                <a href='/' onClick={(event) => handleUpdate(event, {
                  charId: eachChar.id,
                  avatar: eachChar.avatar,
                  character_label: eachChar.character_label,
                  character_name: eachChar.character_name,
                  created_at: eachChar.created_at,
                  pub_date: eachChar.pub_date,
                  user_id: eachChar.user_id,
                  username: eachChar.username,
                  search_id: eachChar.search_id,

                })}> <GrUpdate /> </a>
                  </ToolTip>

              </div>
              </>
            ))}
      </div>

      </>
    )
  }







  return (
    <>
    <div className={styles.search_wrapper}>
      <div>
        {backenderrors !== null ?
        <>
          { backenderrors.map(each => ( <li> {each} </li>))}
          <div>
            <a href='/' onClick={(event) => clearErrors(event)}> Try Again </a>
          </div>
        </>
        :
        <></>
        }
      </div>



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
