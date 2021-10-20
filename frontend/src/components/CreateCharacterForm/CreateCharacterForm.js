import { useState } from 'react';
import { useDispatch } from "react-redux";



import { thunk_newPubCharacter } from "../../store/thunks/characters.js";
import { processFile } from "../../services/protectedFileUpload.js";

import Errors from "../Errors";
import ImgPreview from '../ImgPreview';


import styles from "./createcharacterform.module.css";


const CreateCharacterForm = ({ closeModal }) => {
  const [ imgModal, setImgModal ] = useState(false);
  const [ avatarUrl, setAvatarUrl ] = useState("");
  const [ charname, setCharname ] = useState("");
  const [ charlabel, setCharlabel ] = useState("");
  const [ urlpreview, setUrlPreview ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();






  const onSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const result = await dispatch(thunk_newPubCharacter({ urlpreview, charname, charlabel }));
    if(result){
      closeModal();
    } else {
      setLoading(false);
    }
  };



  const updateAvatar = event => {
    const result = processFile(event.target.files);
    if (result) {
      setUrlPreview(result);
      setAvatarUrl(URL.createObjectURL(result));
      // open the img modal
      setImgModal(true);

    } else {
      setUrlPreview(null);
      setAvatarUrl('');
      // close the img modal
      setImgModal(false);
    }
  };



  const cancelImgChoice = () => {
    setUrlPreview(null);
    setAvatarUrl('');
    // close the img modal
    setImgModal(false);
  }





  return (
    <>

      <Errors />

      <ImgPreview
        urlpreview={urlpreview}
        cancelImgChoice={cancelImgChoice}
        avatarUrl={avatarUrl}
        openModal={imgModal}
        setOpenModal={setImgModal}
      />

      {loading ? <p>Creating your character </p> : null}

      <div className={styles.create_char_wrap}>

        <form className={styles.create_char_container} onSubmit={onSubmit}>

          <label className=""> Pick an Avatar </label>
            <input id='file' className="" type="file" accept="image/*" onChange={updateAvatar} />


          <label> Name </label>
            <input
              type='text'
              name='character name'
              value={charname}
              onChange={(e) => setCharname(e.target.value) }
            />


          <label> Character Label </label>
            <input
              type='text'
              name='character label'
              value={charlabel}
              onChange={(e) => setCharlabel(e.target.value)}
              />

            <button> Create </button>

        </form>
    </div>
    </>
  )
};

export default CreateCharacterForm;
