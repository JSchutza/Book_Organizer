import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideModal } from "../../store/actions/modal.js";
import { thunk_getAllPriChars } from "../../store/thunks/books.js";
import { processFile } from "../../services/protectedFileUpload.js";




const CreatePriCharForm = ({ bookId, update=false, data }) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [charname, setCharname] = useState("");
  const [charlabel, setCharlabel] = useState("");
  const [urlpreview, setUrlPreview] = useState(null);


  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();


  useEffect(() => {
    const errors = [];
    if (true) {
      errors.push('message here');
    }
    if (true) {
      errors.push('message here');
    } else if (true) {
      errors.push('message here');
    }
    setErrors(errors);
  }, [urlpreview]);





  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", urlpreview);
    formData.append("charactername", charname);
    formData.append("characterlabel", charlabel);

    const res = await fetch(`/api/book/${bookId}/character`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      dispatch(thunk_getAllPriChars(bookId));
      dispatch(hideModal());

    } else {
      console.log("error");
    }

  };



  const updateAvatar = (e) => {
    const result = processFile(e.target.files);
    if (result) {
        setUrlPreview(result);
        setAvatarUrl(URL.createObjectURL(result));
    } else return;

  };






  const cancelImgChoice = () => {
    setUrlPreview(null);
    setAvatarUrl('');
  }



  const onUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", urlpreview);
    formData.append("charactername", charname);
    formData.append("characterlabel", charlabel);

    const res = await fetch(`/api/book/${bookId}/character/${data.charId}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      dispatch(thunk_getAllPriChars(bookId));
      dispatch(hideModal());

    } else {
      console.log("error");
    }

  }



  if (update) {
    return (
      <>
        {/* for previewing the image before it is sent to backend */}
        <div>
          {urlpreview === null ?
            <p></p>
            :
            <>
              <img src={avatarUrl} />
              <button onClick={cancelImgChoice}> Cancel </button>
            </>
          }
        </div>


        <div>
          <form className='' onSubmit={onUpdate}>

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

      {/* for previewing the image before it is sent to backend */}
      <div>
        {urlpreview === null ?
          <p></p>
          :
          <>
            <img src={avatarUrl} />
            <button onClick={cancelImgChoice}> Cancel </button>
          </>
        }
      </div>


      <div>
        <form className='' onSubmit={onSubmit}>

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
