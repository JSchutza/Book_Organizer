import React from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../../store/thunks/session.js";
import { useHistory } from "react-router-dom"
import {FiLogOut} from 'react-icons/fi'
import { hideModal } from "../../store/actions/modal.js";
import { showLoader } from "../../store/actions/loader.js";




const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = (event) => {
    event.preventDefault();
    dispatch(hideModal());
    dispatch(showLoader());
    dispatch(logout());
    history.push("/")
  };



  return (
    <>
      <a href='/' onClick={(event) => onLogout(event)}><FiLogOut/></a>
    </>
  );
};

export default LogoutButton;
