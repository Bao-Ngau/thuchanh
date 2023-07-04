import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const NavAdmin = (props) => {
    let navigate = useNavigate();
    const handleClose = () => {
        sessionStorage.removeItem("decodedToken");
        sessionStorage.removeItem("token");
        props.setIsLogin(false);
        navigate("/");
        toast.success("Thoát thành công !!");
    }
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <div className="container-fluid">
                    <Navbar.Brand className="ps-3" ><Link className="nav-link" to={"/homeAdmin/"}>Trang quản chị</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarSupportedContent" className="btn btn-outline-info">
                        <FontAwesomeIcon icon={faBars} />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="me-auto mb-2 mb-lg-0" >
                            <NavLink to={"/"} className="nav-link">Trang chủ</NavLink>
                            {(props.role === "SUPER_ADMIN" || (props.role === "ADMIN")) && <NavLink to={"/admin/listUser"} className="nav-link">Tài Khoản</NavLink>}
                            <NavLink to={"/admin/listBook"} className="nav-link">Thông tin sách</NavLink>
                            <NavLink to={"/admin/listCategory"} className="nav-link">Thể loại</NavLink>
                            <NavLink to={"/admin/listAuthor"} className="nav-link">Tác giả</NavLink>
                        </Nav>
                        <Dropdown>
                            <Dropdown.Toggle variant="none" className="btn btn-outline-success text-white">
                                <span>Xin chào, {props.fullName ? props.fullName : "User"} </span>
                                <FontAwesomeIcon icon={faUser} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="p-1">
                                <Dropdown.Item onClick={() => handleClose()}>Đăng xuất</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </div >
            </Navbar >
        </>
    )
}
export default NavAdmin;
