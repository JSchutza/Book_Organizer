import { useState } from 'react';
import { useDispatch } from "react-redux";



import { thunk_newPubCharacter } from "../../store/thunks/characters.js";
import { processFile } from "../../services/protectedFileUpload.js";

import Errors from "../Errors";
import ImgPreview from '../ImgPreview';


import styles from "./createcharacterform.module.css";


const CreateCharacterForm = ({ closeModal }) => {
  const [ avatarUrl, setAvatarUrl ] = useState("");
  const [ charname, setCharname ] = useState("");
  const [ charlabel, setCharlabel ] = useState("");
  const [ urlpreview, setUrlPreview ] = useState(null);
  const dispatch = useDispatch();






  const onSubmit = async event => {
    event.preventDefault();
    const result = await dispatch(thunk_newPubCharacter({ urlpreview, charname, charlabel }));
    if(result){
      closeModal();
    }
  };



  const updateAvatar = event => {
    const result = processFile(event.target.files);
    if (result) {
      setUrlPreview(result);
      setAvatarUrl(URL.createObjectURL(result));
    } else {
      setUrlPreview(null);
      setAvatarUrl('');
    }
  };



  const cancelImgChoice = () => {
    setUrlPreview(null);
    setAvatarUrl('');
  }





  return (
    <>

      <Errors />

      <ImgPreview
        urlpreview={urlpreview}
        cancelImgChoice={cancelImgChoice}
        avatarUrl={avatarUrl}
      />


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

          <button type='submit'> Create </button>

      </form>

    </div>
    </>
  )
};

export default CreateCharacterForm;
