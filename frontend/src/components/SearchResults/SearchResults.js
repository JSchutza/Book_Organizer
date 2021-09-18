
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink, useParams } from "react-router-dom";


import { thunk_searchForUsersPubChars } from "../../store/thunks/characters.js";
import { thunk_deleteUsersPubChars } from "../../store/thunks/characters.js";

import { useUser } from '../../context/UserContext';


import { IoIosArrowDropleftCircle } from "react-icons/io";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";


import ToolTip from "../ToolTip";

import styles from "./searchresults.module.css";






const SearchResults = () => {
  const searchedChar = useSelector(store => store.searchCharacterPageReducer.characters);
  const char = useSelector(store => store.searchCharacterPageReducer);
  const { searchId } = useParams();
  const { isUser } = useUser();
  const dispatch = useDispatch();
  const history = useHistory();



  useEffect(() => {
    dispatch(thunk_searchForUsersPubChars(searchId));
  },[dispatch]);




  const handleDelete = (event, { charId }) => {
    event.preventDefault();
    dispatch(thunk_deleteUsersPubChars(charId));
  }


  const handleUpdate = (event, payload) => {
    event.preventDefault();

  }


  const clearSearch = event => {
    event.preventDefault();
    // clear search results?
    // dispatch();
    history.push('/characters');
  }



  if (searchedChar !== null && char) {

    return (
      <>
        <div className={styles.search_title_backbutton}>
          <h2>Search Results</h2>
          <div className={styles.search_back_button}>
            <ToolTip content={"Back"} >
              <a href='/' onClick={event => clearSearch(event)} > <IoIosArrowDropleftCircle /> </a>
            </ToolTip>
          </div>
        </div>


        <div className={styles.search_results_wrap}>
          {Object.values(char).map(eachChar => (
            <>
              <div className={styles.search_results_each_card}>
                <NavLink to='/' onClick={event => clearSearch(event)} >

                  <li className={styles.search_results_each_detail} key={eachChar.id}>
                    <div className={styles.search_results_each_detail_text}>
                      <b> Name </b>
                      <p>{eachChar.character_name}</p>
                      <b>Label</b>
                      <p>{eachChar.character_label}</p>
                    </div>
                  </li>

                  <img className={styles.search_results_each_img} src={eachChar.avatar} alt={eachChar.character_name} />
                </NavLink>

                {searchId === isUser.search_id ?
                  <div className={styles.each_result_button_wrap}>
                    <div className={styles.each_result_delete_button}>
                      <ToolTip content={"Delete"} >
                        <a href='/' onClick={event => handleDelete(event, { charId: eachChar.id })}> <RiDeleteBinFill /> </a>
                      </ToolTip>
                    </div>



                    <div className={styles.each_result_update_button}>
                      <ToolTip content={"Update"} >
                        <a href='/' onClick={event => handleUpdate(event, {
                          charId: eachChar.id,
                          avatar: eachChar.avatar,
                          character_label: eachChar.character_label,
                          character_name: eachChar.character_name,
                          created_at: eachChar.created_at,
                          pub_date: eachChar.pub_date,
                          user_id: eachChar.user_id,
                          username: eachChar.username,
                          search_id: eachChar.search_id
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

          {/* {searchId === isUser.search_id ?
            <></>
            :
            <div>
              <NavLink to={`/user/${searchId}`} exact >
                Profile
              </NavLink>
            </div>
          } */}
        </div>
      </>
    )
  }



  return (
    <>
      <h1>Loading search results ...</h1>
    </>
  );

};



export default SearchResults;
