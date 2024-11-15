import { createContext, useContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [servicesData, setServicesData] = useState([])

    const authorizationToken = `Bearer ${token}`

    // function to store the token in local storage
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken)
    };

    let isLoggedIN = !!token
    console.log("isLoggedIN ", isLoggedIN)

    // tackling the logout functionality
    const LogoutUser = () => {
        setToken("")
        return localStorage.removeItem("token")
    }

    // JWT authentication - to get the currently logged in user data
    const userAuthentication = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                },
            });

            if (response.ok) {
                const data = await response.json()
                console.log("user data", data.userData)
                setUser(data.userData)
                setIsLoading(false)
            }else{
                console.log("error fetching user data while loading")
                setIsLoading(false)
            }
        } catch (error) {
            console.error("Error fetchung user data")
        }
    }

    // to fetch the services data from the database 
    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/data/service", {
                method: "GET",
            });

            if(response.ok){
                const data = await response.json()
                console.log(data.message)
                setServicesData(data.message)
            }
            console.log(response)
        } catch (error) {
            console.log(`Error from Service page: ${error}`)
        }
    }

    useEffect(() => {
        getServices()
        userAuthentication()
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIN, storeTokenInLS, LogoutUser, user, servicesData, authorizationToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => {
    const useContextValue = useContext(AuthContext)
    if (!useContextValue) {
        throw new Error("UseAuth used outisde of the provider")
    }
    return useContextValue;
}