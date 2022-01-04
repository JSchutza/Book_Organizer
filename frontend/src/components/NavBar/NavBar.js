import { useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux"

import { FiLogIn } from 'react-icons/fi'
import { ImUserPlus } from "react-icons/im";
import { GiBookshelf, GiCardDraw } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BsQuestionSquareFill } from "react-icons/bs";
import { VscChecklist } from "react-icons/vsc";


import { useUser } from "../../context/UserContext";
import { clearSetters } from "../../store/actions/global.js";

import LogoutButton from "../LogoutButton"
import ToolTip from "../ToolTip";

import styles from "./navbar.module.css";


const NavBar = ({ setOpenModal, setLogin, setSignup }) => {
  const globalFunc = useSelector(store => store.globalReducer.setters);
  const { isUser } = useUser();
  const history = useHistory();
  const dispatch = useDispatch();
  const [ opennav, setOpenNav ] = useState(false);


  const handleOpenMenu = event => {
    event.preventDefault();
    setOpenNav(!opennav);
  }



  const handleLogin = event => {
    event.preventDefault();
    setLogin(true);
    setOpenModal(true);
  }



  const handleSignup = event => {
    event.preventDefault();
    setSignup(true);
    setOpenModal(true);
  }



  const handleCharacterPage = event => {
    event.preventDefault();
    if(!globalFunc) {
      history.push('/characters');
      return;
    } else {
      globalFunc.setterFunc(false);
    }
  };



  const handleClick = (event, route) => {
    event.preventDefault();
    dispatch(clearSetters());
    history.push(`/${route}`);
  };




  // if the user IS logged in

  if (isUser) {
  return (
    <>
    <div className={styles.hamburger_icon} >
      <NavLink to='/' onClick={handleOpenMenu} > <VscChecklist />  </NavLink>
    </div>

    {opennav ?
    <div className={styles.navbar_container} >
      <nav className={styles.nav}>
        <div onClick={event => handleCharacterPage(event)} >
            <li> <NavLink to="/" onClick={event => handleCharacterPage(event)}> <GiCardDraw/> Characters </NavLink></li>
        </div>

        <div onClick={event => handleClick(event, 'profile')}>
            <li> <NavLink to="/" onClick={event => handleClick(event, 'profile')} > <CgProfile/> Profile </NavLink></li>
        </div>

        <div onClick={event => handleClick(event, 'books')}>
            <li> <NavLink to="/" onClick={event => handleClick(event, 'books')} > <GiBookshelf/> Books </NavLink></li>
        </div>

        <div onClick={event => handleClick(event, 'polls')}>
            <li> <NavLink to='/' onClick={event => handleClick(event, 'polls')} > <BsQuestionSquareFill/> Polls </NavLink> </li>
        </div>

        <div>
            <li> <LogoutButton /> </li>
        </div>
      </nav>
    </div>
    : null }

    </>
  );

  }



// if the user is NOT logged in
  return (
    <nav className={styles.nav_notloggedin}>
      <div className={styles.login} onClick={event => handleLogin(event)}>
        <ToolTip content={'Login'} >
          <li> <NavLink to='/login' onClick={event => handleLogin(event)}> <FiLogIn /> </NavLink> </li>
        </ToolTip>
      </div>

        <div className={styles.signup} onClick={event => handleSignup(event)} >
          <ToolTip content={'Signup'} >
            <li> <NavLink to='/signup' onClick={event => handleSignup(event)}> <ImUserPlus /> </NavLink> </li>
          </ToolTip>
        </div>
    </nav>
  );


};





export default NavBar;
