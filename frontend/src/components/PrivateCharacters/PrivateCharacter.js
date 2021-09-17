import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import ToolTip from "../ToolTip";
import { useHistory } from "react-router-dom";

import { resetErrors } from "../../store/actions/errors.js";
import { thunk_getAllPriChars } from "../../store/thunks/books.js";
import styles from "./privatecharacter.module.css";



const PrivateCharacter = ({ bookId }) => {
  const [backenderrors, setBackenderrors] = useState(null);
  const dispatch = useDispatch();
  const charInfo = useSelector((store) => store.priCharReducer.private_characters);
  const errors = useSelector((store) => store.errorsReducer.errors);
  const history = useHistory();



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


  const handleDelete = (event, payload) => {
    event.preventDefault();
    dispatch(contentModal("DeletePriChar"));
    dispatch(dataModal(payload));
    dispatch(showModal());
    history.push("/dropdown");
  }




  const handleUpdate = (event, payload) => {
    event.preventDefault();
    dispatch(contentModal("UpdatePriChar"));
    dispatch(dataModal(payload));
    dispatch(showModal());
    history.push("/dropdown");
  }



  const clearErrors = (event) => {
    event.preventDefault();
    dispatch(resetErrors());
    setBackenderrors(null);
  }



  if (charInfo === undefined) {
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
            <a href='/' onClick={event => handleDelete(event, {
              charId: eachChar.id,
              avatar: eachChar.avatar,
              character_name: eachChar.character_name,
              character_label: eachChar.character_label,
              book_id: bookId,
              lastpage: `/books/${bookId}`
            })}> <RiDeleteBinFill /> </a>
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
