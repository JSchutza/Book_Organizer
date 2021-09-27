import React from 'react';
import { NavLink } from 'react-router-dom';





const Book = ({ bookId, title }) => {
  return ( <NavLink to={`/books/${bookId}`} exact> <h3> {title} </h3> </NavLink> );
};





export default Book;
