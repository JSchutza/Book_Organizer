
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideModal } from "../../store/actions/modal.js";
import { thunk_searchForUsersPubChars } from "../../store/thunks/characters.js";
import { nanoid } from "nanoid";




const EditPubCharButton = ({ charId, search_id }) => {
  const [ avatarUrl, setAvatarUrl ] = useState("");
  const [ charname, setCharname ] = useState("");
  const [ charlabel, setCharlabel ] = useState("");
  const [ urlpreview, setUrlPreview ] = useState(null);
  const [ errors, setErrors ] = useState([]);

  const dispatch = useDispatch();


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



  const updateAvatar = (e) => {
    const file = e.target.files[0];
    setUrlPreview(file);
    setAvatarUrl(URL.createObjectURL(file));
  };



  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", urlpreview);
    formData.append("charactername", charname);
    formData.append("characterlabel", charlabel);

    const res = await fetch(`/api/characters/${charId}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      dispatch(hideModal());
      dispatch(thunk_searchForUsersPubChars(search_id));
    } else {
      console.log("error");
    }

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

        <div>
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
        <form className='' onSubmit={onSubmit}>

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

export default EditPubCharButton;
