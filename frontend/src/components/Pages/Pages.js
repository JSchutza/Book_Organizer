import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";



const Pages = () => {
  const dispatch = useDispatch();
  const pageInfo = useSelector((store) => store.pageReducer.pages)
  const [specificPage, setSpecificPage] = useState(false);
  const [pageId, setPageId] = useState(false);




  const showSpecificPage = (event, the_page_id) => {
    event.preventDefault();
    setPageId(the_page_id);
    setSpecificPage(true);
  }



  if (pageInfo === undefined || pageInfo === null) {
    return (
      <>
        <h1>Loading Page information...</h1>
      </>
    )
  }


  return (
    <>
      <div>
        <h1>Your Pages</h1>
        {Object.values(pageInfo).map(eachPage => (
          <>
            <a href='/' onClick={(event) => showSpecificPage(event, eachPage.id)}>
              <li key={eachPage.id}>

                <h3>{eachPage.title}</h3>
                <br />
                <p>{eachPage.text}</p>

              </li>
            </a>
          </>
        ))
        }
      </div>
    </>
  )
};




export default Pages;
