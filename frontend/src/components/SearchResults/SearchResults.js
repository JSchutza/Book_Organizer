
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink, useParams } from "react-router-dom";


import { thunk_searchForUsersPubChars } from "../../store/thunks/characters.js";
import { thunk_deleteUsersPubChars } from "../../store/thunks/characters.js";

import { useUser } from '../../context/UserContext';
import { useModalStyle } from "../../context/ReactModalStylesContext.js";

import { IoIosArrowDropleftCircle } from "react-icons/io";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";


import ReactModal from 'react-modal';


import ToolTip from "../ToolTip";
import UpdatePubCharForm from "../UpdatePubCharForm";
import LoadScreen from "../LoadScreen";


import styles from "./searchresults.module.css";





const SearchResults = () => {
  const [updatePayload, setUpdatePayload] = useState(null);
  const [openUpdateModal, setUpdateModal] = useState(false);

  const chars = useSelector(store => store.searchCharacterPageReducer.characters);
  const { searchId } = useParams();
  const { isUser } = useUser();
  const { characterFormStyle } = useModalStyle();
  const dispatch = useDispatch();
  const history = useHistory();



  useEffect(() => {
    dispatch(thunk_searchForUsersPubChars(searchId));
  },[dispatch]);




  const handleDelete = (event, { charId }) => {
    event.preventDefault();
    dispatch(thunk_deleteUsersPubChars(charId, true));
  }




  const handleUpdate = (event, payload) => {
    event.preventDefault();
    setUpdatePayload(payload);
    setUpdateModal(true);
  }




  const closeUpdateModal = () => {
    setUpdateModal(false);
    history.push('/characters');
  }



  const clearSearch = event => {
    event.preventDefault();
    // clear search results?
    // dispatch();
    history.push('/characters');
  }



  // if there are no chars in the search results on refresh
  if (!chars) return (<LoadScreen />);



  return (
    <>
      <div className={styles.search_title_backbutton}>
        <h2>Search Results</h2>
        <div className={styles.search_back_button}>
          <ToolTip content={"Back"} >
            <NavLink to='/' onClick={event => clearSearch(event)} > <IoIosArrowDropleftCircle /> </NavLink>
          </ToolTip>
        </div>
      </div>

      {/* update char modal */}
      <ReactModal
        isOpen={openUpdateModal}
        onRequestClose={closeUpdateModal}
        style={characterFormStyle}
        appElement={document.getElementById('root')}
      >

        <UpdatePubCharForm
          closeUpdateModal={closeUpdateModal}
          payload={updatePayload}
        />
      </ReactModal>


      {/* if the charSearch data is empty */}
      {Object.values(chars).length === 0 ?
        <h1>You currently do not have any characters!</h1>
        :
        null
      }


      <div className={styles.search_results_wrap}>
        {Object.values(chars).map(eachChar => (
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
                      <NavLink to='/' onClick={event => handleDelete(event, { charId: eachChar.id })}> <RiDeleteBinFill /> </NavLink>
                    </ToolTip>
                  </div>



                  <div className={styles.each_result_update_button}>
                    <ToolTip content={"Update"} >
                      <NavLink to='/' onClick={event => handleUpdate(event, {
                        charId: eachChar.id,
                        avatar: eachChar.avatar,
                        character_label: eachChar.character_label,
                        character_name: eachChar.character_name,
                        created_at: eachChar.created_at,
                        pub_date: eachChar.pub_date,
                        user_id: eachChar.user_id,
                        username: eachChar.username,
                        search_id: eachChar.search_id
                      })}> <GrUpdate /> </NavLink>
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
          <div>
            <NavLink to='/profile' exact >
              Profile
            </NavLink>
          </div>
          :
          <div>
            <NavLink to={`/user/${searchId}`} exact >
              Profile
            </NavLink>
          </div>
        }
      </div>
    </>
  );

};



export default SearchResults;
