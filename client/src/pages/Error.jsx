import { NavLink } from "react-router-dom"

export const Error = () => {
    return (
        <>
            <section id="error-page">
                <div className="error">
                    <h1 className="header">404</h1>
                    <h4>Sorry Page Not Found</h4>
                    <p> Oops! It seems like the page you're trying to access doesn't exist.
                        If you believe there's an issue, feel free to report it, and we'll
                        look into it.</p>
                    <div className="btns">
                        <NavLink to="/">RETURN HOME</NavLink>
                        <NavLink to="/contact">REPORT PROBLEM</NavLink>
                    </div>
                </div>
            </section>
        </>
    )
}