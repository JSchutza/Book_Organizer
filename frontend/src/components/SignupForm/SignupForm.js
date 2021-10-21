import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { processFile } from "../../services/protectedFileUpload.js";
import { signUp } from "../../store/thunks/session.js";
import { setErrors } from "../../store/actions/errors.js";


import styles from "./signupform.module.css"
import ToolTip from "../ToolTip";
import Errors from "../Errors";

import defaultImage from "../../icons/default_user.svg";


import { IoIosPower } from "react-icons/io";

// thank you MDN for helping me, read a svg and then convert it to a file if a
// user does not select an img on sign up :)
// https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
// then
// https://developer.mozilla.org/en-US/docs/Web/API/File/File



const SignUpForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ repeatPassword, setRepeatPassword ] = useState("");
  const [ image, setImage ] = useState('');
  const [ error, setError ] = useState(null);
  const [ isLoaded, setIsLoaded ] = useState(false);




  useEffect(() => {

    fetch(`${defaultImage}`)
      .then(response => response.body)
      .then(rb => {
        const reader = rb.getReader();

        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then(({ done, value }) => {
                // If there is no more data to read
                if (done) {
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                // console.log(done, value);
                push();
              })
            }

            push();
          }
        });
      })
      .then(stream => {
        // Respond with our stream
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        setIsLoaded(true);
        const nowFile = new File([result], "default_user.svg", {
          type: "image"
        })
        setImage(nowFile);
      },
        (error) => {
          setIsLoaded(true);
          setError(error);
        });

  }, []);







  const onSignUp = async event => {
    event.preventDefault();
    if (password === repeatPassword) {
      const result = await dispatch(signUp(username, email, password, image));
      if (result) {
        closeModal();
        history.push("/profile");
      }
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



  console.log(image);



  if (error) {
    return (
      <>
        <div>Error: {error.message}</div>
      </>
    );

  } else if (!isLoaded) {
    return (
      <>
        <div>Loading...</div>
      </>
    );

  } else {

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
            <div>
            <ToolTip content={"Enter"}>
              <button> <IoIosPower /> </button>
            </ToolTip>
            </div>
          </div>

        </form>
      </div>
      </div>
      </>
    );
  }

};



export default SignUpForm;
