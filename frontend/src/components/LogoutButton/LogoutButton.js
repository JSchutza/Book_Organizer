import React from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../../store/thunks/session.js";
import { useHistory, NavLink } from "react-router-dom"
import {FiLogOut} from 'react-icons/fi'





const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();



  const onLogout = async event => {
    event.preventDefault();
    const result = await dispatch(logout());
    if (result) {
      history.push("/");
    }

  };



  return ( <NavLink to='/' onClick={(event) => onLogout(event)}> <FiLogOut /> Logout </NavLink> );
};

export default LogoutButton;
