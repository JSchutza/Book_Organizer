import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { thunk_updatePriChar, thunk_createPriChar } from "../../store/thunks/books.js";
import { processFile } from "../../services/protectedFileUpload.js";



import Errors from "../Errors";
import ImgPreview from "../ImgPreview";


import styles from "./createpricharform.module.css";

const defaultValues = { charId: '', avatar: '', character_name: '', character_label: '', book_id: '' };


const CreatePriCharForm = ({ bookId, update=false, payload=defaultValues, closeModal }) => {
  const { charId, avatar, character_name, character_label, book_id } = payload;
  const [ imgModal, setImgModal ] = useState(false);
  const [ avatarUrl, setAvatarUrl ] = useState(avatar);
  const [ charname, setCharname ] = useState(character_name);
  const [ charlabel, setCharlabel ] = useState(character_label);
  const [ urlpreview, setUrlPreview ] = useState(null);

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
      <ImgPreview
        urlpreview={urlpreview}
        cancelImgChoice={cancelImgChoice}
        avatarUrl={avatarUrl}
        openModal={imgModal}
        setOpenModal={setImgModal}
      />

        <form className={styles.create_char_container} onSubmit={onSubmit}>

          <label>Pick an Avatar</label>
            <input id='file' className="" type="file" accept="image/*" onChange={updateAvatar} />


          <label>Character Name</label>
            <input
              type='text'
              name='character name'
              value={charname}
              onChange={(e) => setCharname(e.target.value)}
            />


          <label>Character Label</label>
          <input
              type='text'
              name='character label'
              value={charlabel}
              onChange={(e) => setCharlabel(e.target.value)}
            />

          <button type='submit'> Create </button>

        </form>
    </>
  )
};

export default CreatePriCharForm;
