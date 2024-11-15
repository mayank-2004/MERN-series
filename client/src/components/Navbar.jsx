import { NavLink } from "react-router-dom"
import "./Navbar.css";
import { UseAuth } from "../store/auth";

export const Navbar = () => {
    const { isLoggedIN } = UseAuth()
    return (
        <>
            <header>
                <div className="container">
                    <div className="Logo-brand">
                        <NavLink to="/">Mern-Series</NavLink>
                    </div>

                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            <li><NavLink to="/service">Service</NavLink></li>
                            {isLoggedIN ?
                                <li><NavLink to="/logout">Logout</NavLink></li> :
                                <>
                                    <li><NavLink to="/login">Login</NavLink></li>
                                    <li><NavLink to="/register">Register</NavLink></li>
                                </>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}