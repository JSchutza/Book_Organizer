import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/thunks/session.js';
import ToolTip from "../ToolTip";


import styles from "./loginform.module.css"

import { IoIosPower } from "react-icons/io";
import { hideModal, contentModal } from "../../store/actions/modal.js";




const LoginForm = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const dispatch = useDispatch();


  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(hideModal());
    dispatch(contentModal(null));
    dispatch(login(email, password));
  }


  const handleDemo = event => {
    event.preventDefault();
    dispatch(login("demo@aa.io", "password"));
  }



  return(
    <>
    <div className={styles.login_containter}>
      <form className={styles.the_form} onSubmit={onSubmit}>
        <label>
          Email
        <input
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}

        />
        </label>



        <div className={styles.enter_button}>
          <div>
          <ToolTip content={"Enter"}>
            <button> <IoIosPower/> </button>
          </ToolTip>
          </div>
        </div>

      </form>

      <div className={styles.demo_button}>
        <div className={styles.spacer}>
        <ToolTip content={"Demo"}>
          <a href='/' onClick={event => handleDemo(event)}> Demo </a>
        </ToolTip>
        </div>
      </div>

    </div>

    </>
  )
};


export default LoginForm;
