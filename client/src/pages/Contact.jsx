import { useState } from "react"
import { UseAuth } from "../store/auth"

// hm ise isliye bna rhe h bs qki yh baar baar use ho rha h islie isko ek variable me store krdia h.
const defaultContactFormData = {
    username: "",
    email: "",
    message: ""
}

export const Contact = () => {
    const [contact, setContact] = useState(defaultContactFormData)

    const [userData, setUserData] = useState(true)

    const { user } = UseAuth()

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        })

        setUserData(false)
    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:5000/api/form/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            })

            if (response.ok) {
                setContact(defaultContactFormData)
                const data = await response.json()
                console.log(data)
                alert("Message send successfully")
            } 
        } catch (error) {
            alert("Message not send")
            console.log(error)
        }

    }

    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Contact Us</h1>
                </div>

                <div className="container grid grid-two-cols">
                    <div className="contact-image">
                        <img src="/images/support.png" alt="contact" width="450" height="450" />
                    </div>

                    <div className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input type="text" name="username" id="username" autoComplete="off" required value={contact.username} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" id="email" autoComplete="off" required value={contact.email} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="message">message</label>
                                <textarea name="message" id="message" autoComplete="off" value={contact.message} onChange={handleInput} required cols="30" rows="6"></textarea>
                            </div>
                            <div>
                                <button type="Submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <section className="mb-3">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3491.2621158285165!2d77.72840357496854!3d28.94994906959678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c6500237a1d19%3A0x6dbbda753063d6e8!2sAH%20Collection%E2%80%99s%20Meerut!5e0!3m2!1sen!2sin!4v1730564951928!5m2!1sen!2sin" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </section>
            </section>
        </>
    )
}