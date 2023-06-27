import { Route, Router, Routes } from "react-router-dom";
import NavAdmin from "./NavAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import TableUser from "./user/TableUser";
import HomeAdmin from "./HomeAmin";
import AddUser from "./user/AddUser";
import EditUser from "./user/EditUser";
const RouteAdmin = (props) => {
    let getTokenDecode = sessionStorage.getItem("decodedToken");
    let paserToken = JSON.parse(getTokenDecode);
    return (
        <>
            {/* <div className="sb-nav-fixed"> */}
            <NavAdmin
                fullName={getTokenDecode ? paserToken.fullName : null}
                setIsLogin={props.setIsLogin}
            />
            <Routes>
                <Route path="/" element={<HomeAdmin />} />
                <Route path="/tableUser"
                    element={
                        <TableUser role={getTokenDecode ? paserToken.role : null} />
                    }
                />
                <Route path="/tableUser/add" element={<AddUser />} />
                <Route path="/tableUser/edit/:username" element={<EditUser />} />
                <Route path="/tableUser/:username" element={<TableUser />} />
            </Routes>
            {/* </div> */}
        </>
    )
}
export default RouteAdmin;