import React, { createContext, useState } from 'react'

//Create Login Context & Login Provider
export const LoginContext = createContext();

export const LoginProvider = ({children}) => {
    const [login, setLogin] = useState(false);

    return(
        <LoginContext.Provider value={[login, setLogin]}>
            {children}
        </LoginContext.Provider>
    )
}

//Create Registered Context & Registered Provider
export const RegisteredContext = createContext();

export const RegisteredProvider = ({children}) => {
    const [registered, setRegistered] = useState(false)

    return(
        <RegisteredContext.Provider value={[registered, setRegistered]}>
            {children}
        </RegisteredContext.Provider>
    )
}

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(false);

  return (
    <AlertContext.Provider value={[alert, setAlert]}>
      {children}
    </AlertContext.Provider>
  );
};