import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import useFecth from "../../../custom/fetchData";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import axios from "axios";
import { toast } from "react-toastify";


const ListCategory = (props) => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [search, setSearch] = useState("");
    const [datas, setDatas] = useState([]);
    const { data: dataCategory, isLoading, isError } = useFecth(`http://localhost:8081/category/${page}/${size}`, sessionStorage.getItem("token"));
    useEffect(() => {
        if (search === "") {
            setDatas(dataCategory);
        }
        console.log(datas);
    });
    const handleOnChage = (e) => {
        setSize(e.target.value);
    }
    const handlePageClick = (e) => {
        setPage(e.selected);
    }
    const handleOnChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    const handleOnClickSearch = () => {
        if (search !== "") {
            console.log("a");
            axios.get(`http://localhost:8081/category/search/${search}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                }
            }).then((response) => {
                var array = {
                    content: [response.data]
                }
                if (response.status === 200) {
                    setDatas(array);
                    toast.success("Tìm kiếm thành công");
                }
            }).catch((error) => {
                toast.error(error.response.data);
            })
        }
    }
    const handleDelete = (value) => {
        if (value.id) {
            axios.delete(`http://localhost:8081/category/delete/${value.id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    toast.success("Xóa thông tin thể loại thành công");
                    setTimeout(() => {
                        window.location.reload();
                    }, [1500])
                }
            }).catch(() => {
                toast.success("Xóa thông tin thể loại thất bại");
            });
        }
    }
    return (
        <>
            {!isLoading && !isError ?
                <>
                    <div style={{ padding: "6%" }}>
                        <h3 className="text-center">Thông tin thể loại</h3>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex gap-2">
                                <label>Số lượng thể loại hiện thị: </label>
                                <select defaultValue={"5"} onChange={(e) => handleOnChage(e)}>
                                    <option value={5}>5</option>
                                    <option value={7}>7</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </select>
                                {(props.role === "SUPER_ADMIN" || props.role === "ADMIN")
                                    &&
                                    <AddCategory
                                        userName={props.userName}
                                    />
                                }
                            </div>
                            <div className="d-flex gap-2" >
                                <input type="search" placeholder="Nhập tên tài khoản" className="form-control"
                                    value={search}
                                    onChange={(e) => handleOnChangeSearch(e)} />
                                <div className="btn btn-outline-info" onClick={() => handleOnClickSearch()}>
                                    <FontAwesomeIcon icon={faSearch} style={{ color: "green", }} size="lg" />
                                </div>
                            </div>
                        </div>
                        <table className="table mt-2 table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Mã</th>
                                    <th scope="col">Tên thể loại</th>
                                    <th scope="col">Ngày thêm</th>
                                    <th scope="col">Người sửa</th>
                                    {(props.role === "SUPER_ADMIN" || props.role === "ADMIN") && <th scope="col">Thao tác</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {datas.content && datas.content.map((value, index) => {
                                    return (
                                        <tr key={value.id}>
                                            <th scope="row">{value.id}</th>
                                            <td>{value.name}</td>
                                            <td>{new Date(value.createddate).toLocaleString()}</td>
                                            <td>{value.createdby}</td>
                                            {(props.role === "SUPER_ADMIN" || props.role === "ADMIN")
                                                &&
                                                <td className="d-flex gap-1 justify-content-center">
                                                    <EditCategory
                                                        userName={props.userName}
                                                        value={value}
                                                    />
                                                    {/* <Link to={`edit/${value.username}`} className="btn btn-outline-warning">Sửa</Link> */}
                                                    <button className="btn btn-outline-danger" onClick={() => handleDelete(value)}>Xóa</button>
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
                                    pageCount={dataCategory.totalPages}
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
export default ListCategory;