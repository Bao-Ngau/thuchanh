import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Body = (props) => {
    const [page, setPage] = useState(0);
    const [size,] = useState(4);

    useEffect(() => {
        props.getBook(page, size);
    }, [page]);
    const handlePageClick = (e) => {
        setPage(e.selected);
    }

    const handOnClickAddCart = async (id) => {
        const userName = props.userName ? props.userName : null;
        if (!userName) {
            toast.error("Bạn hãy đăng nhập trước khi mua hàng");
            return;
        }
        await axios.post(
            `http://localhost:8081/order/add/${userName}/${id}`
        ).then((response) => {
            console.log(response.data.books.id);
            toast.success("bạn đã thêm sách vào giỏ hàng");
            if (id === response.data.books.id) {
                props.addToCart(response.data, "equal");
            } else {
                props.addToCart(response.data, "unequal");
            }
        }).catch(() => {
            console.log("thêm sách vào giỏ hàng thất bại");
        })
    }
    return (
        <>
            <h3>Tổng số sách đáng bán</h3>
            <section className="">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {props.dataBooks && props.dataBooks.content.map((value, index) => {
                            return (
                                <div className="col mb-5" key={index}>
                                    <div className="card">
                                        <div className="badge bg-dark text-white position-absolute" style={{ top: 0.5 + "rem", right: 0.5 + "rem" }}>
                                            Sale: {((value.sale / value.price) * 100).toFixed(2)}%
                                        </div>
                                        <img className="card-img-top" style={{ width: "100%", height: "270px" }} src={"./" + (value.imagefile).slice(68)} />
                                        <div className="card-body p-2">
                                            <div className="text-start">
                                                <h5 className="fw-bolder">{value.name}</h5>
                                                {/* <div className="d-flex justify-content-center small text-warning mb-2">
                                                    <FontAwesomeIcon icon={faStar} style={{ color: "#e4f500" }} size="lg" />
                                                </div> */}
                                                <div className="d-flex">
                                                    <span className="original-price-home">{value && value.price.toLocaleString("vi-VN")} đ</span>
                                                    <span className="discount-percentage-home">-{value && ((value.sale / value.price) * 100).toFixed(2)}%</span>
                                                </div>
                                                <div className="original-price-end-home">-&gt;{value && value.priceend.toLocaleString("vi-VN")} đ</div>
                                                <div>Thể loại: {value.category.name}</div>
                                            </div>
                                        </div>
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex d-flex justify-content-around">
                                            <div className="">
                                                <Link className="btn btn-outline-info" to={`/detail/${value.id}`}>Show</Link>
                                            </div>
                                            <div className="btn btn-outline-danger" onClick={() => handOnClickAddCart(value.id)}>
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
                            pageCount={props.dataBooks ? props.dataBooks.totalPages : 0}
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