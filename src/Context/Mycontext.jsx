import React, { createContext, useState } from 'react'
export const UserContext = createContext();

const Mycontext = ({children}) => {

  const [loading, setLoading] = useState(false);
   
  const name = "Nishi";

  return (
    <UserContext.Provider value={{
      loading,
      setLoading,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default Mycontext