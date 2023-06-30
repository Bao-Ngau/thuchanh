import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddUser() {
    const [roles, setRoles] = useState([]);
    const [infoUser, setInfoUser] = useState({
        fullname: "",
        username: "",
        password: "",
        email: "",
        role: ""
    });
    useEffect(() => {
        const getRoles = async () => {
            await axios.get("http://localhost:8081/role")
                .then((response) => {
                    setRoles(response.data);
                })
                .catch((error) => {
                    console.log("Get role error: " + error);
                })
        };
        getRoles();
    }, [])
    let navigate = useNavigate();
    const handleClose = () => {
        navigate("/admin/listUser");
    }
    const submitAdd = (e) => {
        e.preventDefault();
        if (!infoUser.email || !infoUser.fullname || !infoUser.username || !infoUser.role || infoUser.role === "1" || !infoUser.password) {
            toast.error("Vui lòng nhập đủ các trường !!");
            return;
        } else {
            axios.post("http://localhost:8081/user/create", infoUser, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            })
                .then((response) => {
                    toast.success("Thêm thành công !!");
                    console.log(response)
                })
                .catch((error) => {
                    if (error.response.data === 1) {
                        toast.error("username này đã được đang ký");
                    } else if (error.response.data === 2) {
                        toast.error("email này đã được đang ký");
                    } else if (typeof error.response.data === "object") {
                        toast.error(error.response.data.defaultMessage);
                    }
                    toast.error("Thêm user thất bại !!");
                })
        }
    }
    return (
        <>
            <div style={{ padding: "6%" }}>
                <div className='container'>
                    <h3 className='text-center'>Thêm thông tin người dùng</h3>
                    <form onSubmit={(e) => submitAdd(e)}>
                        <div className='d-flex flex-column align-items-center'>
                            <div className='col-md-3'>
                                <label>Họ và tên:</label>
                                <input className='form-control mt-1' type='text'
                                    value={infoUser.fullname}
                                    onChange={(e) => setInfoUser({ ...infoUser, fullname: e.target.value })}
                                />
                            </div>
                            <div className='col-md-3'>
                                <label>Tên tài khoản:</label>
                                <input className='form-control mt-1' type='text'
                                    value={infoUser.username}
                                    onChange={(e) => setInfoUser({ ...infoUser, username: e.target.value })}
                                />
                            </div>
                            <div className='col-md-3'>
                                <label>Mật khẩu:</label>
                                <input className='form-control mt-1' type='password'
                                    value={infoUser.password}
                                    onChange={(e) => setInfoUser({ ...infoUser, password: e.target.value })}
                                />
                            </div>
                            <div className='col-md-3'>
                                <label>Email:</label>
                                <input className='form-control mt-1' placeholder='...@gmail.com' type='text'
                                    value={infoUser.email}
                                    onChange={(e) => setInfoUser({ ...infoUser, email: e.target.value })}
                                />
                            </div>
                            <div className='d-flex gap-2 col-md-3 mt-2'>
                                <label>Chọn quyền:</label>
                                <select className='col-5 text-center' onChange={(e) => setInfoUser({ ...infoUser, role: e.target.value })}>
                                    <option className='border-buttom' value={"1"}>Chọn 1 trong 3</option>
                                    {roles && roles.map((value, index) => {
                                        return (
                                            <option key={index} value={value}>{value}</option>
                                        )
                                    })};
                                </select>
                            </div>
                            <div className='d-flex gap-2 justify-content-end col-md-3 mt-3'>
                                <button className='btn btn-outline-primary' type='submit'>Thêm</button>
                                <button className='btn btn-outline-secondary' onClick={() => handleClose()}>Quay lại</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddUser;