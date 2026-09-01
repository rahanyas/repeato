import { createContext, useContext, useState } from "react";


const MessageContext = createContext();

export const MessageProvider = ({children}) => {

  const [message, setMessage] = useState({
    text : '',
    type : ''
  });

  const showMessage = (text, type) => {
    console.log('show message : ', type, text)
    setMessage({
      text, 
      type
    })
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
        clearMessage
      }}
    >
     {children}
    </MessageContext.Provider>
  )
};


export const useMessage = () => {
  return useContext(MessageContext)
};


