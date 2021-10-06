import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";


import { thunk_searchForUsersPubChars } from "../../store/thunks/characters.js";


import { useUser } from "../../context/UserContext.js";

import ToolTip from "../ToolTip";
import Errors from "../Errors";

import styles from "./charactersearch.module.css";


import { BsSearch } from "react-icons/bs";







const CharacterSearch = () => {
  const { isUser } = useUser();
  const [ searchId, setSearchId ] = useState(isUser.search_id);
  const dispatch = useDispatch();
  const history = useHistory();




  const handleSearch = async event => {
    event.preventDefault();
    const result = await dispatch(thunk_searchForUsersPubChars(searchId));

    if (result) {
      history.push(`/characters/${searchId}`);
    }
  }



  const clearSearch = event => {
    event.preventDefault();
  }



  const clearErrors = event => {
    event.preventDefault();
    setSearchId("");
  }






  return (
    <>
      <Errors />
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
            <NavLink to='/' onClick={(event) => handleSearch(event)} > <BsSearch /> </NavLink>
          </ToolTip>
      </div>
    </div>
    </>
  )
};




export default CharacterSearch;
