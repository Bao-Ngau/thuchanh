import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login(props) {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    let navigate = useNavigate();
    const handleClose = () => {
        navigate("/");
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!user.username || !user.password) {
            toast.error("Vui lòng nhập đủ các trường !!");
            return;
        }
        await axios.post("http://localhost:8081/api/v1/auth/authenticate", {
            username: user.username,
            password: user.password
        }).then((response) => {
            toast.success("Đăng nhập thành công !!");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("decodedToken", JSON.stringify(tokenDecoder(response.data.token)));
            setUser({
                username: "",
                password: ""
            });
            if (props.setIsLogin && typeof props.setIsLogin === "function") {
                props.setIsLogin(true);
            }
            handleClose();
        }).catch(() => {
            toast.error("Sai tài khoản hoặc mật khẩu !!")
        });
    }
    const tokenDecoder = (token) => {
        if (token) {
            var decodedToken = jwtDecode(token);
        }
        return decodedToken;
    }
    return (
        <>
            <form className="container">
                <div className="d-flex flex-column align-items-center">
                    <h1>Đăng nhập</h1>
                    <div className="col-md-4">
                        <label>Tài khoản:</label>
                        <input className="form-control" type='text'
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Mật khẩu:</label>
                        <input className="form-control" type='text'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <div className='d-flex mt-3 gap-2'>
                        <button className='btn btn-outline-success' onClick={(e) => handleLogin(e)}> Đăng nhập</button>
                        <button className='btn btn-outline-danger' onClick={() => handleClose()}>Quay lại</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Login;