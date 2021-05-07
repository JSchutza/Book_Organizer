import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";



const PrivateCharacter = () => {
  const dispatch = useDispatch();
  const charInfo = useSelector((store) => store.priCharReducer.private_characters)
  const [specificChar, setSpecificChar] = useState(false);
  const [charId, setCharId] = useState(false);



  const showSpecificChar = (event, the_char_id) => {
    event.preventDefault();
    setCharId(the_char_id);
    setSpecificChar(true);
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
              <a href='/' onClick={(event) => showSpecificChar(event, eachChar.id)}>
                <li key={eachChar.id}>

                  <br />
                  {eachChar.character_name}
                  <br />
                  {eachChar.character_label}
                </li>
                <img src={eachChar.avatar} alt={eachChar.character_name} />
              </a>
            </>
          ))
        }
    </div>
    </>
  )
};




export default PrivateCharacter;