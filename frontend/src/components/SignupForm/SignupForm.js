import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/thunks/session.js";


import styles from "./signupform.module.css"
import ToolTip from "../ToolTip";

import { IoIosPower } from "react-icons/io";




const SignUpForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");


  const onSignUp = (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(hideModal());
      dispatch(contentModal(null));
      dispatch(signUp(username, email, password));
    }
    // set password does not match error / state
  };






  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };




  return (
    <div className={styles.signup_containter}>

      <form className={styles.the_form} onSubmit={onSignUp}>

        <div className="">
          <label>User Name</label>
          <br />
          <input
            className=""
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>

        <div className="">
          <label>Email</label>
          <br />
          <input
            className=""
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>

        <div className="">
          <label>Password</label>
          <br />
          <input
            className=""
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>

        <div className="">
          <label>Repeat Password</label>
          <br />
          <input
            className=""
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>



        <div className={styles.enter_button}>
          <div>
          <ToolTip content={"Enter"}>
            <button className="" type="submit"> <IoIosPower /> </button>
          </ToolTip>
          </div>
        </div>

      </form>
    </div>
  );
};



export default SignUpForm;
