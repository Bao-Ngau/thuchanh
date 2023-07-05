import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Body = (props) => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(4);
    const [dataBooks, setDataBook] = useState();
    useEffect(() => {
        getBook(page, size);
    }, [page]);

    const handlePageClick = (e) => {
        setPage(e.selected);
    }

    const getBook = (page, size) => {
        axios.get(
            `http://localhost:8081/book/${page}/${size}`
        ).then((response) => {
            setDataBook(response.data);
        }).catch(() => {
            console.log("lỗi get home book");
        })
    }
    return (
        <>
            <h3>Tổng số sách đáng bán</h3>
            <section className="">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {dataBooks && dataBooks.content.map((value, index) => {
                            return (
                                <div className="col mb-5" key={index}>
                                    <div className="card">
                                        <div className="badge bg-dark text-white position-absolute" style={{ top: 0.5 + "rem", right: 0.5 + "rem" }}>Sale</div>
                                        <img className="card-img-top" style={{ width: "100%", height: "270px" }} src={"./" + (value.imagefile).slice(68)} alt="..." />
                                        <div className="card-body p-3">
                                            <div className="text-start">
                                                <h5 className="fw-bolder">Special Item</h5>
                                                <p>Hahahah</p>
                                                <div className="d-flex justify-content-center small text-warning mb-2">
                                                    <FontAwesomeIcon icon={faStar} style={{ color: "#e4f500" }} size="lg" />
                                                </div>
                                                <span className="text-muted text-decoration-line-through">$20.00</span>
                                                $18.00
                                            </div>
                                        </div>
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex d-flex justify-content-around">
                                            <div className=""><a className="btn btn-outline-info" href="#">Show</a></div>
                                            <div className="btn btn-outline-danger">
                                                <FontAwesomeIcon icon={faCartPlus} style={{ color: "blue" }} size='lg' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="d-flex justify-content-center">
                        <ReactPaginate
                            nextLabel="Tiếp"
                            onPageChange={(e) => handlePageClick(e)}
                            pageRangeDisplayed={3}//số hiển thị ở giữa
                            marginPagesDisplayed={2}//số cái hiện thị đầu cuối
                            pageCount={dataBooks ? dataBooks.totalPages : 0}
                            previousLabel="Trở về"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
export default Body;