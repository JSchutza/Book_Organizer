import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ToolTip from "../ToolTip";

import styles from "./updateuserform.module.css";






const UpdateUserForm = ({ data }) => {
  // const [ theirAvatar, setTheirAvatar ] = useState(data.isUser.user_name);

  const [ theirUsername, setTheirUsername ] = useState(data.isUser.user_name);
  const [ theirEmail, setTheirEmail ] = useState(data.isUser.email);

  const [ theirNewPassword, setTheirNewPassword ] = useState('');
  const [ paswordConfirm, setPasswordConfirm ] = useState('');

  const [ theirBio, setTheirBio ] = useState(data.isUser.bio);
  const [ theirLocation, setTheirLocation ] = useState(data.isUser.location);


  const [ theirBirthday, setTheirBirthday ] = useState(data.isUser.birthday);


  const dispatch = useDispatch();
  // const history = useHistory();






  useEffect(() => {

  },[dispatch]);




  const onSubmit = event => {
    event.preventDefault();

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



          <div>
            <div>
              <ToolTip content={'Update'}>
                <button className="" type="submit"> Update </button>
              </ToolTip>
            </div>
          </div>


      </form>
    </div>
    </>
  )

};




export default UpdateUserForm;
