import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";


import { thunk_searchForUsersPubChars } from "../../store/thunks/characters.js";


import { useUser } from "../../context/UserContext.js";
import { useModalStyle } from "../../context/ReactModalStylesContext.js";


import ToolTip from "../ToolTip";
import Errors from "../Errors";
import ReactModal from 'react-modal';
import { BsSearch } from "react-icons/bs";


import styles from "./charactersearch.module.css";





const CharacterSearch = () => {
  const { isUser } = useUser();
  const [ errorModal, setOpenErrorModal ] = useState(false);
  const [ searchId, setSearchId ] = useState(isUser.search_id);
  const dispatch = useDispatch();
  const history = useHistory();
  const { smallFormStyle } = useModalStyle();





  const closeErrorModal = () => {
    setOpenErrorModal(false);
  };




  const handleSearch = async event => {
    event.preventDefault();
    const result = await dispatch(thunk_searchForUsersPubChars(searchId));

    if (result) {
      history.push(`/characters/${searchId}`);
    } else {
      setOpenErrorModal(true);
    }

  }







  return (
    <>
      <ReactModal
        isOpen={errorModal}
        onRequestClose={closeErrorModal}
        style={smallFormStyle}
        appElement={document.getElementById('root')}
      >
        <Errors />

      </ReactModal>


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
  );
};




export default CharacterSearch;
