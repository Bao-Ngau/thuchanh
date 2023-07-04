import { Route, Router, Routes } from "react-router-dom";
import NavAdmin from "./NavAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import ListUser from "./user/ListUser";
import HomeAdmin from "./HomeAmin";
import AddUser from "./user/AddUser";
import EditUser from "./user/EditUser";
import ListCategory from "./category/ListCategory";
import ListAuthor from "./author/ListAuthor";
import ListBook from "./book/ListBook";
const RouteAdmin = (props) => {
    let getTokenDecode = sessionStorage.getItem("decodedToken");
    let paserToken = JSON.parse(getTokenDecode);
    return (
        <>
            <NavAdmin
                fullName={getTokenDecode ? paserToken.fullName : null}
                setIsLogin={props.setIsLogin}
                role={getTokenDecode ? paserToken.role : null}
            />
            <Routes>
                <Route path="/" element={<HomeAdmin />} />

                <Route path="/listUser"
                    element={
                        <ListUser role={getTokenDecode ? paserToken.role : null} />
                    }
                />
                <Route path="/listUser/add" element={<AddUser />} />
                <Route path="/listUser/edit/:username" element={<EditUser />} />
                <Route path="/listUser/:username" element={<ListUser />} />

                <Route path="/listCategory"
                    element={
                        <ListCategory
                            role={getTokenDecode ? paserToken.role : null}
                            userName={getTokenDecode ? paserToken.sub : null}
                        />
                    }
                />
                <Route path="/listAuthor"
                    element={
                        <ListAuthor
                            role={getTokenDecode ? paserToken.role : null}
                            userName={getTokenDecode ? paserToken.sub : null}
                        />
                    }
                />
                <Route path="/listBook"
                    element={
                        <ListBook
                            role={getTokenDecode ? paserToken.role : null}
                            userName={getTokenDecode ? paserToken.sub : null}
                        />
                    }
                />
            </Routes>
        </>
    )
}
export default RouteAdmin;