import { faAdd, faCartPlus, faMinus, faMinusCircle, faMinusSquare, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function Cart(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [count, setCount] = useState(0);
    const [countMoney, setCountMoney] = useState(0);


    const [dataCheck, setDataCheck] = useState([]);
    const [isCheck, setIsCheck] = useState([]);


    const cartItem = props.cartItem;
    useEffect(() => {
        countOrder();
        setDataCheck(cartItem);
        totalMoneyIsCheck(isCheck)
    }, [count, cartItem, dataCheck, isCheck])
    const countOrder = () => {
        if (!cartItem) {
            setCount(0);
            return;
        }
        let totalCount = 0;
        cartItem.forEach((value, index) => {
            totalCount += value.count;
        });
        setCount(totalCount);
    }
    const countDownOrUp = async (value, downOrUp) => {
        await axios.put(
            `http://localhost:8081/order/update/${value.id}/${downOrUp}`
        ).then((response) => {
            if (response.data.count === 0) {
                handleOnLickDelete(value.id)
            } else {
                props.updateToCart(response.data);
            }
        }).catch(() => {
            console.log("count downOrUp thất bại");
        })
    }
    const handleOnLickDelete = async (id) => {
        await axios.delete(
            `http://localhost:8081/order/delete/${id}`
        ).then(() => {
            const product = {
                "id": id
            }
            props.deleteToCart(product);
            toast.success("Bạn xóa thành công")
        }).catch(() => {
            console.log("xóa thất bại");
        })
    }
    const handleOnClickAllCheckBox = (e) => {
        if (e.target.checked) {
            setIsCheck(dataCheck.map(item => item));
        } else {
            setIsCheck([]);
        }
    }
    const handleOnClickCheckBox = (e, value) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setIsCheck([...isCheck, value]);
        } else {
            setIsCheck(isCheck.filter(item => item !== value));
        }
    }
    const totalMoneyIsCheck = (product) => {
        if (!isCheck) {
            setCountMoney(0);
            return;
        }
        let totalMoney = 0;
        isCheck.forEach((item) => {
            totalMoney += item.books.priceend;
        })
        setCountMoney(totalMoney);
    }
    return (
        <>
            <Button variant="none" className='btn btn-outline-dark' onClick={handleShow}>
                <FontAwesomeIcon icon={faCartPlus} style={{ color: "#c66514" }} size="lg" />
                <span className="badge bg-dark text-white ms-1 rounded-pill">{!cartItem ? 0 : count}</span>
            </Button>

            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Giỏ hàng của bạn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="h-100" style={{ backgroundColor: "#eee" }}>
                        <div className="container h-100 py-4">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-9">
                                    <div>
                                        <FormCheck
                                            label="Chọn tất cả"
                                            type='checkbox'
                                            onChange={(e) => handleOnClickAllCheckBox(e)}
                                            checked={isCheck.length !== 0 && (isCheck.length === dataCheck.length)}
                                        />
                                    </div>
                                    {cartItem && cartItem.map((value, index) => {
                                        return (
                                            <div div className=" card rounded-3 mb-2" key={index} >
                                                <FormCheck
                                                    key={value.id}
                                                    type="checkbox"
                                                    onChange={(e) => handleOnClickCheckBox(e, value)}
                                                    checked={isCheck.includes(value)}
                                                    style={{ display: "flex", position: "absolute", top: "45%", margin: "0 0.5%" }}
                                                />
                                                {value.books &&
                                                    <div className="card-body p-4">
                                                        <div className="row d-flex justify-content-between align-items-center">
                                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                                                <img
                                                                    src={"./" + (value.books.imagefile).slice(68)}
                                                                    className="img-fluid rounded-3"
                                                                    style={{ maxHeight: "129px" }}
                                                                />
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                                <p className="lead fw-normal mb-2">{value.books.name}</p>
                                                                <span>Tác giả: {value.books.author.name}</span>
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                                <button className="btn btn-link px-2"
                                                                    onClick={() => countDownOrUp(value, "down")}
                                                                >
                                                                    <i className="fas fa-minus"></i>
                                                                    <FontAwesomeIcon icon={faMinusSquare} />
                                                                </button>

                                                                <input style={{ minWidth: "84%" }} min="0" value={value.count} type="number"
                                                                    className="form-control form-control-sm"
                                                                />
                                                                <button className="btn btn-link px-2"
                                                                    onClick={() => countDownOrUp(value, "up")}
                                                                >
                                                                    <FontAwesomeIcon icon={faPlusSquare} />
                                                                </button>
                                                            </div>
                                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                <div className="d-flex">
                                                                    <span className="original-price-home">{value && value.books.price.toLocaleString("vi-VN")} đ</span>
                                                                    <span className="discount-percentage-home">-{value && ((value.books.sale / value.books.price) * 100).toFixed(2)}%</span>
                                                                </div>
                                                                <div className="original-price-end-home">-&gt;{value && value.books.priceend.toLocaleString("vi-VN")} đ</div>
                                                            </div>
                                                            <div className="col-md-1 col-lg-1 col-xl-1 btn btn-outline-danger "
                                                                onClick={() => handleOnLickDelete(value.id)
                                                                }>
                                                                <FontAwesomeIcon icon={faTrash} size='lg' />
                                                            </div>

                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })}
                                    <div className="card">
                                        <div className="card-body d-flex gap-2 justify-content-end">
                                            <div style={{ fontWeight: "700" }} > Số tiền thanh toán:</div>
                                            <div className='border border-dark px-2'>
                                                {countMoney.toLocaleString("vi-Vn") + "đ"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Trở về
                    </Button>
                    <Button variant="primary">
                        Thanh toán
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default Cart;