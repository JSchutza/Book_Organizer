import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { hideModal } from "../../store/actions/modal.js";
import { thunk_getAllCharacters } from "../../store/thunks/characters.js";









const CreateCharacterForm = () => {
  const [ avatarUrl, setAvatarUrl ] = useState("");
  const [ charname, setCharname ] = useState("");
  const [ charlabel, setCharlabel ] = useState("");
  const [ urlpreview, setUrlPreview ] = useState(null);
  const [ errors, setErrors ] = useState([]);
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


  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", urlpreview);
    formData.append("charactername", charname);
    formData.append("characterlabel", charlabel);

    const res = await fetch("/api/characters", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      dispatch(hideModal());
      dispatch(thunk_getAllCharacters());
    } else {
      console.log("error");
    }

  };



  const updateAvatar = (e) => {
    const file = e.target.files[0];
    setUrlPreview(file);
    setAvatarUrl(URL.createObjectURL(file));
  };


  const cancelImgChoice = () => {
    setUrlPreview(null);
    setAvatarUrl('');
  }


  return (
    <>
      {/* <ul className=''>
      {errors.map(error => ( <li key={error}> { error } </li> )) }
      </ul> */}

      {/* for previewing the image before it is sent to backend */}
      <div>
        {urlpreview === null ?
        <p></p>
        :
        <>
          <img src={avatarUrl}/>
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
