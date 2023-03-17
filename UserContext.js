import { createContext, useContext, useState } from "react"

const UserContext = createContext()

export const useUserContext = () => useContext(UserContext)
export const useUser = () => useContext(UserContext).user

export const UserContextProvider = ({ children, user: initialUser }) => {
  const [user, setUser] = useState(initialUser)

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
