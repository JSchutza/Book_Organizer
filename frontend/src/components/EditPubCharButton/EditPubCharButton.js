
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';






const EditPubCharButton = ({ charId }) => {
  const [ showForm, setShowForm ] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [charname, setCharname] = useState("");
  const [charlabel, setCharlabel] = useState("");
  const [urlpreview, setUrlPreview] = useState(null);

  const dispatch = useDispatch();


  const handleClick = event => {
    event.preventDefault();
    setShowForm(true);
  }


  const updateAvatar = (e) => {
    const file = e.target.files[0];
    setUrlPreview(file);
    setAvatarUrl(URL.createObjectURL(file));
  };



  const onSubmit = event => {
    event.preventDefault();
  }


  const cancelImgChoice = () => {
    setUrlPreview(null);
    setAvatarUrl('');
  }




  if (showForm === true){
    return (
      <>

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
  }





  return (
    <>
    <div>
        <a href='/' onClick={(event) => handleClick(event)}>
        Update
      </a>
    </div>
    </>
  )
};

export default EditPubCharButton;
