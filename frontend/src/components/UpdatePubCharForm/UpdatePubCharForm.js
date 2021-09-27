
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { thunk_updatePubCharacter } from "../../store/thunks/characters.js";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";
import styles from "./updatepubcharform.module.css";



const UpdatePubCharForm = ({ payload, closeUpdateModal }) => {
  const { charId, avatar, character_label, character_name, created_at, pub_date, user_id, username, search_id } = payload;
  const [ avatarUrl, setAvatarUrl ] = useState("");
  const [ charname, setCharname ] = useState(character_name);
  const [ charlabel, setCharlabel ] = useState(character_label);
  const [ urlpreview, setUrlPreview ] = useState(null);
  const [ errors, setErrors ] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    const errors = [];
    if(charname.length === 0){
      errors.push("You must enter an character name to create an character.");
    }
    if(charlabel.length === 0){
      errors.push("You must enter an character label to create an character.");
    }
    setErrors(errors);
  },[charname, charlabel]);



  const updateAvatar = event => {
    const file = event.target.files[0];
    setUrlPreview(file);
    setAvatarUrl(URL.createObjectURL(file));
  };



  const onSubmit = event => {
    event.preventDefault();
    dispatch(thunk_updatePubCharacter({ urlpreview, charname, charlabel, charId }));
    closeUpdateModal();
  }








  const cancelImgChoice = () => {
    setUrlPreview(null);
    setAvatarUrl('');
  }





    return (
      <>
      <div>
        {errors.map(each => (
          <li key={nanoid()}> { each } </li>
        ))}
      </div>

        <div className={styles.url_preview_wrap}>
          <p>Last avatar: </p>
          <img src={avatar} alt={"last avatar"} />

          {urlpreview === null ?
            <></>
            :
            <>
              <img src={avatarUrl} alt={"cool"} />
              <button onClick={cancelImgChoice}> Cancel </button>
            </>
          }
        </div>


      <div>
        <form className={styles.create_char_container} onSubmit={onSubmit}>

          <label>
              Avatar
            <input id='file' className="" type="file" accept="image/*" onChange={updateAvatar} />
          </label>

          <label>
              Name
            <input
              type='text'
              name='character name'
              value={charname}
              onChange={(e) => setCharname(e.target.value)}
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

            <button type='submit'> Update </button>

        </form>
      </div>
      </>
    )

};

export default UpdatePubCharForm;
