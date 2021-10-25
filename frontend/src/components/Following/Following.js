

import { NavLink } from 'react-router-dom';




import styles from "./following.module.css";




const Following = ({ payload }) => {



  const UserInfo = ({ each }) => {
    return (
      <div>
        <NavLink to={`/user/${each.search_id}`} >
          <div>
            <img src={each.avatar} />
          </div>

          <div>
            <li>Search Id: {each.search_id} </li>
            <li>Username: {each.user_name}</li>
            <li>Email: {each.email}</li>
            <li>Bio: {each.bio} </li>
            <li>Birthday: {each.birthday} </li>
            <li>Address: {each.location} </li>
          </div>
        </NavLink>
      </div>
    );
  };


  return (
    <>
      {Object.values(payload).map(eachFollower => (
        <>
          <UserInfo each={eachFollower} />
        </>
      ))}
    </>
  )
};


export default Following;
