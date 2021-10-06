import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { thunk_updatePriChar, thunk_createPriChar } from "../../store/thunks/books.js";
import { processFile } from "../../services/protectedFileUpload.js";

import { nanoid } from "nanoid";

import Errors from "../Errors";

import styles from "./createpricharform.module.css";

const defaultValues = { charId: '', avatar: '', character_name: '', character_label: '', book_id: '' };


const CreatePriCharForm = ({ bookId, update=false, payload=defaultValues, closeModal }) => {
  const { charId, avatar, character_name, character_label, book_id } = payload;
  const [avatarUrl, setAvatarUrl] = useState(avatar);
  const [charname, setCharname] = useState(character_name);
  const [charlabel, setCharlabel] = useState(character_label);
  const [urlpreview, setUrlPreview] = useState(null);

  const dispatch = useDispatch();










  const onSubmit = async event => {
    event.preventDefault();
    const result = await dispatch(thunk_createPriChar({ bookId, urlpreview, charname, charlabel }));
    if (result){
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



  const onUpdate = async event => {
    event.preventDefault();
    const result = await dispatch(thunk_updatePriChar({ urlpreview, charname, charlabel, bookId: book_id, charId }));
    if (result) {
      closeModal();
    }

  }



  if (update) {
    return (
      <>


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
      <Errors />

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
