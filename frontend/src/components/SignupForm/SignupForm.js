import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";


import { signUp } from "../../store/thunks/session.js";
import { setErrors } from "../../store/actions/errors.js";


import styles from "./signupform.module.css"
import ToolTip from "../ToolTip";
import Errors from "../Errors";


import { IoIosPower } from "react-icons/io";




const SignUpForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ repeatPassword, setRepeatPassword ] = useState("");


  const onSignUp = async event => {
    event.preventDefault();
    if (password === repeatPassword) {
      const result = await dispatch(signUp(username, email, password));
      if (result) {
        closeModal();
        history.push("/profile");
      }
      return;
    }
    // if the passwords do not match
    dispatch(setErrors(["Your passwords do not match please try again."]));
  };







  return (
    <>
    <Errors />

    <div className={styles.signup_containter}>

      <form className={styles.the_form} onSubmit={onSignUp}>

        <div className="">
          <label>User Name</label>
          <br />
          <input
            className=""
            type="text"
            name="username"
            onChange={event => setUsername(event.target.value)}
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
            onChange={event => setEmail(event.target.value)}
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
            onChange={event => setPassword(event.target.value)}
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
            onChange={event => setRepeatPassword(event.target.value)}
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
    </>
  );
};



export default SignUpForm;
