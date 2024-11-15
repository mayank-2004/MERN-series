export const Home = () => {
    return (
        <>
            <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            <p>We are the World Best IT Company</p>
                            <h1>Welcome to Mern Series</h1>
                            <p>Are you ready to take your business to the next level with
                                cutting-edge IT solutions? Look no further! At Thapa Technical,
                                we specialize in providing innovative IT services and solutions
                                tailored to meet your unique needs.</p>
                            <div className="btn btn-group">
                                <a href="/contact"><button className="btn">Connect Now</button></a>
                                <a href="/contact"><button className="btn secondary-btn">Learn More</button></a>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img src="/images/home.png" alt="Home" height="400" width="450" />
                        </div>
                    </div>
                </section>
            </main>

            <section className="section-analytics">
                <div className="container grid grid-four-cols">
                    <div className="div1">
                        <h2>50+</h2>
                        <p>Registerd companies</p>
                    </div>
                    <div className="div1">
                        <h2>10,000+</h2>
                        <p>happy clients</p>
                    </div>
                    <div className="div1">
                        <h2>500+</h2>
                        <p>well known developers</p>
                    </div>
                    <div className="div1">
                        <h2>24/7</h2>
                        <p>service</p>
                    </div>
                </div>
            </section>

            <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-image">
                            <img src="/images/design.png" alt="Home" height="400" width="450" />
                        </div>
                        <div className="hero-content">
                            <p>We are here to help you</p>
                            <h1>Get Started Today</h1>
                            <p> Ready to take the first step towards a more efficient and secure
                                IT infrastructure? Contact us today for a free consultation and
                                let's discuss how Thapa Technical can help your business thrive in
                                the digital age.</p>
                            <div className="btn btn-group">
                                <a href="/contact"><button className="btn">Connect Now</button></a>
                                <a href="/contact"><button className="btn secondary-btn">Learn More</button></a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}