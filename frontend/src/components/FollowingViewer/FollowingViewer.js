import { useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
// import { thunk_followOrUnfollow } from "../../store/thunks/following.js";




import styles from "./followingviewer.module.css";
import defaultImg from "../../icons/default_user.svg";








const FollowingViewer = ({ data }) => {
  const [addfollow, setAddfollow] = useState(0);
  const dispatch = useDispatch();


  const followingInfo = useSelector(store => store.followingReducer.following);












  if (!followingInfo) {
    return (
      <div>
        <h1>Loading ... </h1>
      </div>
    )
  }





  return (
    <>
      <div className={styles.user_info_container}>
        {Object.values(followingInfo.following).map(each => (
          <>
            <div className={styles.user_info_wrap}>
              <div className={styles.user_avatar}>
                {each.avatar === null ?
                  <img src={defaultImg} alt='avatar' />
                  :
                  <img src={each.avatar} alt='avatar' />
                }
              </div>


              <div className={styles.user_text}>
                <p>Search Id: {each.search_id} </p>
                <br />
                <p>Username: {each.user_name}</p>
                <br />
                <p>Email: {each.email}</p>
                <br />
                <p> Number of followers {Object.keys(each.followers).length + addfollow} </p>




                <a href='/' onClick={event => event.preventDefault()}>
                  Message
                </a>
              </div>

            </div>
          </>
        ))}
      </div>
    </>
  )
};





export default FollowingViewer;
