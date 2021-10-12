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
      position: 'absolute',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      background: '#1f1f35',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      border: 'transparent',
      width: '35vw'
    }
  };

  const [ currentStyle, setCurrentStyle ] = useState(defaultValue);


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




  return (
    <ModalStyleContext.Provider value={
      {
        currentStyle,
        updateStyle
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
