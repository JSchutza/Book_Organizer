import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunk_getAllBooks } from "../../store/thunks/books.js";
import { thunk_getUsersFollowers } from "../../store/thunks/followers.js";
import { thunk_getFollowing } from "../../store/thunks/following.js";

import {Book} from "../Book";
import { NavLink, useHistory } from "react-router-dom";
import { thunk_getUsersPolls } from "../../store/thunks/polls.js";
import { useUser } from "../../context/UserContext.js";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import ReactModal from 'react-modal';
import ToolTip from "../ToolTip";

import styles from "./profile.module.css";
import defaultImg from "../../icons/default_user.svg";
import LoadScreen from "../LoadScreen";
import UpdateUserForm from "../UpdateUserForm";

import { useModalStyle } from "../../context/ReactModalStylesContext.js";



const Profile = () => {
  const [ loading, setLoading ] = useState(false);
  const [ updatePayload, setUpdatePayload ] = useState(null);
  const [ openUpdateModal, setUpdateModal ] = useState(false);

  const { isUser } = useUser();
  const bookInfo = useSelector((store) => store.booksReducer.books);
  const pollInfo = useSelector(store => store.pollsReducer.polls);
  const followersInfo = useSelector(store => store.followersReducer.followers);
  const followingInfo = useSelector(store => store.followingReducer.following);
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentStyle } = useModalStyle();

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





  const handleDelete = (event) => {
    event.preventDefault();
  };





  const handleUpdate = (event, payload) => {
    event.preventDefault();
    setUpdatePayload(payload);
    setUpdateModal(true);
  };



  const closeUpdateModal = () => {
    setUpdateModal(false);
  }



  const handleFollowerViewClick = event => {
    event.preventDefault();
  }



  const handleFollowingViewClick = event => {
    event.preventDefault();
  }





  if (isUser === null || !loading) {
    return (
      <>
        <LoadScreen />
      </>
    );
  }




// only return if all of the information is available
  return bookInfo && pollInfo && followersInfo && followingInfo && (
    <>
    {/* update user modal here */}
      <ReactModal
        isOpen={openUpdateModal}
        onRequestClose={closeUpdateModal}
        style={currentStyle}
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
              <a href='/' onClick={event => handleFollowerViewClick(event)}>
                {Object.keys(followersInfo).length} followers
              </a>
            :
              <></>
            }

            {followingInfo ?
              <a href='/' onClick={event => handleFollowingViewClick(event)}>
                {Object.keys(followingInfo.following).length} following
              </a>
            :
              <></>
            }
            </div>
    </div>



    <div className={styles.user_buttons_wrap}>
      <div className={styles.update_user_button}>
        <ToolTip content={'Update Info'}>
          <a href='/' onClick={event => handleUpdate(event, {
            avatar: isUser.avatar,
            username: isUser.user_name,
            email: isUser.email,
            bio: isUser.bio,
            location: isUser.location,
            birthday: isUser.birthday
          })}> <GrUpdate /> </a>
        </ToolTip>
      </div>

      <div className={styles.delete_user_button}>
        <ToolTip content={'Delete Account'}>
          <a href='/' onClick={event => handleDelete(event)}> <RiDeleteBinFill /> </a>
        </ToolTip>
      </div>
    </div>



      <div className={styles.recent_books_header}>
        <h2>Recently Created Books</h2>
      </div>

      {/* book info here */}
        {bookInfo ?
        <div className={styles.book_link_wrap}>
        {Object.values(bookInfo).map(eachBook => (
          <div className={styles.each_book_link}>
            <Book bookId={eachBook.id} title={eachBook.the_title} creatorId={eachBook.creator_id} creationDate={eachBook.created_at} />
          </div>
        ))}
      </div>
          :
        <h1>Loading books... </h1>
        }


        <div className={styles.recent_polls_header}>
          <h2>Recently Created polls</h2>
        </div>


          {pollInfo ?
            <>
            <div className={styles.poll_link_wrap}>
            {Object.values(pollInfo).map(eachPoll => (
              <div className={styles.each_poll_link}>
                <NavLink to={`/comments/${eachPoll.id}`} exact>
                  <h3> {eachPoll.title} </h3>
                </NavLink>
              </div>
            ))}
            </div>
            </>
            :
            <h3> You currently do not have any polls. </h3>
          }
    </>
  )


};

export default Profile;
