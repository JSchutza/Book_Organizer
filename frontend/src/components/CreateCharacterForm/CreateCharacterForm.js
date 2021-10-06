import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import { thunk_newPubCharacter } from "../../store/thunks/characters.js";
import { processFile } from "../../services/protectedFileUpload.js";
import { nanoid } from "nanoid";
import styles from "./createcharacterform.module.css";
import { useHistory } from "react-router-dom";





const CreateCharacterForm = ({ closeModal }) => {
  const [ avatarUrl, setAvatarUrl ] = useState("");
  const [ charname, setCharname ] = useState("");
  const [ charlabel, setCharlabel ] = useState("");
  const [ urlpreview, setUrlPreview ] = useState(null);
  const [ errors, setErrors ] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
  const errors = [];
  if (charlabel.length === 0) {
    errors.push('You must enter an character label to create an character.');
  }
  if(charname.length === 0) {
    errors.push('You must enter an character name to create an character.');
  }
  setErrors(errors);
  }, [charlabel, charname]);







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
      <div>
        {errors.map(each => (
          <li key={nanoid()}> {each} </li>
        ))}
      </div>




      {/* for previewing the image before it is sent to backend */}
      <div className={styles.url_preview_wrap}>
        {urlpreview === null ?
        <p></p>
        :
        <>
          <img src={avatarUrl} alt={"cool"} />
            <button onClick={cancelImgChoice}> Cancel </button>
        </>
        }
      </div>


    <div>
      <form className={styles.create_char_container} onSubmit={onSubmit}>

      <label className="">
      Pick an Avatar
      <input id='file' className="" type="file" accept="image/*" onChange={updateAvatar} />
      </label>


      <label>
      Name
      <input
        type='text'
        name='character name'
        value={charname}
        onChange={(e) => setCharname(e.target.value) }
      />
      </label>


      <label>
      Character Label
      <input
        type='text'
        name='character label'
        value={charlabel}
        onChange={(e) => setCharlabel(e.target.value)}
        />
      </label>

      <button type='submit'> Create </button>

      </form>

    </div>
    </>
  )
};

export default CreateCharacterForm;
