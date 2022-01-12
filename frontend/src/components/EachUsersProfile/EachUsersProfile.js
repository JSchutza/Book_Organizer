import { useEffect, useState } from 'react';
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunk_userSearch } from "../../store/thunks/session.js";
import LoadScreen from "../LoadScreen";

import styles from "./eachusersprofile.module.css";


const EachUsersProfile = () => {
  const [ loaded, setLoaded ] = useState(false);
  const { searchId } = useParams();
  const history = useHistory();
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






  const handlePollClick = (event, pollId) => {
    event.preventDefault();
    history.push(`/comments/${pollId}`);
  }





   if(!searchedUserInfo || !loaded) return ( <LoadScreen /> );



  const UserInfo = ({ each }) => {
     return (
       <>
        <div className={styles.user_avatar}>
          <img src={each.avatar} alt='avatar' />
        </div>
        <div className={styles.user_text}>

          <li> Search Id: {each.search_id} </li>

          <li> Username: {each.user_name}</li>

          <li> Email: {each.email}</li>

          <li> Bio: {each.bio} </li>

          <li> Birthday: {each.birthday} </li>

          <li> Address: {each.location} </li>

          <li>
            <NavLink to='/' onClick={e=>e.preventDefault()} >
              {Object.values(each.followers).length} followers
            </NavLink>
          </li>

          <li>
            <NavLink to='/' onClick={e=>e.preventDefault()} >
              {Object.values(each.following).length} following
            </NavLink>
          </li>
        </div>
      </>
     );
   };



   const Characters = ({ each }) => {
     return (
       <>
         <div className={styles.users_characters_header}>
           <h4>{each.user_name}'s Characters</h4>
         </div>

         <div className={styles.users_characters_wrap}>
           {Object.values(each.characters).length !== 0 ?
              Object.values(each.characters).map(eachChar => (
                <div className={styles.each_character_containter}>
                  <div className={styles.each_character_img} >
                    <img src={eachChar.avatar} alt={eachChar.name} />
                  </div>
                  <div className={styles.each_char_detail} >
                    <p> <b> {eachChar.character_name} </b> </p>
                    <p>{eachChar.character_label}</p>
                  </div>
                </div>
              ))
            :
              <h3> {each.user_name} currently does not have any characters. </h3>
            }
         </div>
       </>
     );
   };



   const Polls = ({ each }) => {
     return (
       <>
         <div className={styles.users_polls_header}>
           <h4> {each.user_name}'s Polls </h4>
         </div>

         <div className={styles.users_polls_wrap}>
           {Object.values(each.polls). length !== 0 ?
            Object.values(each.polls).map(eachPoll => (
              <div className={styles.each_poll_containter}>
                <NavLink to='/' onClick={event => handlePollClick(event, eachPoll.id)}>
                  <p> {eachPoll.created_at} </p>
                  <h3> {eachPoll.title} </h3>
                  <p> <b> <i> {eachPoll.question_text} </i> </b> </p>
                </NavLink>
              </div>
            ))
           :
            <h3> {each.user_name} currently does not have any polls. </h3>
           }
         </div>
       </>
     );
   };



  return (
    <>
      <div className={styles.user_info_wrap}>
        {Object.values(searchedUserInfo).map(each => (
          <>
            <UserInfo each={each} />
            <Characters each={each} />
            <Polls each={each} />
          </>
        ))}
      </div>
    </>
  )
};



export default EachUsersProfile;
