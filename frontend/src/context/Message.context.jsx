import { createContext, useContext, useState } from "react";


const MessageContext = createContext();

export const MessageProvider = ({children}) => {

  const [message, setMessage] = useState({
    text : '',
    type : ''
  });

  const [logedInStatus, setLogedInStaus] = useState(false);

  const setLogedIn = (status) => {
    setLogedInStaus(status);
  }

  const showMessage = (text, type) => {
    setMessage({
      text, 
      type
    });

    setTimeout(() => {
       setMessage({
        text : '',
        type : ''
       });
    }, 3000);
  };

  const clearMessage = () => {
    setMessage({
      text : '',
      type: ''
    })
  };

  return(
    <MessageContext.Provider 
     value={{
        message,
        showMessage,
        clearMessage,
        logedInStatus,
        setLogedIn
      }}
    >
     {children}
    </MessageContext.Provider>
  )
};


export const useMessage = () => {
  return useContext(MessageContext)
};


