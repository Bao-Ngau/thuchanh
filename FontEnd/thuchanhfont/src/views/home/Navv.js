import { faBars, faCartPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Nav, NavDropdown, NavLink, Navbar } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Navv = (props) => {

    let userJson = sessionStorage.getItem("decodedToken")
    let userPaser = JSON.parse(userJson);
    const navigate = useNavigate();
    const handleClose = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("decodedToken");
        toast.success("Đăng xuất thành công !!");
        if (props.setIsLogin && typeof props.setIsLogin === "function") {
            props.setIsLogin(false);
        }
        navigate("/");
    };

    return (
        <>
            <Navbar bg='primary' variant='dark' expand="lg" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <div className="container-fluid">
                    <Navbar.Brand to="#">Shop Book</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarSupportedContent" className='btn-outline-info'>
                        <FontAwesomeIcon icon={faBars} />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarSupportedContent" className='justify-content-between'>
                        <Nav className="navbar-nav">
                            {/* <Nav.Link to="#" className="nav-link">Thể loại</Nav.Link> */}
                            <NavDropdown title="Thể loại" id="dropdown-basic">
                                {props.dataCategorys && props.dataCategorys.map((value, index) => {
                                    return (
                                        <NavDropdown.Item key={index}>{value.name}</NavDropdown.Item>
                                    )
                                })}
                            </NavDropdown>
                            <NavDropdown title="Tác giả" id="dropdown-basic">
                                {props.dataAuthors && props.dataAuthors.map((value, index) => {
                                    return (
                                        <NavDropdown.Item key={index}>{value.name}</NavDropdown.Item>
                                    )
                                })}
                            </NavDropdown>
                        </Nav>
                        <div className="d-flex gap-1">
                            <button className="btn btn-outline-dark" type="submit">
                                <FontAwesomeIcon icon={faCartPlus} style={{ color: "#c66514" }} size="lg" />
                                <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                            </button>
                            {!userJson ? (
                                <>
                                    <Link to={"/login"} className="btn btn-outline-info">Đăng nhập</Link>
                                    <Link to={"/register"} className="btn btn-outline-warning">Đăng ký</Link>
                                </>
                            ) : (
                                <Dropdown>
                                    <Dropdown.Toggle className="btn btn-outline-success text-white">
                                        <span>Xin chào, {userPaser.fullName} </span>
                                        <FontAwesomeIcon icon={faUser} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="p-1 p">
                                        {(userPaser.role === "ADMIN" || userPaser.role === "SUPER_ADMIN") && (
                                            <Dropdown.Item className="border-bottom">
                                                <Link to={"/admin"} className="nav-link">Dashboard</Link>
                                            </Dropdown.Item>
                                        )}
                                        <Dropdown.Item onClick={() => handleClose()}>Đăng xuất</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </div>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </>
    )
}
export default Navv;