import Navv from "../Navv"
import Footer from "../Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../../styles/detail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Details = (props) => {

    const [dataCategorys, setDataCategorys] = useState();
    const [dataAuthors, setDataAuthors] = useState();
    const [dataBook, setDataBook] = useState();

    const { bookID } = useParams();
    useEffect(() => {
        document.title = "Thông tin sách";
        getAllCategorys();
        getAllAuthors();
        getBookById(bookID)
    }, []);

    const getAllCategorys = async () => {
        await axios.get(
            `http://localhost:8081/category/get`
        ).then((response) => {
            setDataCategorys(response.data);
        }).catch(() => {
            console.log("lỗi get home category");
        })
    };
    const getAllAuthors = async () => {
        await axios.get(
            `http://localhost:8081/author/get`
        ).then((response) => {
            setDataAuthors(response.data)
        }).catch(() => {
            console.log("lỗi get home category");
        })
    };

    const getBookById = async (id) => {
        await axios.get(
            `http://localhost:8081/book/getbyid/${id}`
        ).then((response) => {
            setDataBook(response.data);
        }).catch(() => {
            console.log("lỗi get home category");
        })
    };
    return (
        <>
            <Navv
                setIsLogin={props.setIsLogin ? props.setIsLogin : null}
                dataCategorys={dataCategorys}
                dataAuthors={dataAuthors}
            />
            <div className="container my-5">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">{dataBook && dataBook.name}</h3>
                        <div className="row">
                            <div className="col-lg-5 col-md-5 col-sm-6">
                                <div className="white-box text-center">
                                    <img src="https://www.bootdey.com/image/430x600/00CED1/000000" className="img-responsive" />
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-6">
                                <div className="d-flex mt-5 gap-5">
                                    <div className="d-flex gap-1">
                                        <div style={{ fontWeight: "500" }}>Tác giả:</div>
                                        <p>{dataBook && dataBook.author.name}</p>
                                    </div>
                                    <div className="d-flex gap-1">
                                        <div style={{ fontWeight: "500" }}>Thể loại:</div>
                                        <p>{dataBook && dataBook.category.name}</p>
                                    </div>
                                </div>
                                <div className="d-flex  gap-1">
                                    <div style={{ fontWeight: "500" }}>Mô tả:</div>
                                    <p style={{ whiteSpace: "pre-line" }}>{dataBook && dataBook.description}</p>
                                </div>
                                <div className="d-flex gap-1">
                                    <div className="price-sell">Giá bán:</div>
                                    <div className="d-flex gap-1">
                                        <div>
                                            <span className="original-price">{dataBook && dataBook.price.toLocaleString("vi-VN")} đ</span>
                                            <span className="discount-percentage">{dataBook && ((dataBook.sale / dataBook.price) * 100).toFixed(2)}%</span>
                                        </div>
                                        <span className="original-price-end">-&gt;{dataBook && dataBook.priceend.toLocaleString("vi-VN")} đ</span>
                                    </div>
                                </div>
                                <div className="d-flex gap-2 mt-2">
                                    <button className="btn btn-dark btn-rounded mr-1" data-toggle="tooltip" title="" data-original-title="Add to cart">
                                        <FontAwesomeIcon icon={faCartShopping} />
                                    </button>
                                    <button className="btn btn-primary btn-rounded">Buy Now</button>
                                </div>
                                <h5 className="box-title mt-4">Điểm nổi bật:</h5>
                                <ul className="ml-2">
                                    <div style={{ whiteSpace: "pre-line" }}>{dataBook && dataBook.action}</div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}
export default Details;
