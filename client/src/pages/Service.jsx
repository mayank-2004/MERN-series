import { UseAuth } from "../store/auth"

export const Service = () => {

    const { servicesData } = UseAuth()

    return (
        <section className="section-container">
            <div className="heading-container">
                <h1 className="main-heading">Services</h1>
            </div>

            <div className="container grid grid-three-cols">
                {servicesData.map((value, index) => {
                    const { price, provider, service, description } = value;

                    return (
                        < div className="card" key={index}>
                            <div className="card-img">
                                <img src="/images/design.png" alt="services" width="250" />
                            </div>

                            <div className="card-details">
                                <div className="grid grid-two-cols">
                                    <p>{provider}</p>
                                    <p>{price}</p>
                                </div>
                                <h2>{service}</h2>
                                <p>{description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section >
    )
}