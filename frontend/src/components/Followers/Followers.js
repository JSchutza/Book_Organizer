

// NOTES
// used within a modal. need the dispatch and selector in the outer component
// that renders this one so that you can just pass the selected object into the
// payload prop

import Book from "../Book";

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

            </div>
          ))}
        </div>
      </>
    );
  };



  const TheirCharacters = ({ each }) => {
    return (
      <>
        {/* characters */}
        <div></div>
      </>
    );
  };



  const TheirPolls = ({ each }) => {
    return (
      <>
        {/* polls */}
        <div></div>
      </>
    );
  };



  const TheirFollowers = ({ each }) => {
    return (
      <>
        {/* followers */}
        <div></div>
      </>
    );
  };



  const TheirFollowing = ({ each }) => {
    return (
      <>
        {/* following */}
        <div></div>
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
