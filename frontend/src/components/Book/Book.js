import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";





const Book = ({ bookId, title, creatorId, creationDate }) => {
  const dispatch = useDispatch();



  return (
    <>
    <div>
        <NavLink to={`/books/${bookId}`} exact>
          <h3> {title} </h3>
        </NavLink>
    </div>
    </>
  )
};





export default Book;
