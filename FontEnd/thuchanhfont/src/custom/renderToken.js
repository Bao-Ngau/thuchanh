import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const RenderToken = (props) => {
    const [show, setShow] = useState(false);
    const [countDown, setCountDownt] = useState(60);
    const handleYes = async () => {
        if (props.showToken) {
            await axios.post("http://localhost:8081/api/v1/auth/authenticate/recreate", {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            }).then((response) => {
                let data = response.data.token;
                localStorage.setItem("token", data);
                toast.success("Bạn gia hạn thành công !!");
            }).catch((error) => {
                console.log("Gia hạn thất bại: " + error);
                toast.error("Gia hạn thất bại !!");
            })
            props.setShowToken(false);
        }
    }
    const navigate = useNavigate();
    const handleOnClickNo = () => {
        toast.success("Bạn đã không gia hạn, hệ thông xẽ tự đăng xuất tài khoản của bạn");
        handleNo();
    }
    const handleNo = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("decodedToken");
        if (props.setIsLogin) {
            props.setIsLogin(false);
        }
        if (window.location.pathname === "/") {
            props.setShowToken(false);
        } else {
            props.setShowToken(false);
            navigate("/")
        }
    }
    useEffect(() => {
        if (props.showToken) {
            setShow(props.showToken)
        }
        let count;
        if (show) {
            if (countDown > 0) {
                count = setTimeout(() => {
                    setCountDownt(countDown => countDown - 1);
                }, 1000)
            } else {
                toast.success("Bạn đã không chọn gì trong 60s,hệ thống tự đang xuất tài khoản của bạn!!")
                handleNo();
            }
        }
        return (() => { clearTimeout(count) })
    }, [show, countDown])
    return (
        <>
            <Modal show={show} >
                <Modal.Header >
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>- Bạn đã hết phiên đăng nhập bạn muốn có muốn tiếp tục đang nhập không ?.</p>
                    <p>- Nếu bạn không chọn thì tự động đăng xuất sau 60s.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="none" className='btn btn-outline-primary' onClick={() => handleYes()}>Đồng ý</Button>
                    <Button variant="none" className='btn btn-outline-secondary d-flex col-md-3 gap-2' onClick={() => handleOnClickNo()}>Không
                        <div className='col-md-5 border border-secondary rounded-circle'>{countDown}s</div>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default RenderToken;