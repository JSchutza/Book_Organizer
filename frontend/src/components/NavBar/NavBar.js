import React from 'react';
import { NavLink } from "react-router-dom";
import LogoutButton from "../LogoutButton"
import styles from "./navbar.module.css";
import { useDispatch } from "react-redux"
import { thunk_getAllCharacters } from "../../store/thunks/characters.js"
import { FiLogIn } from 'react-icons/fi'
import { ImUserPlus } from "react-icons/im";
import { GiBookshelf, GiCardDraw } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BsQuestionSquareFill } from "react-icons/bs";
import ToolTip from "../ToolTip";
import { showModal, contentModal, hideModal } from "../../store/actions/modal.js";
import { hideLoader } from "../../store/actions/loader.js";
import { searchTriggered, clearSearchResults } from "../../store/actions/characters.js";
import { clearErrors } from "../../store/actions/session.js";


const NavBar = ({ userStatus }) => {
  const dispatch = useDispatch();


  const showLoginForm = (event) => {
    event.preventDefault();
    dispatch(clearErrors());
    dispatch(contentModal("login"));
    dispatch(showModal());
    dispatch(hideLoader());
  }

  const showSignupForm = (event) => {
    event.preventDefault();
    dispatch(clearErrors());
    dispatch(contentModal("signin"))
    dispatch(showModal());
    dispatch(hideLoader());
  }



  const handleCharacterClick = () => {
    dispatch(thunk_getAllCharacters());
    dispatch(hideModal());
    dispatch(contentModal(null));
    dispatch(clearSearchResults({ characters: null }));
    dispatch(searchTriggered({ search: null }));
  }



  const handleProfileClick = () => {
    dispatch(hideModal());
    dispatch(contentModal(null));
  }

  const handleBooksClick = () => {
    dispatch(hideModal());
    dispatch(contentModal(null));
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
            <li> <NavLink to="/profile" exact onClick={() => handleProfileClick()}> <CgProfile/> </NavLink></li>
          </ToolTip>


          <ToolTip content={'Books'} >
            <li> <NavLink to="/books" exact onClick={() => handleBooksClick()}> <GiBookshelf/> </NavLink></li>
          </ToolTip>


          <ToolTip content={'Polls'}>
            <li> <NavLink to='/polls' exact> <BsQuestionSquareFill/> </NavLink> </li>
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
