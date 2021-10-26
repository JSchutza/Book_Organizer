

// NOTES
// used within a modal. need the dispatch and selector in the outer component
// that renders this one so that you can just pass the selected object into the
// payload prop

import { NavLink } from 'react-router-dom';


import styles from "./followers.module.css";


const Followers = ({ payload }) => {


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

export default Followers;
