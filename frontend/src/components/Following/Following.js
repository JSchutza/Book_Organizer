

import { NavLink } from 'react-router-dom';




import styles from "./following.module.css";




const Following = ({ payload }) => {



  const UserInfo = ({ each }) => {
    return (
      <>
        <NavLink to={`/user/${each.search_id}`} >
          <img src={each.avatar} />
          <li> {each.user_name}</li>
        </NavLink>
      </>
    );
  };


  return (
    <div className={styles.user_info_wrap} >
      {Object.values(payload).map(eachFollower => (
        <UserInfo each={eachFollower} />
      ))}
    </div>
  );

};


export default Following;
