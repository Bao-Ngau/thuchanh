import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        username: "",
        password: ""
    });
    let navigate = useNavigate();
    const handleClose = () => {
        navigate("/");
    }
    const handleReisgter = async (e) => {
        e.preventDefault();
        if (!user.fullname || !user.username || !user.email || !user.password) {
            toast.error("Vui lòng nhập đủ các trường !!");
            return;
        }
        let res = await axios.post("http://localhost:8081/api/v1/auth/register", {
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            password: user.password
        }).then(() => {
            toast.success("Bạn đăng ký thành công !!")
            setUser({
                fullname: "",
                email: "",
                username: "",
                password: ""
            })
            handleClose();
        }).catch((error) => {
            if (error.response.data === 1) {
                toast.error("username này đã được đang ký");
            } else if (error.response.data === 2) {
                toast.error("email này đã được đang ký");
            } else if (typeof error.response.data === "object") {
                toast.error(error.response.data.defaultMessage);
            }
        })
    }
    return (
        <>
            <form className="contaiter">
                <div className="d-flex flex-column align-items-center">
                    <h1>Đăng ký</h1>
                    <div className="col-md-3">
                        <label>Họ và tên:</label>
                        <input className="form-control" type='text'
                            value={user.fullname}
                            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                        />
                    </div>
                    <div className="col-md-3">
                        <label>Email:</label>
                        <input className="form-control" type='text' placeholder='...@gmail.com'
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="col-md-3">
                        <label>Tài khoản:</label>
                        <input className="form-control" type='text'
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                    </div>
                    <div className="col-md-3">
                        <label>Mật khẩu:</label>
                        <input className="form-control" type='password'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <div className='d-flex mt-3 gap-2'>
                        <button className='btn btn-outline-success' onClick={(e) => handleReisgter(e)}>Đăng ký</button>
                        <button className='btn btn-outline-danger' onClick={() => handleClose()}>Quay lại</button>
                    </div>
                </div>
            </form>

        </>
    );
}

export default Register;