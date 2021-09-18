import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";


import { thunk_searchForUsersPubChars } from "../../store/thunks/characters.js";


import { useUser } from "../../context/UserContext.js";

import ToolTip from "../ToolTip";

import styles from "./charactersearch.module.css";

import { IoIosArrowDropleftCircle } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";






const CharacterSearch = () => {
  const { isUser } = useUser();
  const [ searchId, setSearchId ] = useState(isUser.search_id);

  const dispatch = useDispatch();
  const searchedChar = useSelector(store => store.searchCharacterPageReducer.characters);
  const char = useSelector(store => store.searchCharacterPageReducer);

  const history = useHistory();








  const handleSearch = event => {
    event.preventDefault();
    dispatch(thunk_searchForUsersPubChars(searchId));
  }



  const clearSearch = event => {
    event.preventDefault();
  }


  const handleDelete = (event, payload) => {
    event.preventDefault();
    history.push("/dropdown");
  }


  const handleUpdate = (event, payload) => {
    event.preventDefault();
    history.push("/dropdown");
  }


  const clearErrors = event => {
    event.preventDefault();
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

              {searchId === isUser.search_id ?
              <div className={styles.each_result_button_wrap}>
              <div className={styles.each_result_delete_button}>
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

                  lastpage: "/characters"

                })}> <RiDeleteBinFill /> </a>
                </ToolTip>
                </div>



                <div className={styles.each_result_update_button}>
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
                  lastpage: "/characters"


                })}> <GrUpdate /> </a>
                  </ToolTip>
                </div>
                </div>

                :
                <></>
              }
              </div>
              </>
            ))}

          {searchId === isUser.search_id ?
            <></>
          :
            <div>
              <NavLink to={`/user/${searchId}`} exact >
                Profile
              </NavLink>
            </div>
          }


      </div>

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
