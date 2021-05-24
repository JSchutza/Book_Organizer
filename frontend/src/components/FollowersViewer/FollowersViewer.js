import React, { useEffect, useState } from 'react';
// import { useUser } from "../../context/UserContext.js";
import { useDispatch, useSelector } from "react-redux";
import { thunk_followOrUnfollow, thunk_getFollowing } from "../../store/thunks/following.js";
import { useHistory } from "react-router-dom";
import { hideModal } from "../../store/actions/modal.js";


import styles from "./followersviewer.module.css";
import defaultImg from "../../icons/default_user.svg";








const FollowersViewer = ({ data }) => {
  // const { isUser } = useUser();
  const [ loaded, setLoaded ] = useState(null);
  const [ message, setMessage ] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const followOrUnFollowMessage = useSelector(store => store.followingReducer.message);








  const handle = (event, userId) => {
    event.preventDefault();
    if (data === null) return;

    dispatch(thunk_followOrUnfollow(userId));
    setLoaded(true);

    // dispatch(hideModal());
    // history.push(data.lastpage);
  }









  if (!data.followersInfo && !data.followingInfo) {
    return (
      <div>
        <h1>Loading ... </h1>
      </div>
    )
  }





  return (
    <>
    <div>
        {loaded ?
        <>
        <h1> here </h1>
        </>
        :
        <> <h1>false</h1></>
        }
    </div>



    <div>
        {Object.values(data.followersInfo).map(eachFollower => (
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
                <p> Number of followers {Object.keys(eachFollower.followers).length} </p>


                {/* unfollow or follow link needs to appear if i am following them or not */}

                {data.followingInfo[eachFollower.id] ?
                  <a href='/' onClick={event => handle(event, eachFollower.id)}>
                    Unfollow
                  </a>
                :
                  <a href='/' onClick={event => handle(event, eachFollower.id)}>
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
