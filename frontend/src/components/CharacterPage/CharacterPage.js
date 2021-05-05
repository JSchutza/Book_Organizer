
import React from 'react';
import { useSelector } from "react-redux"


const CharacterPage = () => {
  const allChars = useSelector((store) => store.characterPageReducer.characters)

  if(allChars === null) {
    return (
      <>
      <h1>Loading characters .... </h1>
      </>
    )
  }

  return (
    <>
    <div>
      <h1> Characters </h1>
    </div>
    </>

  )
}



export default CharacterPage;
