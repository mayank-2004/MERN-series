import { UseAuth } from "../store/auth"

export const About = () => {
    const { user } = UseAuth()
    return (
        <>
            <main>
                <section className="section-about">
                    <div className="container grid grid-two-cols">
                        <div className="about-content">
                            <p>Welcome, {user ? `${user.username} to our webiste` : ` to our website`}</p>
                            <h1>Why Chooose Us?</h1>
                            <p>
                                Expertise: Our team consists of experienced IT professionals who
                                are passionate about staying up-to-date with the latest industry
                                trends.
                            </p>
                            <p>
                                Customization: We understand that every business is unique.
                                Thats why we create solutions that are tailored to your specific
                                needs and goals.
                            </p>
                            <p>
                                Customer-Centric Approach: We prioritize your satisfaction and
                                provide top-notch support to address your IT concerns.
                            </p>
                            <p>
                                Affordability: We offer competitive pricing without compromising
                                on the quality of our services.
                            </p>
                            <p>
                                Reliability: Count on us to be there when you need us. We're
                                committed to ensuring your IT environment is reliable and
                                available 24/7.
                            </p>
                            <div className="btn btn-group">
                                <a href="/contact"><button className="btn">Connect Now</button></a>
                                <a href="/services"><button className="btn secondary-btn">Learn More</button></a>
                            </div>
                        </div>
                        <div className="about-image">
                            <img src="/images/about.png" alt="about" height="500" width="500" />
                        </div>
                    </div>
                </section>
            </main>

            <section className="about">
                <div className="container grid grid-four-cols">
                    <div className="div1">
                        <h2>50+</h2>
                        <p>Registerd companies</p>
                    </div>
                    <div className="div1">
                        <h2>150+</h2>
                        <p>projects done</p>
                    </div>
                    <div className="div1">
                        <h2>250+</h2>
                        <p>happy clients</p>
                    </div>
                    <div className="div1">
                        <h2>650k+</h2>
                        <p>youtube subscribers</p>
                    </div>
                </div>
            </section>
        </>
    )
}