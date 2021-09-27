import React from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../../store/thunks/session.js";
import { useHistory, NavLink } from "react-router-dom"
import {FiLogOut} from 'react-icons/fi'














const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();



  const onLogout = event => {
    event.preventDefault();
    dispatch(logout());
    history.push("/");
  };



  return ( <NavLink to='/' onClick={(event) => onLogout(event)}><FiLogOut /></NavLink> );
};

export default LogoutButton;
