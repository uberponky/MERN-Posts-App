import { useState, createContext } from "react";

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: localStorage.getItem('email'),
    posts: []
  })

  return (
  <UserContext.Provider value={{ user, setUser }}>
    { children }
  </UserContext.Provider>
  )
}

export { UserContext, UserProvider }