import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useHistory } from "react-router-dom";
import { thunk_updatePriChar, thunk_createPriChar } from "../../store/thunks/books.js";
import { processFile } from "../../services/protectedFileUpload.js";
import { nanoid } from "nanoid";
import styles from "./createpricharform.module.css";


const defaultValues = { charId: '', avatar: '', character_name: '', character_label: '', book_id: '' };


const CreatePriCharForm = ({ bookId, update=false, payload=defaultValues, closeModal }) => {
  const { charId, avatar, character_name, character_label, book_id } = payload;
  const [avatarUrl, setAvatarUrl] = useState(avatar);
  const [charname, setCharname] = useState(character_name);
  const [charlabel, setCharlabel] = useState(character_label);
  const [urlpreview, setUrlPreview] = useState(null);

  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();



  useEffect(() => {
    const errors = [];
    if (charlabel.length === 0) {
      errors.push('You must have a character label to create a character.');
    }

    if (charname.length === 0){
      errors.push("You must have character name to create a character.");
    }

    setErrors(errors);
  }, [charlabel, charname]);





  const onSubmit = event => {
    event.preventDefault();
    dispatch(thunk_createPriChar({ bookId, urlpreview, charname, charlabel }));
    closeModal();
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



  const onUpdate = event => {
    event.preventDefault();
    dispatch(thunk_updatePriChar({ urlpreview, charname, charlabel, book_id, charId }));
    closeModal();
  }



  if (update) {
    return (
      <>
        <div>
          {errors.map(each => (
            <li key={nanoid()}> { each} </li>
          ))}
        </div>

        {/* for previewing the image before it is sent to backend */}
        <div className={styles.url_preview_wrap}>
          <p>Last avatar: </p>
          <img src={avatar} alt={"last avatar"} />

          {urlpreview === null ?
            <></>
            :
            <>
              <img src={avatarUrl} alt={"cool"}/>
              <button onClick={cancelImgChoice}> Cancel </button>
            </>
          }
        </div>


        <div>
          <form className={styles.create_char_container} onSubmit={onUpdate}>

            <label className="">
              Pick an Avatar
            <input id='file' className="" type="file" accept="image/*" onChange={updateAvatar} />
            </label>

            <label>
              Character Name
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
  }






  return (
    <>
    <div>
      {errors.map(each => (
        <li key={nanoid()}> { each } </li>
      ))}
    </div>

      {/* for previewing the image before it is sent to backend */}
      <div className={styles.url_preview_wrap}>
        {urlpreview === null ?
          <></>
          :
          <>
            <img src={avatarUrl} alt={"cool"}/>
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
            Character Name
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

          <button type='submit'> Create </button>

        </form>

      </div>
    </>
  )
};

export default CreatePriCharForm;
