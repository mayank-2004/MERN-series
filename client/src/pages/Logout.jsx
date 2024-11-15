import { useEffect } from "react"
import {Navigate} from "react-router-dom"
import { UseAuth } from "../store/auth"

export const Logout = () =>{
    const {LogoutUser} = UseAuth()
    useEffect(() => {
        LogoutUser()
    }, [LogoutUser])
    
    return <Navigate to="/login" /> 
}