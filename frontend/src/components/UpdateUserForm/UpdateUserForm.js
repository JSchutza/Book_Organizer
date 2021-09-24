import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ToolTip from "../ToolTip";

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

  const dispatch = useDispatch();
  // const history = useHistory();




  const onSubmit = event => {
    event.preventDefault();
    // dispatch thunk to update user
    closeUpdateModal();
  }





  return (
    <>
      <div className={styles.update_containter}>
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
        <input
          type="file"
        />
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
