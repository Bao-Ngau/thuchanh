import Body from "./Body";
import Header from "./Header";
import Navv from "./Navv"
import Footer from "./Footerr";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = (props) => {



    const [dataCategorys, setDataCategorys] = useState();
    const [dataAuthors, setDataAuthors] = useState();

    useEffect(() => {
        getAllCategorys();
        getAllAuthors();
    }, []);

    const getAllCategorys = async () => {
        await axios.get(
            `http://localhost:8081/category/get`
        ).then((response) => {
            setDataCategorys(response.data);
        }).catch(() => {
            console.log("lỗi get home category");
        })
    };
    const getAllAuthors = async () => {
        await axios.get(
            `http://localhost:8081/author/get`
        ).then((response) => {
            setDataAuthors(response.data);
        }).catch(() => {
            console.log("lỗi get home category");
        })
    };


    return (
        <>
            <Navv
                setIsLogin={props.setIsLogin ? props.setIsLogin : null}
                dataCategorys={dataCategorys}
                dataAuthors={dataAuthors}
            />
            <Header />
            <Body />
            <Footer />
        </>
    )
}
export default Home;