import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunk_getAllBooks } from "../../store/thunks/books.js";
import { thunk_getUsersFollowers } from "../../store/thunks/followers.js";
import { thunk_getFollowing } from "../../store/thunks/following.js";
import { thunk_deleteUserAccount } from "../../store/thunks/session.js";
import { resetErrors } from '../../store/actions/errors.js';

import {Book} from "../Book";
import { NavLink, useHistory } from "react-router-dom";
import { thunk_getUsersPolls } from "../../store/thunks/polls.js";
import { useUser } from "../../context/UserContext.js";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import ReactModal from 'react-modal';
import ToolTip from "../ToolTip";

import styles from "./profile.module.css";
import defaultImg from "../../icons/default_user.jpg";
import LoadScreen from "../LoadScreen";
import UpdateUserForm from "../UpdateUserForm";
import Followers from "../Followers";
import Following from "../Following";

import { useModalStyle } from "../../context/ReactModalStylesContext.js";



const Profile = () => {
  const [ loading, setLoading ] = useState(false);
  const [ updatePayload, setUpdatePayload ] = useState(null);
  const [ openUpdateModal, setUpdateModal ] = useState(false);
  const [ followers, setFollowersModal ] = useState(false);
  const [ following, setFollowingModal ] = useState(false);

  const { isUser } = useUser();
  const bookInfo = useSelector((store) => store.booksReducer.books);
  const pollInfo = useSelector(store => store.pollsReducer.polls);
  const followersInfo = useSelector(store => store.followersReducer.followers);
  const followingInfo = useSelector(store => store.followingReducer.following);
  const dispatch = useDispatch();
  const history = useHistory();
  const { followerStyle, characterFormStyle } = useModalStyle();

  let endLoad;



  useEffect(() => {
    if (!loading) {
      dispatch(thunk_getAllBooks());
      dispatch(thunk_getUsersPolls());
      dispatch(thunk_getUsersFollowers());
      dispatch(thunk_getFollowing());
      endLoad = setTimeout(() => {
        setLoading(true);
      }, 1000);
    }

    return () => {
      clearTimeout(endLoad);
    }
  }, [dispatch]);





  const handleDelete = async event => {
    event.preventDefault();
    const result = await dispatch(thunk_deleteUserAccount(isUser.id));
    if (result) {
      history.push("/");
    }
  };





  const handleUpdate = (event, payload) => {
    event.preventDefault();
    setUpdatePayload(payload);
    setUpdateModal(true);
  };



  const closeUpdateModal = () => {
    dispatch(resetErrors());
    setUpdateModal(false);
  };



  const handleFollowerViewClick = event => {
    event.preventDefault();
    setFollowersModal(true);
  };



  const handleFollowingViewClick = event => {
    event.preventDefault();
    setFollowingModal(true);
  };



  const closeFollowersModal = () => {
    setFollowersModal(false);
  };



  const closeFollowingModal = () => {
    setFollowingModal(false);
  }



// if there is not a user session and it is still loading
  if (!isUser || !loading) return (<LoadScreen />);





  // clean up some of the Profile page component logic
  const UserInfo = () => {
    return (
      <div className={styles.user_info_wrap}>
        <div className={styles.user_avatar}>
          {isUser.avatar === null ?
            <img src={defaultImg} alt='avatar' />
            :
            <img src={isUser.avatar} alt='avatar' />
          }
        </div>

        <div className={styles.user_text}>

          <li>Search Id: {isUser.search_id} </li>
          <li>Username: {isUser.user_name}</li>
          <li>Email: {isUser.email}</li>
          <li>Bio: {isUser.bio} </li>
          <li>Birthday: {isUser.birthday} </li>
          <li>Address: {isUser.location} </li>



          {followersInfo ?
            <li>
              <NavLink to='/' onClick={event => handleFollowerViewClick(event)}>
                {Object.keys(followersInfo).length} followers
              </NavLink>
            </li>
            : null }


          {followingInfo ?
            <li>
              <NavLink to='/' onClick={event => handleFollowingViewClick(event)}>
                {Object.keys(followingInfo).length} following
              </NavLink>
            </li>
            : null }
        </div>
      </div>
    );
  };



  const DeleteOrUpdateAccount = () => {
    return (
      <>
        {isUser.id === 1 ? null :
          <div className={styles.user_buttons_wrap}>
            <div className={styles.update_user_button}>
              <ToolTip content={'Update Info'}>
                <NavLink to='/' onClick={event => handleUpdate(event, {
                  avatar: isUser.avatar,
                  username: isUser.user_name,
                  email: isUser.email,
                  bio: isUser.bio,
                  location: isUser.location,
                  birthday: isUser.birthday
                })}> <GrUpdate /> </NavLink>
              </ToolTip>
            </div>

            <div className={styles.delete_user_button}>
              <ToolTip content={'Delete Account'}>
                <NavLink to='/' onClick={event => handleDelete(event)}> <RiDeleteBinFill /> </NavLink>
              </ToolTip>
            </div>
          </div>
        }
      </>
    );
  };



  const UsersBooks = () => {
    return (
      <>
        <div className={styles.recent_books_header}>
          <h2>Recently Created Books</h2>
        </div>

        {/* book info here */}
        {Object.values(bookInfo).length !== 0 ?
          <div className={styles.book_link_wrap}>
            {Object.values(bookInfo).map(eachBook => (
              <div
                className={styles.each_book_link}
                key={eachBook.id}
              >
                <Book
                  bookId={eachBook.id}
                  title={eachBook.the_title}
                  creatorId={eachBook.creator_id}
                  creationDate={eachBook.created_at}
                />
              </div>
            ))}
          </div>
          :
          <h3> You currently do not have any books. </h3>
        }
      </>
    );
  };



  const UsersPolls = () => {
    return (
      <>
        <div className={styles.recent_polls_header}>
          <h2>Recently Created polls</h2>
        </div>


        {Object.values(pollInfo).length !== 0 ?
            <div className={styles.poll_link_wrap}>
              {Object.values(pollInfo).map(eachPoll => (
                <div
                  className={styles.each_poll_link}
                  key={eachPoll.id}
                >
                  <NavLink to={`/comments/${eachPoll.id}`} exact>
                    <h3> {eachPoll.title} </h3>
                  </NavLink>
                </div>
              ))}
            </div>
          :
          <h3> You currently do not have any polls. </h3>
        }
      </>
    );
  };




  const FollowersModal = () => {
    return (
      <>
        <ReactModal
          isOpen={followers}
          onRequestClose={closeFollowersModal}
          style={followerStyle}
          appElement={document.getElementById('root')}
        >
          {Object.values(followersInfo).length === 0 ?
            <h1>You currently do not have any followers!</h1>
            :
            <Followers payload={followersInfo} />
          }

        </ReactModal>
      </>
    );
  };



  const FollowingModal = () => {
    return (
      <>
        <ReactModal
          isOpen={following}
          onRequestClose={closeFollowingModal}
          style={followerStyle}
          appElement={document.getElementById('root')}
        >

          {Object.values(followingInfo).length === 0 ?
            <h1>You are currently not following any users!</h1>
            :
            <Following payload={followingInfo} />
          }

        </ReactModal>
      </>
    );
  };






// only return if all of the information is available
  return bookInfo && pollInfo && followersInfo && followingInfo && (
    <>
    {/* update user modal here */}
      <ReactModal
        isOpen={openUpdateModal}
        onRequestClose={closeUpdateModal}
        style={characterFormStyle}
        appElement={document.getElementById('root')}
      >

        <UpdateUserForm
          closeUpdateModal={closeUpdateModal}
          payload={updatePayload}
        />
      </ReactModal>


      <div className={styles.profile_header}>
        <h1>Profile</h1>
      </div>

      {/* users info here */}
      <UserInfo />

      <DeleteOrUpdateAccount />


      <UsersBooks />

      <UsersPolls />

      <FollowersModal />

      <FollowingModal />

    </>
  )


};

export default Profile;
