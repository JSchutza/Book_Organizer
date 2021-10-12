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
      height: '70vh',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignContent: 'center',
      justifyContent: 'center',
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
        position: 'absolute',
        inset: '6vw 0vw 10vw 75vw',
        background: '#1f1f35',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        border: 'transparent',
        width: '10vw'
      }
    };
    setCurrentStyle(imgPreviewStyle);
  }



  return (
    <ModalStyleContext.Provider value={
      {
        currentStyle,
        updateStyle,
        setCurrentStyle,
        initImgPreviewStyle,
        defaultStyle: defaultValue
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
