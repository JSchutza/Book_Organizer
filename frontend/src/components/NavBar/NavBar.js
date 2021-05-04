import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignupForm"
import styles from "./navbar.module.css";




const NavBar = ({ userStatus }) => {
  const [ toggleLogin, setToggleLogin ] = useState(false);
  const [ toggleSignup, setToggleSignup ] = useState(false);

  const [ clickLogin, setClickLogin ] = useState(0);
  const [ clickSignup, setClickSignup ] = useState(0);




  const showLoginForm = (event) => {
    event.preventDefault();
    if (clickLogin === 0){
      setToggleLogin(true);
      setClickLogin(1);
    } else if (clickLogin === 1){
      setToggleLogin(false);
      setClickLogin(0);
    }
  }

  const showSignupForm = (event) => {
    event.preventDefault();
    if (clickSignup === 0){
      setToggleSignup(true);
      setClickSignup(1);
    } else if (clickSignup === 1){
      setToggleSignup(false);
      setClickSignup(0);
    }
  }








  if (userStatus === false){
    return (
      <>
      <div>
        <nav className={styles.nav}>
            <li> <a onClick={(event) => showLoginForm(event)}> Log-in </a> </li>
            <li> <a onClick={(event) => showSignupForm(event)}> Sign-up </a> </li>
        </nav>
      </div>


        { toggleLogin ? <div>
          <LoginForm />
        </div>
        :
        <p></p>
        }


        { toggleSignup ? <div>
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
        <li> </li>
      </nav>
    </div>
    </>
  );


};





export default NavBar;
