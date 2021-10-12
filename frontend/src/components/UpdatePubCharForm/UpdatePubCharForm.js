
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { thunk_updatePubCharacter } from "../../store/thunks/characters.js";

import Errors from "../Errors";

import styles from "./updatepubcharform.module.css";


const UpdatePubCharForm = ({ payload, closeUpdateModal }) => {
  const { charId, avatar, character_label, character_name, created_at, pub_date, user_id, username, search_id } = payload;
  const [ avatarUrl, setAvatarUrl ] = useState("");
  const [ charname, setCharname ] = useState(character_name);
  const [ charlabel, setCharlabel ] = useState(character_label);
  const [ urlpreview, setUrlPreview ] = useState(null);
  const dispatch = useDispatch();





  const updateAvatar = event => {
    const file = event.target.files[0];
    setUrlPreview(file);
    setAvatarUrl(URL.createObjectURL(file));
  };



  const onSubmit = async event => {
    event.preventDefault();
    const result = await dispatch(thunk_updatePubCharacter({ urlpreview, charname, charlabel, charId }));
    if(result) {
      closeUpdateModal();
    }

  }








  const cancelImgChoice = () => {
    setUrlPreview(null);
    setAvatarUrl('');
  }





    return (
      <>

        <Errors />

        <p>Last avatar:</p>

        <div className={styles.url_preview_wrap}>
          <img src={avatar} alt={"last avatar"} />

          {urlpreview === null ?
              null
            :
              <>
                <img src={avatarUrl} alt={"cool"} />
                <button onClick={cancelImgChoice}> Cancel </button>
              </>
          }
        </div>



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
