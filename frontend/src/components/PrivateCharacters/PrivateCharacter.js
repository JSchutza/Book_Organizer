import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import ToolTip from "../ToolTip";
import ReactModal from 'react-modal';


import { resetErrors } from "../../store/actions/errors.js";
import { thunk_getAllPriChars, thunk_deleteUsersPrivateChars } from "../../store/thunks/books.js";

import { useModalStyle } from "../../context/ReactModalStylesContext.js";


import styles from "./privatecharacter.module.css";



const PrivateCharacter = ({ bookId }) => {
  const [backenderrors, setBackenderrors] = useState(null);
  const [ openModal, setOpenModal ] = useState(false);
  const dispatch = useDispatch();
  const charInfo = useSelector((store) => store.priCharReducer.characters);
  const errors = useSelector((store) => store.errorsReducer.errors);
  const history = useHistory();
  const { currentStyle } = useModalStyle();


  useEffect(() => {
    if (errors !== null) {
      setBackenderrors(Object.values(errors));
    } else if (errors === null) {
      setBackenderrors(null);
    }
  }, [errors]);



  useEffect(() => {
    dispatch(thunk_getAllPriChars(bookId));
  }, [dispatch, bookId]);





  const handleDelete = (event, charId) => {
    event.preventDefault();
    dispatch(thunk_deleteUsersPrivateChars(bookId, charId))
  }




  const handleUpdate = (event, payload) => {
    event.preventDefault();
    setOpenModal(true);
  }



  const clearErrors = (event) => {
    event.preventDefault();
    dispatch(resetErrors());
    setBackenderrors(null);
  }



  const closeModal = () => {
    setOpenModal(false);
  }





  if (!charInfo) {
    return (
      <>
        <h1>Loading Character information...</h1>
      </>
    )
  }



  return (
    <>

      <div className={''}>
        <div>
          {backenderrors !== null ?
            <>
              {backenderrors.map(each => (<li> {each} </li>))}
              <div>
                <a href='/' onClick={(event) => clearErrors(event)}> Try Again </a>
              </div>
            </>
            :
            <></>
          }
        </div>
        </div>


      <ReactModal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={currentStyle}
        appElement={document.getElementById('root')}
      >
        {/* <CreateCharacterForm closeModal={closeModal} /> */}

      </ReactModal>




      <h1>Your Characters</h1>

    <div className={styles.each_char_container}>
        {Object.values(charInfo).map(eachChar => (
            <>
              <a href='/' onClick={event => event.preventDefault()}>
                <li key={eachChar.id}>

                  <br />
                  {eachChar.character_name}
                  <br />
                  {eachChar.character_label}
                </li>
                <img src={eachChar.avatar} alt={eachChar.character_name} />
              </a>


          <div className={styles.each_char_button_wrap}>
          <div className={styles.each_char_delete_button}>
          <ToolTip content={"Delete"}>
            <a href='/' onClick={event => handleDelete(event, eachChar.id)}> <RiDeleteBinFill /> </a>
          </ToolTip>
          </div>



            <div className={styles.each_char_update_button}>
            <ToolTip content={"Update"}>
            <a href='/' onClick={event => handleUpdate(event, {
              charId: eachChar.id,
              avatar: eachChar.avatar,
              character_name: eachChar.character_name,
              character_label: eachChar.character_label,
              book_id: bookId,
              lastpage: `/books/${bookId}`
            })}> <GrUpdate /> </a>
            </ToolTip>
            </div>
            </div>

            </>
          ))
        }

    </div>

    </>
  )
};




export default PrivateCharacter;
