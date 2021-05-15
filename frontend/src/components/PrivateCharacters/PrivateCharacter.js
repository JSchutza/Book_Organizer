import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import Tooltip from "../ToolTip";
import { showModal, contentModal, dataModal } from "../../store/actions/modal.js";
import { resetErrors } from "../../store/actions/errors.js";
import { thunk_getAllPriChars } from "../../store/thunks/books.js";




const PrivateCharacter = ({ bookId }) => {
  const [backenderrors, setBackenderrors] = useState(null);
  const dispatch = useDispatch();
  const charInfo = useSelector((store) => store.priCharReducer.private_characters)
  const rend = useSelector((store) => store.triggerRenderReducer.trigger);
  const errors = useSelector((store) => store.errorsReducer.errors);




  useEffect(() => {
    if (errors !== null) {
      setBackenderrors(Object.values(errors));
    } else if (errors === null) {
      setBackenderrors(null);
    }
  }, [errors]);



  useEffect(() => {
    dispatch(thunk_getAllPriChars(bookId));
  }, [dispatch, rend, bookId]);


  const handleDelete = (event, payload) => {
    event.preventDefault();
    dispatch(contentModal("DeletePriChar"));
    dispatch(dataModal(payload));
    dispatch(showModal());
  }




  const handleUpdate = (event, payload) => {
    event.preventDefault();
    dispatch(contentModal("UpdatePriChar"));
    dispatch(dataModal(payload));
    dispatch(showModal());
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



    <div>
      <h1>Your Characters</h1>
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



          <Tooltip content={"Delete"}>
            <a href='/' onClick={event => handleDelete(event, {
              charId: eachChar.id,
              avatar: eachChar.avatar,
              character_name: eachChar.character_name,
              character_label: eachChar.character_label,
              book_id: bookId
            })}> <RiDeleteBinFill /> </a>
          </Tooltip>



            <Tooltip content={"Update"}>
            <a href='/' onClick={event => handleUpdate(event, {
              charId: eachChar.id,
              avatar: eachChar.avatar,
              character_name: eachChar.character_name,
              character_label: eachChar.character_label,
              book_id: bookId
            })}> <GrUpdate /> </a>
            </Tooltip>

            </>
          ))
        }

    </div>

    </>
  )
};




export default PrivateCharacter;
