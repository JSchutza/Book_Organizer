import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { thunk_updateUser } from "../../store/thunks/session.js";
import { resetErrors } from '../../store/actions/errors.js';
import { useUser } from "../../context/UserContext.js";
import { useModalStyle } from "../../context/ReactModalStylesContext.js";

import Errors from '../Errors';
import ImgPreview from '../ImgPreview';

import ReactModal from 'react-modal';

import styles from "./updateuserform.module.css";


const UpdateUserForm = ({ payload, closeUpdateModal }) => {
  const { avatar, username, email, bio, location, birthday } = payload;
  const [ theirAvatar, setTheirAvatar ] = useState(avatar);
  const [ theirUsername, setTheirUsername ] = useState(username);
  const [ theirEmail, setTheirEmail ] = useState(email);
  const [ theirBio, setTheirBio ] = useState(bio);
  const [ theirLocation, setTheirLocation ] = useState(location);
  const [ theirBirthday, setTheirBirthday ] = useState(birthday);
  const [ theirNewPassword, setTheirNewPassword ] = useState('');
  const [ paswordConfirm, setPasswordConfirm ] = useState('');
  const [ urlpreview, setUrlPreview ] = useState(null);
  const [ imgModal, setImgModal ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ errorModal, setOpenErrorModal ] = useState(false);
  const dispatch = useDispatch();
  const { isUser } = useUser();
  const { characterFormStyle } = useModalStyle();




  const closeErrorModal = () => {
    dispatch(resetErrors());
    setOpenErrorModal(false);
  }



  const onSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const payload = {
      userId: isUser.id,
      name: theirUsername,
      email: theirEmail,
      password: theirNewPassword,
      bio: theirBio,
      location: theirLocation,
      avatar: urlpreview,
      birthdate: theirBirthday

    }

    const result = await dispatch(thunk_updateUser(payload));
    if (result) {
      closeUpdateModal();
    }
    setLoading(false);
    setOpenErrorModal(true);
  }



  const updateAvatar = event => {
    const file = event.target.files[0];
    if (file) {
      setUrlPreview(file);
      setTheirAvatar(URL.createObjectURL(file));
      // open the img modal
      setImgModal(true);
    } else {
      setUrlPreview(null);
      setTheirAvatar(URL.createObjectURL(file));
      // close the img modal
      setImgModal(false);
    }
  };




  const cancelImgChoice = () => {
    setUrlPreview(null);
    setTheirAvatar('');
    // close the img modal
    setImgModal(false);
  }




  return (
    <>

      <ReactModal
        isOpen={errorModal}
        onRequestClose={closeErrorModal}
        style={characterFormStyle}
        appElement={document.getElementById('root')}
      >
        <Errors />

      </ReactModal>


      <ImgPreview
        urlpreview={urlpreview}
        cancelImgChoice={cancelImgChoice}
        avatarUrl={theirAvatar}
        openModal={imgModal}
        setOpenModal={setImgModal}
      />


      {loading ? <p>Updating your account </p> : null}


      <div className={styles.update_containter}>

        <form className={styles.the_form} onSubmit={onSubmit}>

          <label>User Name</label>
          <input
            type="text"
            name="username"
            value={theirUsername}
            onChange={event => setTheirUsername(event.target.value)}
          />


          <label>Email</label>
          <input
            type="email"
            name="email"
            value={theirEmail}
            onChange={event => setTheirEmail(event.target.value)}
          />


          <label>Password</label>
          <input
            type="password"
            name="password"
            value={theirNewPassword}
            onChange={event => setTheirNewPassword(event.target.value)}
          />


          <label>Confirm Password</label>
          <input
            type="password"
            name="password"
            value={paswordConfirm}
            onChange={event => setPasswordConfirm(event.target.value)}
          />


          <label>Bio</label>
          <textarea
            value={theirBio}
            onChange={event => setTheirBio(event.target.value)}
          />


          <label>Location</label>
          <input
            type="text"
            name="location"
            value={theirLocation}
            onChange={event => setTheirLocation(event.target.value)}
          />


          <label>Avatar</label>
          <input id='file' type="file" accept="image/*" onChange={updateAvatar} />


          <label>Birthday</label>
          <input
            type="date"
            name="birthday"
            value={theirBirthday}
            onChange={event => setTheirBirthday(event.target.value)}
          />

          <button> Update </button>
      </form>
    </div>
    </>
  )

};




export default UpdateUserForm;
