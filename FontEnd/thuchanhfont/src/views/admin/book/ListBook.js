import { useEffect, useState } from "react"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import useFecth from "../../../custom/fetchData";
import axios from "axios";
import { toast } from "react-toastify";
import AddBook from "./AddBook";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import EditBook from "./EditBook";


const ListBook = (props) => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [search, setSearch] = useState("");
    const [datas, setDatas] = useState([]);
    const { data: dataBook, isLoading, isError } = useFecth(`http://localhost:8081/book/${page}/${size}`, sessionStorage.getItem("token"));
    useEffect(() => {
        if (search === "") {
            setDatas(dataBook);
        }
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
            axios.get(`http://localhost:8081/book/search/${search}`, {
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
            const formData = new FormData();
            formData.append("nameFile", value.imagefile);
            axios.post("http://localhost:8081/book/deleteimg", formData, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(() => {
                axios.delete(`http://localhost:8081/book/delete/${value.id}`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        toast.success("Xóa thông tin thể loại thành công");
                        setTimeout(() => {
                            window.location.reload();
                        }, [1000])
                    }
                }).catch(() => {
                    toast.success("Xóa thông tin thể loại thất bại");
                });
            }).catch(() => {
                toast.error("Xóa hình ảnh thất bại")
            })

        }
    }
    return (
        <>
            {!isLoading && !isError ?
                <>
                    <div style={{ padding: "3%" }}>
                        <h3 className="text-center">Thông tin sách</h3>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex gap-2">
                                <label>Số lượng sách hiện thị: </label>
                                <select defaultValue={"5"} onChange={(e) => handleOnChage(e)}>
                                    <option value={5}>5</option>
                                    <option value={7}>7</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </select>
                                {(props.role === "SUPER_ADMIN" || props.role === "ADMIN")
                                    &&
                                    <AddBook
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
                        <div className="table-responsive">
                            <table className="table mt-2 table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Mã</th>
                                        <th scope="col">Tên sách</th>
                                        <th scope="col">Tệp ảnh</th>
                                        <th scope="col">Mô tả</th>
                                        <th scope="col">Tác dụng</th>
                                        <th scope="col">Ngày XB</th>
                                        <th scope="col">Tác giả</th>
                                        <th scope="col">Thể loại</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Đã bán</th>
                                        <th scope="col">Giảm giá</th>
                                        <th scope="col">Giá cuối</th>
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
                                                <td>{!value.imagefile ? "" : value.imagefile.slice(75)}</td>
                                                <td style={{ width: "10%" }}>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={<Tooltip>{value.description}</Tooltip>}
                                                    >
                                                        <p style={{ whiteSpace: "pre-line", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "260px", padding: 0, margin: 0 }}>{value.description}</p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td style={{ width: "10%" }}>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={<Tooltip>{value.action}</Tooltip>}
                                                    >
                                                        <p style={{ whiteSpace: "pre-line", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "260px", padding: 0, margin: 0 }}>{value.action}</p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td>{value.publicationdate}</td>
                                                <td>{value.author.name}</td>
                                                <td>{value.category.name}</td>
                                                <td>{(value.price).toLocaleString('vi-VN')}</td>
                                                <td>{(value.count).toLocaleString('vi-VN')}</td>
                                                <td>{value.countsell}</td>
                                                <td>{(value.sale).toLocaleString('vi-VN')}</td>
                                                <td>{(!value.priceend ? "" : value.priceend).toLocaleString('vi-VN')}</td>
                                                <td>{new Date(value.createddate).toLocaleString()}</td>
                                                <td>{value.createdby}</td>
                                                {(props.role === "SUPER_ADMIN" || props.role === "ADMIN")
                                                    &&
                                                    <td className="d-flex gap-1 justify-content-center">
                                                        <EditBook
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
                                        pageCount={dataBook.totalPages}
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
export default ListBook;