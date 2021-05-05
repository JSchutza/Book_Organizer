
import React from 'react';
import { useSelector } from "react-redux"


const CharacterPage = () => {
  const allChars = useSelector((store) => store.characterPageReducer.characters)

  if(allChars === null) {
    return (
      <>
      </>
    )
  }

  return (
    <>

    </>

  )
}



export default CharacterPage;
