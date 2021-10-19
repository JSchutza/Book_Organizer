
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { thunk_updatePubCharacter } from "../../store/thunks/characters.js";
import { resetErrors } from '../../store/actions/errors.js';
import { useModalStyle } from "../../context/ReactModalStylesContext.js";

import Errors from "../Errors";
import ImgPreview from "../ImgPreview";
import ReactModal from 'react-modal';

import styles from "./updatepubcharform.module.css";


const UpdatePubCharForm = ({ payload, closeUpdateModal }) => {
  const { charId, avatar, character_label, character_name } = payload;
  const [ errorModal, setOpenErrorModal ] = useState(false);
  const [ imgModal, setImgModal ] = useState(false);
  const [ avatarUrl, setAvatarUrl ] = useState('');
  const [ charname, setCharname ] = useState(character_name);
  const [ charlabel, setCharlabel ] = useState(character_label);
  const [ urlpreview, setUrlPreview ] = useState(null);
  const dispatch = useDispatch();
  const { characterFormStyle } = useModalStyle();



  const closeErrorModal = () => {
    dispatch(resetErrors());
    setOpenErrorModal(false);
  }



  const updateAvatar = event => {
    const file = event.target.files[0];
    if (file) {
      setUrlPreview(file);
      setAvatarUrl(URL.createObjectURL(file));
      // open the img modal
      setImgModal(true);
    } else {
      setUrlPreview(null);
      setAvatarUrl('');
      // close the img modal
      setImgModal(false);
    }
  };



  const onSubmit = async event => {
    event.preventDefault();
    const result = await dispatch(thunk_updatePubCharacter({ urlpreview, charname, charlabel, charId }));
    if(result) {
      closeUpdateModal();
    } else {
      setOpenErrorModal(true);
    }

  }








  const cancelImgChoice = () => {
    setUrlPreview(null);
    setAvatarUrl('');
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
          update={true}
          prevAvatar={avatar}
          urlpreview={urlpreview}
          cancelImgChoice={cancelImgChoice}
          avatarUrl={avatarUrl}
          openModal={imgModal}
          setOpenModal={setImgModal}
        />


        <form className={styles.create_char_container} onSubmit={onSubmit}>

            <label> Avatar </label>
            <input id='file' type="file" accept="image/*" onChange={updateAvatar} />

          <label> Name </label>
            <input
              type='text'
              name='character name'
              value={charname}
              onChange={(e) => setCharname(e.target.value)}
              />

          <label> Character Label </label>
            <input
              type='text'
              name='character label'
              value={charlabel}
              onChange={(e) => setCharlabel(e.target.value)}
              />

            <button type='submit'> Update </button>

        </form>

      </>
    )

};

export default UpdatePubCharForm;
