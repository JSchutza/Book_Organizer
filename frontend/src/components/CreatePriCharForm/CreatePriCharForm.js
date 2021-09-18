import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useHistory } from "react-router-dom";
import { thunk_updatePriChar, thunk_createPriChar } from "../../store/thunks/books.js";
import { processFile } from "../../services/protectedFileUpload.js";
import { nanoid } from "nanoid";
import styles from "./createpricharform.module.css";





const CreatePriCharForm = ({ bookId, update=false, data }) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [charname, setCharname] = useState("");
  const [charlabel, setCharlabel] = useState("");
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





  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(thunk_createPriChar({ bookId, urlpreview, charname, charlabel }));
    history.push(`/books/${bookId}`);
  };




  const updateAvatar = (e) => {
    const result = processFile(e.target.files);
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



  const onUpdate = async (event) => {
    event.preventDefault();
    dispatch(thunk_updatePriChar({ urlpreview, charname, charlabel, bookId, charId: data.charId }));

    history.push(`/books/${bookId}`);
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
          {urlpreview === null ?
            <p></p>
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
          <p></p>
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
