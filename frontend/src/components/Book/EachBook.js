import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import PrivateCharacter from "../PrivateCharacters";



const EachBook = () => {
  const { bookId } = useParams();


  return (
    <>
    <div>
        <PrivateCharacter />
    </div>
    </>
  )
};

export default EachBook;
