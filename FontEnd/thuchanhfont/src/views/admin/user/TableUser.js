import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../custom/fetchData";
import axios from "axios";
import { toast } from "react-toastify";
import { Pagination } from "react-bootstrap";

const TableUser = (props) => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [search, setSearch] = useState("");
    const [datas, setDatas] = useState([]);
    const { data: userData, isLoading, isError } = useFetch(`http://localhost:8081/user/${page}/${size}`, sessionStorage.getItem("token"));
    let { username } = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        setDatas(userData);
        if (username) {
            axios.delete(`http://localhost:8081/user/${username}`, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                }
            }).then(() => {
                toast.success("Xóa thành công !!");
                navigate("/admin/tableUser")
            })
                .catch((error) => {
                    toast.error("Xóa user thất bại !!");
                    console.log("Xóa user thất bại : " + error)
                })
        }
    }, [username], [datas])
    useEffect(() => {
        if (search == "") {
            setDatas(userData);
        }
    })
    const handlePageClick = (e) => {
        setPage(e.selected);
    };
    const handleOnChage = (e) => {
        setSize(e.target.value)
    };
    const handleOnChangeSearch = (e) => {
        setSearch(e.target.value);
        if (!e.target.value) {
            setDatas(userData);
        }
    }
    const handleSearch = () => {
        if (search) {
            axios.get(`http://localhost:8081/user/search/${search}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                }
            }).then((response) => {
                let array = {
                    content: [
                        response.data
                    ]
                };
                setDatas(array);
            }).catch((error) => {
                toast.error(error.response.data);
            })
        }
    }
    return (
        <>
            {!isLoading && !isError ?
                <>
                    <div style={{ padding: "6%" }}>
                        <h3 className="text-center">Thông tin tài khoản người dùng</h3>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex gap-2">
                                <label>Số lượng người dùng hiện thị: </label>
                                <select defaultValue={"5"} onChange={(e) => handleOnChage(e)}>
                                    <option value={5}>5</option>
                                    <option value={7}>7</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </select>
                                {props.role === "SUPER_ADMIN"
                                    &&
                                    <Link to={"add"} className="btn btn-outline-info">Thêm người dùng</Link>}
                            </div>
                            <div className="d-flex gap-2" >
                                <input type="search" placeholder="Nhập tên tài khoản" className="form-control"
                                    value={search}
                                    onChange={(e) => handleOnChangeSearch(e)} />
                                <div className="btn btn-outline-info" onClick={() => handleSearch()}>
                                    <FontAwesomeIcon icon={faSearch} style={{ color: "green", }} size="lg" />
                                </div>
                            </div>
                        </div>
                        <table className="table mt-2 table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Mã</th>
                                    <th scope="col">Họ và tên</th>
                                    <th scope="col">Tài khoản</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Quyền</th>
                                    <th scope="col">Thạng thái</th>
                                    <th scope="col">Ngày tạo</th>
                                    {props.role === "SUPER_ADMIN" && <th scope="col">Thao tác</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {datas.content && datas.content.map((value, index) => {
                                    return (
                                        <tr key={value.id}>
                                            <th scope="row">{value.id}</th>
                                            <td>{value.fullname}</td>
                                            <td>{value.username}</td>
                                            <td>{value.email}</td>
                                            <td>{value.authorities[0].authority}</td>
                                            <td>{value.status}</td>
                                            <td>{new Date(value.createddate).toLocaleString()}</td>
                                            {props.role === "SUPER_ADMIN"
                                                &&
                                                <td className="d-flex gap-1 justify-content-center">
                                                    <Link to={`edit/${value.username}`} className="btn btn-outline-warning">Sửa</Link>
                                                    <Link to={`${value.username}`} className="btn btn-outline-danger">Xóa</Link>
                                                </td>
                                            }
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {search === "" &&
                            <div className="d-flex justify-content-center">
                                <ReactPaginate
                                    nextLabel="Tiếp"
                                    onPageChange={(e) => handlePageClick(e)}
                                    pageRangeDisplayed={3}//số hiển thị ở giữa
                                    marginPagesDisplayed={2}//số cái hiện thị đầu cuối
                                    pageCount={userData.totalPages}
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
                        }
                    </div>
                </>
                :
                <>
                    {isLoading && <h4 className="text-center">Đang tải</h4>}
                    {isError && <h4 className="text-center">Bị lỗi</h4>}
                </>
            }
        </>
    )
}
export default TableUser;