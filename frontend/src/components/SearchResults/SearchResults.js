
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";


import { IoIosArrowDropleftCircle } from "react-icons/io";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";


import ToolTip from "../ToolTip";





const SearchResults = () => {
  const searchedChar = useSelector(store => store.searchCharacterPageReducer.characters);
  const char = useSelector(store => store.searchCharacterPageReducer);


  const handleDelete = (event, payload) => {
    event.preventDefault();
    history.push("/dropdown");
  }


  const handleUpdate = (event, payload) => {
    event.preventDefault();
    history.push("/dropdown");
  }




  if (searchedChar !== null && char) {

    return (
      <>
        <div className={styles.search_title_backbutton}>
          <h2>Search Results</h2>
          <div className={styles.search_back_button}>
            <ToolTip content={"Back"} >
              <a href='/' onClick={(event) => clearSearch(event)} > <IoIosArrowDropleftCircle /> </a>
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
};



export default SearchResults;
