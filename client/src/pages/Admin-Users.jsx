import { useEffect, useState } from "react"
import { UseAuth } from "../store/auth"
import {Link} from "react-router-dom"

export const AdminUsers = () => {

    const {authorizationToken} = UseAuth()
    const [users, setUsers] = useState([])

    const getAllUsersData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            })

            const Data = await response.json()
            console.log(Data)
            setUsers(Data)

        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken
                }
            });
            const Data = await response.json()
            console.log(`users after delete: ${Data}`)

            if(response.ok){
                getAllUsersData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllUsersData()
    }, [])


    return (
        <>
        <section className="admin-users-section">
            <div className="container">
                <h1>Admin Users Panel</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((CurEle, index) => {
                            return (
                                <tr key={index}>
                                    <td>{CurEle.username}</td>
                                    <td>{CurEle.email}</td>
                                    <td>{CurEle.phone}</td>
                                    <td><Link to={`/admin/users/${CurEle._id}/edit`}>Edit</Link></td>
                                    <td><button onClick={() => deleteUser(CurEle._id)}>Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
        </>
    )
}