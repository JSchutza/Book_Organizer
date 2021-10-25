import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { NavLink, Link } from "react-router-dom";

import { thunk_getAllCharacters } from "../../store/thunks/characters.js";
import { thunk_getFollowing } from "../../store/thunks/following.js";
import { thunk_deleteUsersPubChars } from "../../store/thunks/characters.js";
import { resetErrors } from '../../store/actions/errors.js';

import { useUser } from "../../context/UserContext.js";
import { useModalStyle } from "../../context/ReactModalStylesContext.js";

import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { BsFillPlusSquareFill } from "react-icons/bs";

import SpecificPubChar from "../SpecificPubChar";
import CharacterSearch from "../CharacterSearch";
import CreateCharacterForm from "../CreateCharacterForm";
import LoadScreen from "../LoadScreen";
import ToolTip from "../ToolTip";
import UpdatePubCharForm from "../UpdatePubCharForm";
import ReactModal from 'react-modal';




import styles from "./characterpage.module.css"






const CharacterPage = () => {
  const [ loading, setLoading ] = useState(true);
  const [ specificChar, setSpecificChar ] = useState(false);
  const [ char, setChar ] = useState(false);
  const [ openModal, setOpenModal ] = useState(false);

  const [ updatePayload, setUpdatePayload ] = useState(null);
  const [ openUpdateModal, setUpdateModal ] = useState(false);
  let endloading;

  const allChars = useSelector((store) => store.characterPageReducer.characters);
  const followingInfo = useSelector(store => store.followingReducer.following);

  const dispatch = useDispatch();
  const { isUser } = useUser();
  const { characterFormStyle } = useModalStyle();



  useEffect(() => {
    dispatch(thunk_getFollowing());
  }, [dispatch]);







  useEffect(() => {
    if (loading) {
      dispatch(thunk_getAllCharacters());

      endloading = setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    return () => {
      clearTimeout(endloading);
    }
  }, [dispatch]);







  const closeModal = () => {
    dispatch(resetErrors());
    setOpenModal(false);
  };



  const showSpecificChar = (event, charId) => {
    event.preventDefault();
    setChar(allChars[charId]);
    setSpecificChar(true);
  }




  const hideSpecificChar = (event) => {
    event.preventDefault();
    setChar(false);
    setSpecificChar(false);
  }





  const handleDelete = (event, { charId }) => {
    event.preventDefault();
    dispatch(thunk_deleteUsersPubChars(charId));
  };




  const handleUpdate = (event, payload) => {
    event.preventDefault();
    setUpdatePayload(payload);
    setUpdateModal(true);
  }


  const closeUpdateModal = () => {
    setUpdateModal(false);
  }





  const createCharactersClick = (event) => {
    event.preventDefault();
    setOpenModal(true);
  }









// loading screen if the character data is not available
  if (!allChars || loading) return ( <LoadScreen /> );







// displays if a specific character is clicked on
  if(specificChar){
    

    return (
        <SpecificPubChar
          theChar={char}
          followingInfo={followingInfo}
          hideSpecificChar={hideSpecificChar}
          setSpecificChar={setSpecificChar}
        />
      )
  }





// displays all of the characters
  return (
    <>
      <CharacterSearch />

    <div className={styles.create_button}>
      <ToolTip content='Create'>
        <Link href='/' onClick={(event) => createCharactersClick(event)}> <BsFillPlusSquareFill /> </Link>
      </ToolTip>
    </div>


      <ReactModal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={characterFormStyle}
        appElement={document.getElementById('root')}
      >
        <CreateCharacterForm closeModal={closeModal} />

      </ReactModal>



    <div className={styles.characters_header}>
      <h1> Characters </h1>
    </div>


    <div className={styles.page_wrapper}>
    {Object.values(allChars).reverse().map(eachChar => (
      <>
      <div className={styles.each_card}>
        <NavLink to='/' onClick={(event) => showSpecificChar(event, eachChar.id) }>

        <li className={styles.each_detail} key={eachChar.id}>
          <div className={styles.each_detail_text}>
          <b> {eachChar.username} </b>
            <p> {eachChar.character_name} </p>
            <p> {eachChar.character_label} </p>
          </div>
        </li>

          <img className={styles.each_img} src={eachChar.avatar} alt={eachChar.character_name} />
        </NavLink>
      </div>


        {eachChar.user_id === isUser.id ?
          <div className={styles.users_character_button_wrap}>
            <div className={styles.each_button}>
              <ToolTip content={'Update'} >
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

            <div className={styles.each_button}>
              <ToolTip content={'Delete'} >
                <NavLink to='/' onClick={event => handleDelete(event, { charId: eachChar.id })} > <RiDeleteBinFill /> </NavLink>
              </ToolTip>
            </div>
          </div>
        :
        <></>
        }
      </>
      ))}



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
    </div>

    </>
  )





}



export default CharacterPage;
