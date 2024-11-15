import { Navigate, NavLink, Outlet } from "react-router-dom"
import { FaUser } from "react-icons/fa";
import { MdContactPage } from "react-icons/md";
import { PiNotebookBold } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { UseAuth } from "../../store/auth";

export const AdminLayout = () => {

    const { user, isLoading } = UseAuth()
    // Initially user me data empty h jiski vjh se console me admin-layout hi srf print ho rha h. isiliye jb tk user ka data nhi aa jata hm kch loading type show krege uske bd user ki value check krege.
    console.log("admin-layout", user)

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!user.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <header>
                <div className="admin">
                    <nav>
                        <ul>
                            <li><NavLink to="/admin/users"><FaUser />Users</NavLink></li>
                            <li><NavLink to="/admin/contacts"><MdContactPage />Contacts</NavLink></li>
                            <li><NavLink to="/service"><PiNotebookBold />Services</NavLink></li>
                            <li><NavLink to="/"><FaHome />Home</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
            {/* outlet nested routes ke inner routes ka data frontend pe show krne ke liye show kia jata h. */}
            <Outlet />
        </>
    )
}