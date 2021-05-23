import React from 'react';
import { useUser } from "../../context/UserContext.js";

import styles from "./followersviewer.module.css";
import defaultImg from "../../icons/default_user.svg";




const FollowersViewer = ({ data }) => {
  const { isUser } = useUser();







  if (!data.followersInfo) {
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
                {eachFollower.followers[isUser.id] !== undefined ?
                    <a href='/' onClick={event => event.preventDefault()}>
                      Unfollow
                    </a>
                  :
                    <a href='/' onClick={event => event.preventDefault()}>
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
