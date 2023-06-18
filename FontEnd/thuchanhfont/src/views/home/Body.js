import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faStar } from "@fortawesome/free-solid-svg-icons";

const Body = () => {
    return (
        <>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        <div className="col mb-5">
                            <div className="card h-100">
                                {/* <!-- Sale badge--> */}
                                <div className="badge bg-dark text-white position-absolute" style={{ top: 0.5 + "rem", right: 0.5 + "rem" }}>Sale</div>
                                {/* <!-- Product image--> */}
                                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                {/* <!-- Product details--> */}
                                <div className="card-body p-3">
                                    <div className="text-start">
                                        {/* <!-- Product name--> */}
                                        <h5 className="fw-bolder">Special Item</h5>
                                        <p>Hahahah</p>
                                        {/* <!-- Product reviews--> */}
                                        <div className="d-flex justify-content-center small text-warning mb-2">
                                            <FontAwesomeIcon icon={faStar} style={{ color: "#e4f500" }} size="lg" />
                                        </div>
                                        {/* <!-- Product price--> */}
                                        <span className="text-muted text-decoration-line-through">$20.00</span>
                                        $18.00
                                    </div>
                                </div>
                                {/* <!-- Product actions--> */}
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex d-flex justify-content-around">
                                    <div className=""><a className="btn btn-outline-info" href="#">Show</a></div>
                                    <div className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faCartPlus} style={{ color: "blue" }} size='lg' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Body;