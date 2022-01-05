import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";


import { thunk_searchForUsersPubChars } from "../../store/thunks/characters.js";
import { resetErrors } from '../../store/actions/errors.js';

import { useUser } from "../../context/UserContext.js";
import { useModalStyle } from "../../context/ReactModalStylesContext.js";


import Errors from "../Errors";
import ReactModal from 'react-modal';


import styles from "./charactersearch.module.css";





const CharacterSearch = () => {
  const { isUser } = useUser();
  const [ errorModal, setOpenErrorModal ] = useState(false);
  const [ searchId, setSearchId ] = useState(isUser.search_id);
  const dispatch = useDispatch();
  const history = useHistory();
  const { smallFormStyle } = useModalStyle();





  const closeErrorModal = () => {
    dispatch(resetErrors());
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
      <form onSubmit={handleSearch} >
        <div className={styles.search_input}>
          <input
            type="text"
            name="search"
            value={searchId}
            onChange={(event) => setSearchId(event.target.value)}
            />
        </div>


        <button> Search </button>
      </form>
    </div>
    </>
  );
};




export default CharacterSearch;
