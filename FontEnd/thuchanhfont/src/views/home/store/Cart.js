import { faAdd, faCartPlus, faMinus, faMinusCircle, faMinusSquare, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function Cart(props) {
    const [show, setShow] = useState(false);
    const [countCart, setCountCart] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [count, setCount] = useState(0);
    const cartItem = props.cartItem;
    useEffect(() => {
        if (countCart < 0) {
            setCountCart(0);
        }
        countOrder();
    }, [count, countCart, cartItem])
    // console.log(cartItem);
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
            props.updateToCart(response.data);
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
            console.log("Xóa thất bại");
        })
    }
    return (
        <>
            <Button variant="none" className='btn btn-outline-dark' onClick={handleShow}>
                <FontAwesomeIcon icon={faCartPlus} style={{ color: "#c66514" }} size="lg" />
                <span className="badge bg-dark text-white ms-1 rounded-pill">{cartItem ? count : 0}</span>
            </Button>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="h-100" style={{ backgroundColor: "#eee" }}>
                        <div className="container h-100 py-4">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-10">
                                    {cartItem && cartItem.map((value, index) => {
                                        return (

                                            <div className="card rounded-3 mb-2" key={index}>
                                                <div className="card-body p-4">
                                                    <div className="row d-flex justify-content-between align-items-center">
                                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src={"./" + (value.books.imagefile).slice(68)}
                                                                className="img-fluid rounded-3" alt="Cotton T-shirt" />
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

                                                            <input id="form1" style={{ minWidth: "84%" }} min="0" value={value.count} name="quantity" type="number"
                                                                onChange={(e) => setCountCart(e.target.value)}
                                                                className="form-control form-control-sm"
                                                            />
                                                            <button className="btn btn-link px-2"
                                                                // onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                                                onClick={() => countDownOrUp(value, "up")}
                                                            >
                                                                <FontAwesomeIcon icon={faPlusSquare} />
                                                            </button>
                                                        </div>
                                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                            <h5 className="mb-0">$499.00</h5>
                                                        </div>
                                                        <div className="col-md-1 col-lg-1 col-xl-1 btn btn-outline-danger" onClick={() => handleOnLickDelete(value.id)}>
                                                            <FontAwesomeIcon icon={faTrash} size='lg' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {/* <div className="card">
                                        <div className="card-body">
                                            <button type="button" className="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
                                        </div>
                                    </div> */}

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
            </Modal>
        </>
    );
}

export default Cart;