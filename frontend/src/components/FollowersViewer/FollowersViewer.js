import React, { useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { thunk_followOrUnfollow } from "../../store/thunks/following.js";






import styles from "./followersviewer.module.css";
import defaultImg from "../../icons/default_user.svg";








const FollowersViewer = ({ data }) => {
  const [ addfollow, setAddfollow ] = useState(0);
  const dispatch = useDispatch();
  // const history = useHistory();
  const followersInfo = useSelector(store => store.followersReducer.followers);
  const followingInfo = useSelector(store => store.followingReducer.following);
  // const followOrUnFollowMessage = useSelector(store => store.followingReducer.message);





  const handle = (event, userId, Type) => {
    event.preventDefault();
    if (data === null) return;

    dispatch(thunk_followOrUnfollow(userId));
    if (Type === 'FOLLOW') {
      setAddfollow(1);
    } else if (Type === 'UN_FOLLOW') {
      setAddfollow(0);
    }


  }







// if there is not information to display for the current users followers info

  if (!followersInfo && !followingInfo) {
    return (
      <div>
        <h1>Loading ... </h1>
      </div>
    )
  }


// if there is a flag set that this is another users followers / following info was clicked
// if(data.otheruser === true) { ect....}








  // this returns if the viewer was clicked on current users profile

  return (
    <>
      <div className={styles.user_info_container}>
        {Object.values(followersInfo).map(eachFollower => (
          <>
            <div className={styles.user_info_wrap}>
              <div className={styles.user_avatar}>
                {eachFollower.avatar === null ?
                  <img src={defaultImg} alt='avatar' />
                  :
                  <img src={eachFollower.avatar} alt='avatar' />
                }
              </div>


              <div className={styles.user_text}>
                <p>Search Id: {eachFollower.search_id} </p>
                <br />
                <p>Username: {eachFollower.user_name}</p>
                <br />
                <p>Email: {eachFollower.email}</p>
                <br />
                <p> Number of followers {Object.keys(eachFollower.followers).length + addfollow} </p>


                {/* unfollow or follow link needs to appear if i am following them or not */}

                {followingInfo.following[eachFollower.id] ?
                  <a href='/' onClick={event => handle(event, eachFollower.id, 'UN_FOLLOW')}>
                    Unfollow
                  </a>
                :
                  <a href='/' onClick={event => handle(event, eachFollower.id, 'FOLLOW')}>
                    Follow
                  </a>
                }

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





export default FollowersViewer;
