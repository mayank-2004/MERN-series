import { useEffect, useState } from "react"
import { UseAuth } from "../store/auth"
import { toast } from "react-toastify"

export const AdminContacts = () => {

    const [contactData, setContactData] = useState([])
    const { authorizationToken } = UseAuth()

    const getContactData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            const data = await response.json();
            console.log("contact data: ", data)

            if (response.ok) {
                setContactData(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken
                },
            })

            if (response.ok) {
                getContactData();
                toast.success("Contact updated successfully")
            } else {
                toast.error("Contact not updated")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getContactData()
    }, [])

    return (
        <>
            <section className="admin-contacts-section">
                <h1>Admin Contact Data</h1>

                <div className="container admin-users">
                    {contactData.map((CurContact, index) => {
                        const { username, email, message, _id } = CurContact;

                        return (
                            <div key={index}>
                                <p>{username}</p>
                                <p>{email}</p>
                                <p>{message}</p>
                                <button className="btn" onClick={() => deleteContact(_id)}>Delete</button>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    )
}