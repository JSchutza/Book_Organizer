import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignupForm"
import LogoutButton from "../LogoutButton"
import styles from "./navbar.module.css";
import { useDispatch } from "react-redux"
import { thunk_getAllCharacters } from "../../store/thunks/characters.js"
import { FiLogIn } from 'react-icons/fi'
import { ImUserPlus } from "react-icons/im";
import { GiBookshelf, GiCardDraw } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";


const NavBar = ({ userStatus, setHideLoader }) => {
  const [ toggleLogin, setToggleLogin ] = useState(false);
  const [ toggleSignup, setToggleSignup ] = useState(false);

  const [ clickLogin, setClickLogin ] = useState(0);
  const [ clickSignup, setClickSignup ] = useState(0);
  const dispatch = useDispatch();



  const showLoginForm = (event) => {
    event.preventDefault();
    if (clickLogin === 0){
      setHideLoader(true);
      setToggleLogin(true);
      setClickLogin(1);
    } else if (clickLogin === 1){
      setHideLoader(false);
      setToggleLogin(false);
      setClickLogin(0);
    }
  }

  const showSignupForm = (event) => {
    event.preventDefault();
    if (clickSignup === 0){
      setHideLoader(true);
      setToggleSignup(true);
      setClickSignup(1);
    } else if (clickSignup === 1){
      setHideLoader(false);
      setToggleSignup(false);
      setClickSignup(0);
    }
  }



  const handleCharacterClick = () => {
    dispatch(thunk_getAllCharacters());
  }




  if (userStatus === false){
    return (
      <>
      <div>
        <nav className={styles.nav}>
            <li> <a href='/' onClick={(event) => showLoginForm(event)}> <FiLogIn /> </a> </li>
            <li> <a href='/' onClick={(event) => showSignupForm(event)}> <ImUserPlus /> </a> </li>
        </nav>
      </div>


        { toggleLogin ?
        <div className={styles.log_in_wrap}>
          <LoginForm />
        </div>
        :
        <p></p>
        }


        { toggleSignup ?
        <div className={styles.sign_in_wrap}>
          <SignUpForm />
        </div>
        :
        <p></p>
        }


    </>
    );
  }





  return (
    <>
    <div>
      <nav className={styles.nav}>
          <li> <NavLink to="/characters" exact onClick={() => handleCharacterClick()} > <GiCardDraw/> </NavLink></li>
          <li> <NavLink to="/profile" exact> <CgProfile/> </NavLink></li>
          <li> <NavLink to="/books" exact> <GiBookshelf/> </NavLink></li>
          <li> <LogoutButton /> </li>
      </nav>
    </div>
    </>
  );


};





export default NavBar;
