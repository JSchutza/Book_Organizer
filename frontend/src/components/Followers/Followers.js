

// NOTES
// used within a modal. need the dispatch and selector in the outer component
// that renders this one so that you can just pass the selected object into the
// payload prop
import { NavLink } from 'react-router-dom';

import { Book } from "../Book";

import styles from "./followers.module.css";


const Followers = ({ payload }) => {




  const UserInfo = ({ each }) => {
    return (
      <div>
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
      </div>
    );
  };



  const TheirBooks = ({ each }) => {
    return (
      <>
        <div>
          <h2> Books </h2>
        </div>

        <div>
          {Object.values(each.books).map(eachBook => (
            <div>
              <Book
                bookId={eachBook.id}
                title={eachBook.the_title}
                creatorId={eachBook.creator_id}
                creationDate={eachBook.created_at}
              />
            </div>
          ))}
        </div>
      </>
    );
  };



  const TheirCharacters = ({ each }) => {
    return (
      <>
        <div>
          <h2> Characters </h2>
        </div>

        <div>
          {Object.values(each.characters).map(eachChar => (
            <div>
                <div>
                  <img src={eachChar.avatar} />
                </div>

                <div>
                  <h3> {eachChar.character_name} </h3>
                  <p> {eachChar.character_label} </p>
                </div>
            </div>
          ))}
        </div>
      </>
    );
  };



  const TheirPolls = ({ each }) => {
    return (
      <>
        <div className={styles.recent_polls_header}>
          <h2> Polls </h2>
        </div>

        <div className={styles.poll_link_wrap}>
          {Object.values(each.polls).map(eachPoll => (
            <div className={styles.each_poll_link}>
              <NavLink to={`/comments/${eachPoll.id}`} exact>
                <h3> {eachPoll.title} </h3>
              </NavLink>
            </div>
          ))}
        </div>
      </>
    );
  };



  const TheirFollowers = ({ each }) => {
    return (
      <>
        <div>
          <h2> Followers </h2>
        </div>

        <div>
          {Object.values(each.followers).map(eachFollower => (
            <div>
              <li> {eachFollower} </li>
            </div>
          ))}
        </div>
      </>
    );
  };



  const TheirFollowing = ({ each }) => {
    return (
      <>
        <div>
          <h2> Following </h2>
        </div>

        <div>
          {Object.values(each.following).map(eachUser => (
            <div>
              <li> {eachUser} </li>
            </div>
          ))}
        </div>
      </>
    );
  };



  return (
    <>
    {Object.values(payload).map(eachFollower => (
      <>
        <UserInfo each={eachFollower} />
        <TheirBooks each={eachFollower} />
        <TheirCharacters each={eachFollower} />
        <TheirPolls each={eachFollower} />
        <TheirFollowers each={eachFollower} />
        <TheirFollowing each={eachFollower} />
      </>
    ))}
    </>
  )
};

export default Followers;
