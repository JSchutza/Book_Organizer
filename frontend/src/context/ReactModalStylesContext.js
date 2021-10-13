import { createContext, useContext, useState } from 'react';


const ModalStyleContext = createContext();
const useModalStyle = () => useContext(ModalStyleContext);




const ModalStyleProvider = ({ children }) => {


  const defaultValue = {
    overlay: {
      position: 'fixed',
      backgroundColor: 'transparent'
    },
    content: {
      position: 'relative',
      display: 'flex',
      inset: '16vw 0vw 0vw 0vw',
      background: '#1f1f35',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      border: 'transparent',
      width: 'auto',
      padding: '30px',
      flexFlow: 'column nowrap',
      placeContent: 'center',
      alignItems: 'center',
    }
  };



  const [ currentStyle, setCurrentStyle ] = useState(defaultValue);


  // updateStyle('content', 'width', '10vw');
  const updateStyle = (firstKey, secondKey, newValue='') => {
    let existedVal = defaultValue?.[firstKey]?.[secondKey];
    if (existedVal === undefined) {
      return;
    } else {
      const newStyle = {
        ...currentStyle,
          [firstKey]: { ...currentStyle[firstKey], [secondKey]: `${newValue}` },
      };

      setCurrentStyle(newStyle);
    }
  };



  const initImgPreviewStyle = () => {
    const imgPreviewStyle = {
      overlay: {
        position: 'fixed',
        backgroundColor: 'transparent'
      },
      content: {
        position: 'relative',
        display: 'flex',
        inset: '3vw 0vw 10vw 65vw',
        background: '#1f1f35',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        border: 'transparent',
        width: '30vw',
        padding: '20px',
        flexFlow: 'column nowrap',
        placeContent: 'center flex-start',
        alignItems: 'center',
      }
    };
    setCurrentStyle(imgPreviewStyle);
  }




  const characterFormStyle = {
    overlay: {
      position: 'fixed',
      backgroundColor: 'transparent'
    },
    content: {
      position: 'absolute',
      display: 'flex',
      inset: '2vw 15vw 2vw 15vw',
      background: '#1f1f35',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      border: 'transparent',
      flexFlow: 'column nowrap',
      placeContent: 'center',
      alignItems: 'center',
    }
  };



  return (
    <ModalStyleContext.Provider value={
      {
        currentStyle,
        updateStyle,
        setCurrentStyle,
        initImgPreviewStyle,
        defaultStyle: defaultValue,
        characterFormStyle,
      }

    } >

      {children}
    </ModalStyleContext.Provider>
  );
};




// exports here:
export {
  useModalStyle,
  ModalStyleProvider,

};
