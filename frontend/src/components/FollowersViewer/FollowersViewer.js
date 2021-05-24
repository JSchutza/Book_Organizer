import React, { useState } from 'react';

import { useDispatch } from "react-redux";
import { thunk_followOrUnfollow } from "../../store/thunks/following.js";


import { useHistory } from "react-router-dom";
import { hideModal, dataModal, contentModal } from "../../store/actions/modal.js";


import styles from "./followersviewer.module.css";
import defaultImg from "../../icons/default_user.svg";








const FollowersViewer = ({ data }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  // const followOrUnFollowMessage = useSelector(store => store.followingReducer.message);





  const handle = (event, userId) => {
    event.preventDefault();
    if (data === null) return;

    dispatch(thunk_followOrUnfollow(userId));

    dispatch(dataModal(null));
    dispatch(contentModal(null));
    dispatch(hideModal());
    history.push(data.lastpage);
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
