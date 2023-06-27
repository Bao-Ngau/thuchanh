import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";

const EditUser = () => {
    const [roles, setRoles] = useState([]);
    const [infoUser, setInfoUser] = useState({
        fullname: "",
        username: "",
        email: "",
        role: ""
    })
    const [id, setId] = useState(0);
    let { username } = useParams();
    useEffect(() => {
        const getRoles = async () => {
            await axios.get("http://localhost:8081/role")
                .then((response) => {
                    setRoles(response.data);
                })
                .catch((error) => {
                    console.log("Get role edit error: " + error);
                })
        };
        getRoles();
        const getUser = async () => {
            await axios.get(`http://localhost:8081/user/${username}`, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then((response) => {
                setInfoUser({
                    fullname: response.data.fullname,
                    username: response.data.username,
                    email: response.data.email,
                    role: response.data.role
                })
                setId(response.data.id);
            }).catch((error) => {
                console.log("Get username edit error: " + error);
            })
        }
        getUser();
    }, []);
    const navigate = useNavigate();
    const handleClose = () => {
        navigate("/admin/tableUser");
    }
    const submitEdit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/user/update/${id}`, infoUser, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(() => {
            toast.success("Sửa thành công !!");
            navigate("/admin/tableUser");
        }).catch(() => {
            toast.error("Sửa user thất bại !!");
        });
    }
    return (
        <>
            <div style={{ padding: "6%" }}>
                <div className='container'>
                    <h3 className='text-center'>Sửa thông tin người dùng</h3>
                    <form onSubmit={(e) => submitEdit(e)}>
                        <div className='d-flex flex-column align-items-center'>
                            <div className='col-md-3'>
                                <label>Họ và tên:</label>
                                <input className='form-control mt-1'
                                    type="text"
                                    value={infoUser.fullname}
                                    onChange={(e) => setInfoUser({ ...infoUser, fullname: e.target.value })}
                                />
                            </div>
                            <div className='col-md-3'>
                                <label>Tên tài khoản:</label>
                                <input className='form-control mt-1'
                                    type="text"
                                    value={infoUser.username}
                                    onChange={(e) => setInfoUser({ ...infoUser, username: e.target.value })}
                                />
                            </div>
                            <div className='col-md-3'>
                                <label>Email:</label>
                                <input className='form-control mt-1'
                                    type="text"
                                    value={infoUser.email}
                                    onChange={(e) => setInfoUser({ ...infoUser, email: e.target.value })}
                                />
                            </div>
                            <div className='d-flex gap-2 col-md-3 mt-2'>
                                <label>Chọn quyền:</label>
                                <select className='col-5 text-center' onChange={(e) => setInfoUser({ ...infoUser, role: e.target.value })}>
                                    <option className='border-buttom' >Chọn 1 trong 3</option>
                                    {roles && roles.map((value, index) => {
                                        return (
                                            <option selected={value === infoUser.role ? true : false} key={index} value={value}>{value}</option>
                                        )
                                    })};
                                </select>
                            </div>
                            <div className='d-flex gap-2 justify-content-end col-md-3 mt-3'>
                                <button className='btn btn-outline-primary' type='submit'>Sửa</button>
                                <button className='btn btn-outline-secondary' type="button" onClick={() => handleClose()}>Quay lại</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default EditUser;