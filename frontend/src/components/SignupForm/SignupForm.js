import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { processFile } from "../../services/protectedFileUpload.js";
import { signUp } from "../../store/thunks/session.js";
import { setErrors } from "../../store/actions/errors.js";


import styles from "./signupform.module.css"
import ToolTip from "../ToolTip";
import Errors from "../Errors";
import SuccessMessage from "../SuccessMessage";



import { IoIosPower } from "react-icons/io";




const SignUpForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ repeatPassword, setRepeatPassword ] = useState("");
  const [ image, setImage ] = useState('');
  const [ loading, setLoading ] = useState(false);









  const onSignUp = async event => {
    event.preventDefault();
    if (password === repeatPassword) {
      setLoading(true);
      const payload = { username, email, password, image };
      const result = await dispatch(signUp(payload));
      if (result) {
        closeModal();
        history.push("/profile");
      }
      setLoading(false);
      return;
    }
    // if the passwords do not match
    dispatch(setErrors(["Your passwords do not match please try again."]));
  };





  const updateAvatar = event => {
    const result = processFile(event.target.files);
    if (result) {
      setImage(result);
    }
  };





  if (loading) return (<SuccessMessage />);



  return (
    <>
    <Errors />

    <div className={styles.signup_wrap}>

    <div className={styles.signup_containter}>
      <form className={styles.the_form} onSubmit={onSignUp}>
          <label>Pick an Avatar</label>
          <input
            id='file'
            type="file"
            accept="image/*"
            onChange={updateAvatar}
          />
          <br />

          <label>User Name</label>
          <input
            className=""
            type="text"
            name="username"
            onChange={event => setUsername(event.target.value)}
            value={username}
          />
          <br />

          <label>Email</label>
          <input
            className=""
            type="text"
            name="email"
            onChange={event => setEmail(event.target.value)}
            value={email}
          />
          <br />



          <label>Password</label>
          <input
            className=""
            type="password"
            name="password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
          <br />

          <label>Repeat Password</label>
          <input
            className=""
            type="password"
            name="repeat_password"
            onChange={event => setRepeatPassword(event.target.value)}
            value={repeatPassword}
            required={true}
          />
          <br />

        <div className={styles.enter_button}>
          <ToolTip content={"Enter"}>
            <button> <IoIosPower /> </button>
          </ToolTip>
        </div>

      </form>
    </div>
    </div>
    </>
  );


};



export default SignUpForm;
