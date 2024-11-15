import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/auth/register"

export const Register = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
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
            const Response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            
            const res_data = await Response.json()
            console.log("data from server",res_data.extradetails)

            if (Response.ok) {
                // storing the token in localhost
                storeTokenInLS(res_data.token)
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: ""
                })
                toast.success("Registration Successful")
                navigate("/")
            }else{
                toast.error(res_data.extradetails ? res_data.extradetails : res_data.message)
            }
        } catch (error) {
            console.log("register", error)
        }
    }
    return (
        <>
            <section>
                <main>
                    <div className="registration-section">
                        <div className="container grid grid-two-cols">
                            <div className="image-registration">
                                <img src="/images/register.png" alt="Not Found" height="450" width="450" />
                            </div>

                            {/* let's tackle registration form */}
                            <div className="registration-form">
                                <h1 className="main-heading">Registration Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">username</label>
                                        <input type="text" name="username" id="username" placeholder="Enter your username" required autoComplete="off" onChange={handlechange} value={user.username} />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="text" name="email" id="email" placeholder="Enter your email" required autoComplete="off" onChange={handlechange} value={user.email} />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input type="Number" name="phone" id="phone" placeholder="Enter your phone" required autoComplete="off" onChange={handlechange} value={user.phone} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" id="password" placeholder="Enter your password" required autoComplete="off" onChange={handlechange} value={user.password} />
                                    </div>
                                    <button className="btn btn-section">Register Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}
