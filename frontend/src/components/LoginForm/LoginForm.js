import { useHistory, NavLink } from "react-router-dom";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/thunks/session.js';
import ToolTip from "../ToolTip";
import Errors from "../Errors";

import styles from "./loginform.module.css"

import { IoIosPower } from "react-icons/io";





const LoginForm = ({ closeModal }) => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();






  const onSubmit = async event => {
    event.preventDefault();
    const result = await dispatch(login(email, password));

    if(result) {
      closeModal();
      history.push("/profile");
    }
  }




  const handleDemo = event => {
    event.preventDefault();
    dispatch(login("demo@aa.io", "password"));
    closeModal();
    history.push("/profile");
  }




  return(
    <>
      <Errors />

  <div className={styles.login_wrap}>

    <div className={styles.login_containter}>
      <form className={styles.the_form} onSubmit={onSubmit}>
        <label> Email </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          />
        <br />
        <label> Password </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}

        />

        <div className={styles.enter_button}>
          <div>
          <ToolTip content={"Enter"}>
            <button> <IoIosPower/> </button>
          </ToolTip>
          </div>
        </div>

      </form>

      <div className={styles.demo_button}>
        <ToolTip content={"Demo"}>
          <NavLink to='/' onClick={event => handleDemo(event)}> Demo </NavLink>
        </ToolTip>
      </div>

    </div>
  </div>
    </>
  )
};


export default LoginForm;
