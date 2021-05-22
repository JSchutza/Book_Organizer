import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ToolTip from "../ToolTip";

import styles from "./updateuserform.module.css";






const UpdateUserForm = ({ data }) => {
  const [ theirUsername, setTheirUsername ] = useState(data.isUser.user_name);
  const dispatch = useDispatch();
  const history = useHistory();






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
          value={theirUsername}
          onChange={event => setTheirUsername(event.target.value)}
        />
        </label>


        <label>
          Password
        <input
          type="password"
          name="password"
          value={theirUsername}
          onChange={event => setTheirUsername(event.target.value)}
        />
        </label>


        <label>
          Bio
        <textarea
          value={theirUsername}
          onChange={event => setTheirUsername(event.target.value)}
        />
        </label>


        <label>
          Location
        <input
          type="text"
          name="location"
          value={theirUsername}
          onChange={event => setTheirUsername(event.target.value)}
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
          type="text"
          name="birthday"
          value={theirUsername}
          onChange={event => setTheirUsername(event.target.value)}
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
