import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunk_userSearch } from "../../store/thunks/session.js";
import LoadScreen from "../LoadScreen";

import styles from "./eachusersprofile.module.css";


const EachUsersProfile = () => {
  const [ loaded, setLoaded ] = useState(false);
  const { searchId } = useParams();
  const dispatch = useDispatch();
  const searchedUserInfo = useSelector(store => store.usersReducer.searchedUser);



  useEffect(() => {
    if(!loaded) {
      dispatch(thunk_userSearch(searchId));
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    }
  }, [dispatch, searchId]);



   if(!searchedUserInfo || !loaded) {
     return (
        <>
          <LoadScreen />
        </>
      );
   }








  return (
    <>
      <div>
        <div className={styles.user_info_wrap}>
          {Object.values(searchedUserInfo).map(each => (
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
                <p> {Object.values(each.followers).length} followers </p>
              </div>
            </>
          ))}
        </div>

      </div>
    </>
  )
};



export default EachUsersProfile;
