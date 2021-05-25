import React, { useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
// import { thunk_followOrUnfollow } from "../../store/thunks/following.js";


// import { useHistory } from "react-router-dom";
// import { hideModal, dataModal, contentModal } from "../../store/actions/modal.js";


import styles from "./followingviewer.module.css";
import defaultImg from "../../icons/default_user.svg";








const FollowingViewer = ({ data }) => {
  const [addfollow, setAddfollow] = useState(0);
  const dispatch = useDispatch();
  // const history = useHistory();
  // const followersInfo = useSelector(store => store.followersReducer.followers);
  const followingInfo = useSelector(store => store.followingReducer.following);
  // const followOrUnFollowMessage = useSelector(store => store.followingReducer.message);





  const handle = (event, userId, Type) => {
    event.preventDefault();
    if (data === null) return;

    // dispatch(thunk_followOrUnfollow(userId));
    if (Type === 'FOLLOW') {
      setAddfollow(1);
    } else if (Type === 'UN_FOLLOW') {
      setAddfollow(0);
    }

    // dispatch(dataModal(null));
    // dispatch(contentModal(null));
    // dispatch(hideModal());
    // history.push(data.lastpage);
  }









  if (!followingInfo) {
    return (
      <div>
        <h1>Loading ... </h1>
      </div>
    )
  }





  return (
    <>
      <div>
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
