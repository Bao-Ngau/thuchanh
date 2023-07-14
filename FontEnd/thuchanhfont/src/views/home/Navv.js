import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cart from './store/Cart';
const Navv = (props) => {

    let userJson = sessionStorage.getItem("decodedToken")
    let userPaser = JSON.parse(userJson);

    const location = useLocation();
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
    const handleOnClickCategory = (value) => {
        if (!value) {
            return;
        }
        props.getBookByCategory(value.id);
    };
    const handleOnClickAuthor = (value) => {
        if (!value) {
            return;
        }
        props.getBookByCategory(value.id);
    }
    return (
        <>
            <Navbar bg='primary' variant='dark' expand="lg" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <div className="container-fluid">
                    <Navbar.Brand><Link to={"/"} className='nav-link'>Shop Book</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarSupportedContent" className='btn-outline-info'>
                        <FontAwesomeIcon icon={faBars} />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarSupportedContent" className='justify-content-between'>
                        {location.pathname === "/" ?
                            <Nav className="navbar-nav">
                                <NavDropdown title="Thể loại" id="dropdown-basic">
                                    {props.dataCategorys && props.dataCategorys.map((value, index) => {
                                        return (
                                            <NavDropdown.Item key={index} onClick={() => handleOnClickCategory(value)}>{value.name}</NavDropdown.Item>
                                        )
                                    })}
                                </NavDropdown>
                                <NavDropdown title="Tác giả" id="dropdown-basic">
                                    {props.dataAuthors && props.dataAuthors.map((value, index) => {
                                        return (
                                            <NavDropdown.Item key={index} onClick={() => handleOnClickAuthor(value)} >{value.name}</NavDropdown.Item>
                                        )
                                    })}
                                </NavDropdown>
                            </Nav>
                            :
                            <div></div>
                        }
                        <div className="d-flex gap-1 justify-content-end">
                            <Cart
                                cartItem={props.cartItem}
                                updateToCart={props.updateToCart}
                                deleteToCart={props.deleteToCart}
                            />
                            {!userJson ?
                                <>
                                    {(location.pathname === "/" || location.pathname === "/forgotpassword" || location.pathname.startsWith("/detail/")) &&
                                        <>
                                            <Link to={"/login"} className="btn btn-outline-info">Đăng nhập</Link>
                                            <Link to={"/register"} className="btn btn-outline-warning">Đăng ký</Link>
                                        </>
                                    }
                                    {location.pathname === "/login" &&
                                        <Link to={"/register"} className="btn btn-outline-warning">Đăng ký</Link>
                                    }
                                    {location.pathname === "/register" &&
                                        <Link to={"/login"} className="btn btn-outline-info">Đăng nhập</Link>
                                    }
                                </>
                                :
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

                            }
                        </div>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </>
    )
}
export default Navv;