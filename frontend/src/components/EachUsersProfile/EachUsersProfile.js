import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunk_userSearch } from "../../store/thunks/session.js";

import styles from "./eachusersprofile.module.css";


const EachUsersProfile = () => {
  const { searchId } = useParams();
  const dispatch = useDispatch();
  const searchedUser = useSelector(store => store.usersReducer.searchedUser);



  useEffect(() => {
    dispatch(thunk_userSearch(searchId));
   }, [searchId]);



   if(!searchedUser) {
     return (
        <div>
          <h1> Loading ... </h1>
        </div>
      );
   }








  return (
    <>
      <div>
        <div className={styles.user_info_wrap}>
          {Object.values(searchedUser).map(each => (
            <>
              <div className={styles.user_avatar}>
                <img src={each.avatar} alt='avatar' />
              </div>

              <div></div>
              <div className={styles.user_text}>

                <p>Search Id: {each.search_id} </p>
                <br />
                <p>Username: {each.user_name}</p>
                <br />
                <p>Email: {each.email}</p>
                <br />
                <p>Bio: {each.bio} </p>
                <br />
                <p>Birthday: {each.birthday} </p>
                <br />
                <p>Address: {each.location} </p>
                <br />
                {/* <p> Number of followers {each.followers.length} </p> */}
              </div>
            </>
          ))}
        </div>

      </div>
    </>
  )
};



export default EachUsersProfile;
