import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ToolTip from "../ToolTip";

import { thunk_updateUser } from "../../store/thunks/session.js";
import { useUser } from "../../context/UserContext.js";


import styles from "./updateuserform.module.css";


const UpdateUserForm = ({ payload, closeUpdateModal }) => {
  const { avatar, username, email, bio, location, birthday } = payload;
  const [ theirAvatar, setTheirAvatar ] = useState(avatar);
  const [ theirUsername, setTheirUsername ] = useState(username);
  const [ theirEmail, setTheirEmail ] = useState(email);
  const [ theirBio, setTheirBio ] = useState(bio);
  const [ theirLocation, setTheirLocation ] = useState(location);
  const [ theirBirthday, setTheirBirthday ] = useState(birthday);
  const [ theirNewPassword, setTheirNewPassword ] = useState('');
  const [ paswordConfirm, setPasswordConfirm ] = useState('');
  const [ urlpreview, setUrlPreview ] = useState(null);
  const dispatch = useDispatch();
  const { isUser } = useUser();
  // const history = useHistory();




  const onSubmit = event => {
    event.preventDefault();
    const payload = {
      userId: isUser.id,
      name: theirUsername,
      email: theirEmail,
      password: theirNewPassword,
      bio: theirBio,
      location: theirLocation,
      avatar: theirAvatar,
      birthdate: theirBirthday

    }
    dispatch(thunk_updateUser(payload));
    closeUpdateModal();
  }



  const updateAvatar = event => {
    const file = event.target.files[0];
    setUrlPreview(file);
    setTheirAvatar(URL.createObjectURL(file));
  };




  const cancelImgChoice = () => {
    setUrlPreview(null);
    setTheirAvatar('');
  }




  return (
    <>
      <div className={styles.update_containter}>

        <p>Last avatar: </p>
        <img src={avatar} alt={"last avatar"} />


        {!urlpreview ?
          <></>
          :
          <>
            <img src={theirAvatar} alt='user' />
            <button onClick={cancelImgChoice}> Cancel </button>
          </>
         }




        <form className={styles.the_form} onSubmit={onSubmit}>

        <label>
          User Name
        <input
          type="text"
          name="username"
          value={theirUsername}
          onChange={event => setTheirUsername(event.target.value)}
        />
        </label>


        <label>
          Email
        <input
          type="email"
          name="email"
          value={theirEmail}
          onChange={event => setTheirEmail(event.target.value)}
        />
        </label>


        <label>
          Password
        <input
          type="password"
          name="password"
          value={theirNewPassword}
          onChange={event => setTheirNewPassword(event.target.value)}
        />
        </label>


        <label>
          Confirm Password
        <input
          type="password"
          name="password"
          value={paswordConfirm}
          onChange={event => setPasswordConfirm(event.target.value)}
        />
        </label>


        <label>
          Bio
        <textarea
          value={theirBio}
          onChange={event => setTheirBio(event.target.value)}
        />
        </label>


        <label>
          Location
        <input
          type="text"
          name="location"
          value={theirLocation}
          onChange={event => setTheirLocation(event.target.value)}
        />
        </label>


        <label>
          Avatar
            <input id='file' type="file" accept="image/*" onChange={updateAvatar} />
        </label>


        <label>
          Birthday
        <input
          type="date"
          name="birthday"
          value={theirBirthday}
          onChange={event => setTheirBirthday(event.target.value)}
        />
        </label>




        <ToolTip content={'Update'}>
          <button className="" type="submit"> Update </button>
        </ToolTip>



      </form>
    </div>
    </>
  )

};




export default UpdateUserForm;
