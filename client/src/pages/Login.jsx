import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/auth/login"

export const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const {storeTokenInLS} = UseAuth()

    // handling the input values
    const handlechange = (e) => {
        console.log(e)
        const name = e.target.name
        const value = e.target.value
        setUser({ ...user, [name]: value })
    }

    // handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(user)

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            console.log("login form",response)

            const res_data = await response.json()

            if(response.ok){
                // console.log("data from server",res_data)
                // storing the data in local storage
                storeTokenInLS(res_data.token)
                setUser({
                    email: "",
                    password: ""
                })
                toast.success("Login Successful")
                navigate("/")
            }else{
                toast.error(res_data.extradetails ? res_data.extradetails : res_data.message)
                console.log("invalid credentials")
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <section>
                <main>
                    <div className="login-section">
                        <div className="container grid grid-two-cols">
                            <div className="image-login">
                                <img src="/images/login.png" alt="Not Found" height="450" width="450" />
                            </div>

                            {/* let's tackle login form */}
                            <div className="login-form">
                                <h1 className="main-heading">Login Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="text" name="email" id="email" placeholder="Enter your email" required autoComplete="off" onChange={handlechange} value={user.email} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" id="password" placeholder="Enter your password" required autoComplete="off" onChange={handlechange} value={user.password} />
                                    </div>
                                    <button className="btn btn-section">Login Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}