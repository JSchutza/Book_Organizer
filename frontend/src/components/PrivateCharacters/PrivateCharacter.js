import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinFill } from "react-icons/ri";
import Modal from "../Modal";
import { showModal, contentModal, dataModal } from "../../store/actions/modal.js";





const PrivateCharacter = () => {
  const dispatch = useDispatch();
  const charInfo = useSelector((store) => store.priCharReducer.private_characters)



  const handleDelete = (event, charId) => {
    event.preventDefault();
    dispatch(contentModal("DeletePriChar"));
    dispatch(dataModal(charId));
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


            <a href='/' onClick={event => handleDelete(event, eachChar.id)}> <RiDeleteBinFill /> </a>
            <Modal bookId={eachChar.book_id} />
            </>
          ))
        }
    </div>
    </>
  )
};




export default PrivateCharacter;
