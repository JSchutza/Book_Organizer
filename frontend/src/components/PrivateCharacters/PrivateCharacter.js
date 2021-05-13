import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinFill } from "react-icons/ri";
import Tooltip from "../ToolTip";
import { showModal, contentModal, dataModal } from "../../store/actions/modal.js";
import { thunk_getAllPriChars } from "../../store/thunks/books.js";




const PrivateCharacter = ({ bookId }) => {
  const dispatch = useDispatch();
  const charInfo = useSelector((store) => store.priCharReducer.private_characters)
  const rend = useSelector((store) => store.triggerRenderReducer.trigger);


  useEffect(() => {
    dispatch(thunk_getAllPriChars(bookId));
  }, [dispatch, rend]);


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





  if (charInfo === undefined) {
    return (
      <>
        <h1>Loading Character information...</h1>
      </>
    )
  }


  return (
    <>
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
            })}> Update </a>
            </Tooltip>

            </>
          ))
        }

    </div>

    </>
  )
};




export default PrivateCharacter;
