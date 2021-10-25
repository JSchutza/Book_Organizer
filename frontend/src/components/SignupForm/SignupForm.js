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





  if (loading) return (<SuccessMessage message='Creating your account.' />);



  return (
    <>
    <Errors />

    <div className={styles.signup_wrap}>

      <div className={styles.signup_containter}>
        <form className={styles.the_form} onSubmit={onSignUp}>
            <label>Pick an Avatar</label>
            <input
              id='file'
              name='file'
              type="file"
              aria-label='avatar'
              accept="image/*"
              onChange={updateAvatar}
              required={true}
            />
            <br />

            <label>User Name</label>
            <input
              type="text"
              name="username"
              aria-label='Username'
              placeholder="Your Username Here"
              onChange={event => setUsername(event.target.value)}
              value={username}
              required={true}
            />
            <br />

            <label>Email</label>
            <input
              type="email"
              name="email"
              aria-label='Email'
              placeholder="Your Email Here"
              onChange={event => setEmail(event.target.value)}
              value={email}
              required={true}
            />
            <br />



            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your Password Here"
              aria-label='Password'
              autoComplete='password'
              onChange={event => setPassword(event.target.value)}
              value={password}
              required={true}
            />
            <br />

            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              placeholder="Confirm Password Here"
              aria-label='Password'
              autoComplete='password'
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
