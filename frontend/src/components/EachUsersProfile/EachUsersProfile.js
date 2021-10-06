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



  const handleFollowersClick = event => {
    event.preventDefault();
  }


  const handleFollowingClick = event => {
    event.preventDefault();
  }


  const handleCharacterClick = event => {
    event.preventDefault();
  }



  const handlePollClick = (event, pollId) => {
    event.preventDefault();
    history.push(`/comments/${pollId}`);
  }





   if(!searchedUserInfo || !loaded) return ( <LoadScreen /> );






  return (
    <>
      <div>
        <div className={styles.user_info_wrap}>
          {Object.values(searchedUserInfo).map(each => (
            <>
              <div className={styles.user_avatar}>
                <img src={each.avatar} alt='avatar' />
              </div>

              <div></div>
              <div className={styles.user_text}>

                <p>Search Id: {each.search_id} </p>
                <br />
                <p>Username: {each.user_name}</p>
                <br />
                <p>Email: {each.email}</p>
                <br />
                <p>Bio: {each.bio} </p>
                <br />
                <p>Birthday: {each.birthday} </p>
                <br />
                <p>Address: {each.location} </p>
                <br />

                <NavLink to='/' onClick={event => handleFollowersClick(event)} >
                    {Object.values(each.followers).length} followers
                </NavLink>

                <NavLink to='/' onClick={event => handleFollowingClick(event)} >
                  {Object.values(each.following).length} following
                </NavLink>
              </div>




              <div className={styles.users_characters_header}>
                <h2>{each.user_name}'s Characters</h2>
              </div>

              <div className={styles.users_characters_wrap}>
                    {Object.values(each.characters).map(eachChar => (
                      <>
                      <div className={styles.each_character_containter}>
                        <NavLink to='/' onClick={event => handleCharacterClick(event)}>
                            <div>
                              <img src={eachChar.avatar} alt={eachChar.name}/>
                            </div>

                            <div>
                              <p> <b> {eachChar.character_name} </b> </p>
                                <p>{eachChar.character_label}</p>
                            </div>
                        </NavLink>
                      </div>
                      </>
                    ))}
              </div>



              <div className={styles.users_polls_header}>
                <h2> {each.user_name}'s Polls </h2>
              </div>

              <div className={styles.users_polls_wrap}>
                    {Object.values(each.polls).map(eachPoll => (
                      <>
                      <div className={styles.each_poll_containter}>
                        <NavLink to='/' onClick={event => handlePollClick(event, eachPoll.id)}>
                          <div>
                              <p> {eachPoll.created_at} </p>
                          </div>

                          <div>
                              <h3> {eachPoll.title} </h3>
                          </div>

                          <div>
                              <p> <b> <i> {eachPoll.question_text} </i> </b> </p>
                          </div>
                        </NavLink>
                      </div>
                      </>
                    ))}
              </div>



            </>
          ))}
        </div>

      </div>
    </>
  )
};



export default EachUsersProfile;
