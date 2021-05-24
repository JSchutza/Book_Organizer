import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunk_getAllBooks } from "../../store/thunks/books.js";
import { thunk_getUsersFollowers } from "../../store/thunks/followers.js";
import { thunk_getFollowing } from "../../store/thunks/following.js";
import { hideModal, showModal, contentModal, dataModal } from "../../store/actions/modal.js";
import {Book} from "../Book";
import { NavLink, useHistory } from "react-router-dom";
import { thunk_getUsersPolls } from "../../store/thunks/polls.js";
import { useUser } from "../../context/UserContext.js";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import ToolTip from "../ToolTip";

import styles from "./profile.module.css";
import defaultImg from "../../icons/default_user.svg";





const Profile = () => {
  const { isUser } = useUser();
  const bookInfo = useSelector((store) => store.booksReducer.books);
  const pollInfo = useSelector(store => store.pollsReducer.polls);
  const followersInfo = useSelector(store => store.followersReducer.followers);
  const followingInfo = useSelector(store => store.followingReducer.following);
  const dispatch = useDispatch();
  const history = useHistory();



  useEffect(() => {
    dispatch(hideModal());
    dispatch(thunk_getAllBooks());
    dispatch(thunk_getUsersPolls());
    dispatch(thunk_getUsersFollowers());
    dispatch(thunk_getFollowing());
  }, [dispatch]);



  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(contentModal("DeleteUser"));
    dispatch(dataModal({ isUser, lastpage: "/" }));
    dispatch(showModal());
    history.push("/dropdown");
  };





  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(contentModal("UpdateUser"));
    dispatch(dataModal({ isUser, lastpage: "/" }));
    dispatch(showModal());
    history.push("/dropdown");
  };



  const handleFollowerViewClick = event => {
    event.preventDefault();
    dispatch(contentModal("ViewFollowers"));
    dispatch(dataModal({ followersInfo, followingInfo, lastpage: "/" }));
    dispatch(showModal());
    history.push("/dropdown");
  }






  if (isUser === null) {
    return (
      <div>
        <h1> Loading ... </h1>
      </div>
    );
  }





  return bookInfo && pollInfo && followersInfo && followingInfo && (
    <>
    <div>
      {/* users info here */}
    <div className={styles.user_info_wrap}>
          <div className={styles.user_avatar}>
            {isUser.avatar === null ?
              <img src={defaultImg} alt='avatar' />
            :
              <img src={isUser.avatar} alt='avatar' />
            }
          </div>

          <div></div>
            <div className={styles.user_text}>

            <p>Search Id: {isUser.search_id} </p>
              <br/>
            <p>Username: {isUser.user_name}</p>
              <br/>
            <p>Email: {isUser.email}</p>
              <br/>
            <p>Bio: {isUser.bio} </p>
              <br/>
            <p>Birthday: {isUser.birthday} </p>
              <br/>
            <p>Address: {isUser.location} </p>
              <br />


            {followersInfo ?
              <a href='/' onClick={event => handleFollowerViewClick(event)}>
                <p> {Object.keys(followersInfo).length} followers </p>
              </a>
            :
              <></>
            }



            {followingInfo ?
              <a href='/' onClick={event => event.preventDefault(event)}>
                <p> {Object.keys(followingInfo.following).length} following </p>
              </a>
            :
              <></>
            }
            </div>
    </div>



    <div>
      <div>
        <ToolTip content={'Update Info'}>
          <a href='/' onClick={event => handleUpdate(event)}> <GrUpdate /> </a>
        </ToolTip>
      </div>

      <div>
        <ToolTip content={'Delete Account'}>
          <a href='/' onClick={event => handleDelete(event)}> <RiDeleteBinFill /> </a>
        </ToolTip>
      </div>
    </div>



      <div className={styles.recent_books_header}>
        <h2>Recently Created Books</h2>
      </div>

      {/* book info here */}
      <div>
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
      </div>



        <div className={styles.recent_polls_header}>
          <h2>Recently Created polls</h2>
        </div>

      <div>
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
      </div>


    </div>
    </>
  )


};

export default Profile;
