import { useState, useEffect, useContext, createContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const SocialContext = createContext(null)
export const useStateProvider = () => useContext(SocialContext)

const StateProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        AsyncStorage.multiGet(['token', 'user'])
            .then(res => {
                setToken(res[0][1])
                setUser(JSON.parse(res[1][1]))
            })
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <SocialContext.Provider value={{
            token,
            user,
            isLoading,
            setToken,
            setUser,
            setIsLoading,
        }}>
            {children}
        </SocialContext.Provider>
    )
}

export default StateProvider