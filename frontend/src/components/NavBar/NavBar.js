import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import LogoutButton from "../LogoutButton"
import styles from "./navbar.module.css";
import { useDispatch } from "react-redux"
import { thunk_getAllCharacters } from "../../store/thunks/characters.js"
import { FiLogIn } from 'react-icons/fi'
import { ImUserPlus } from "react-icons/im";
import { GiBookshelf, GiCardDraw } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import ToolTip from "../ToolTip";
import Modal from "../Modal";
import { showModal, contentModal } from "../../store/actions/modal.js";



const NavBar = ({ userStatus, setHideLoader }) => {
  const dispatch = useDispatch();


  const showLoginForm = (event) => {
    event.preventDefault();
    dispatch(contentModal("login"));
    dispatch(showModal());
  }

  const showSignupForm = (event) => {
    event.preventDefault();
    dispatch(contentModal("signin"))
    dispatch(showModal());
  }



  const handleCharacterClick = () => {
    dispatch(thunk_getAllCharacters());
  }






  if (userStatus === false){
    return (
      <>
      <div>
        <nav className={styles.nav}>

            <ToolTip content={'Login'} >
              <li> <a href='/' onClick={(event) => showLoginForm(event)} > <FiLogIn /> </a> </li>
            </ToolTip>



            <ToolTip content={'Signup'} >
              <li> <a href='/' onClick={(event) => showSignupForm(event)}> <ImUserPlus /> </a> </li>
            </ToolTip>

        </nav>
      </div>

      <Modal />

    </>
    );
  }





  return (
    <>
    <div>
      <nav className={styles.nav}>
          <ToolTip content={'Characters'} >
          <li> <NavLink to="/characters" exact onClick={() => handleCharacterClick()} > <GiCardDraw/> </NavLink></li>
          </ToolTip>

          <ToolTip content={'Profile'} >
          <li> <NavLink to="/profile" exact> <CgProfile/> </NavLink></li>
          </ToolTip>

          <ToolTip content={'Books'} >
          <li> <NavLink to="/books" exact> <GiBookshelf/> </NavLink></li>
          </ToolTip>

          <ToolTip content={'Logout'} >
          <li> <LogoutButton /> </li>
          </ToolTip>

      </nav>
    </div>
    </>
  );


};





export default NavBar;
