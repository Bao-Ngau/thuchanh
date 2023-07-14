import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navv from "../Navv";
const ForgotPassword = () => {
    const [countDown, setCountDown] = useState(60);
    const [checkCountDown, setCheckCountDown] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [code, setCode] = useState("");
    const [countClick, setCountClick] = useState(0);
    const [valueBtn, setValueBtn] = useState("Gửi");
    const navigate = useNavigate();
    const regex = /^[A-Za-z0-9+_.-]+@gmail.com$/;

    useEffect(() => {
        if (checkCountDown) {
            let timeout;
            if (countDown > 0) {
                timeout = setTimeout(() => {
                    setCountDown(countDown => countDown - 1);
                }, [1000]);
            } else if (countDown === 0) {
                clearTimeout(timeout);
                setCheckCountDown(false);
                setCountDown(60);
                setCountClick(0);
                setValueBtn("Gửi");
            }
        }
        if (countClick === 1 && !checkCountDown) {
            setValueBtn("Đang gửi")
        }
    }, [checkCountDown, countDown, countClick])
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!regex.test(user.email)) {
            toast.error("Nhập email có dạng vd@gmail.com");
            return;
        }
        if (!user.password || !code) {
            toast.error("Vui lòng nhập đủ các trường");
            return;
        }
        await axios.post(`
        http://localhost:8081/email/checkCodeEmailAndSave/${code}`, user
        ).then((response) => {
            toast.success(response.data);
            setCheckCountDown(false);
            setCountDown(60);
            setCountClick(0);
            setValueBtn("Gửi");
            setUser({
                email: "",
                password: ""
            })
            navigate("/login")
        }).catch((error) => {
            console.log(error);
            if (!error.response.data) {
                toast.error(error.response.data);
            } else {
                toast.error("Đổi mật khẩu thất bại");
            }
        })
    }
    const handleClose = () => {
        navigate("/login");
    }
    const handleOnSendEmail = (e) => {
        if (!regex.test(user.email)) {
            toast.error("Nhập email có dạng vd@gmail.com");
            return;
        }
        setCountClick(countClick + 1);
        if (countDown === 60) {
            sendEmail();
        }
        if (countClick > 1) {
            if (0 < countDown < 60) {
                toast.warning("60 giây bạn mới gửi được tiếp");
            }
        }
    }
    const sendEmail = async () => {
        await axios.put(
            `http://localhost:8081/email/sendCode/${user.email}`
        ).then(() => {
            setCheckCountDown(true);
            toast.success("Vô email của bạn để lấy mã, mã chỉ tồn tại trong 5 phút");
            setTimeout(() => {
                console.log("render ...s")
                renderCodeEmail(user.email);
            }, [500000]);
        }).catch((error) => {
            toast.error(error.response.data);
            setCountClick(0);
        })
    }
    const renderCodeEmail = async (email) => {
        await axios.post(`http://localhost:8081/email/renderCode/${email}`).
            then(() => { console.log("Render success") }).catch(() => { console.log("Render thất bại") });
    }
    return (
        <>
            <Navv />
            <form className="contaiter" onSubmit={(e) => onSubmit(e)}>
                <div className="d-flex flex-column align-items-center">
                    <h1>Quên mật khẩu</h1>
                    <div className="col-md-3">
                        <label>Email:</label>
                        <div className="d-flex gap-2">
                            <input className="form-control" type='text' placeholder='...@gmail.com'
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                            <input type="button" className="btn btn-info"
                                readOnly
                                value={!checkCountDown ? valueBtn : countDown}
                                onClick={(e) => handleOnSendEmail(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label>Mã code:</label>
                        <input className="form-control w-50" type='text'
                            placeholder="Nhập mã code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label>Mật khẩu mới:</label>
                        <input className="form-control" type='password'
                            placeholder="Nhập mật khẩu mới"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <div className='d-flex mt-3 gap-2'>
                        <button className='btn btn-outline-success' type="submit">Đăng ký</button>
                        <button className='btn btn-outline-danger' onClick={() => handleClose()}>Quay lại</button>
                    </div>
                </div>
            </form>
        </>
    )
}
export default ForgotPassword;