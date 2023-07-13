import Body from "./Body";
import Header from "./Header";
import Navv from "./Navv"
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = (props) => {
    const [dataBooks, setDataBook] = useState();
    const [dataCategorys, setDataCategorys] = useState();
    const [dataAuthors, setDataAuthors] = useState();
    const [cartItem, setCartItem] = useState([]);

    const user = sessionStorage.getItem("decodedToken");
    const userPaser = JSON.parse(user);



    useEffect(() => {
        getAllCategorys();
        getAllAuthors();
        getOrders();
    }, []);
    const getBook = (page, size) => {
        axios.get(
            `http://localhost:8081/book/${page}/${size}`
        ).then((response) => {
            console.log(response.data);
            setDataBook(response.data);
        }).catch(() => {
            console.log("lỗi get home book");
        })
    }
    const getAllAuthors = async () => {
        await axios.get(
            `http://localhost:8081/author/get`
        ).then((response) => {
            setDataAuthors(response.data);
        }).catch(() => {
            console.log("lỗi get home category");
        })
    };
    const getOrders = async () => {
        if (!userPaser) {
            return;
        }
        await axios.get(
            `http://localhost:8081/order/getByUserId/${userPaser.sub}`
        ).then((response) => {
            setCartItem(response.data);
        }).catch(() => {
            console.log("lỗi get order");
        })
    }
    const getBookByCategory = async (id) => {
        if (!id) {
            return;
        }
        await axios.get(
            `http://localhost:8081/book/getByCategory/0/4/${id}`
        ).then((response) => {
            console.log(response.data);
            setDataBook(response.data);
        }).catch(() => {
            console.log("getBookByCategory fail");
        })
    }
    const getBookByAuthor = async (id) => {
        if (!id) {
            return;
        }
        await axios.get(
            `http://localhost:8081/book/getByAuthor/0/4/${id}`
        ).then((response) => {
            console.log(response.data);
            setDataBook(response.data);
        }).catch(() => {
            console.log("getBookByAuthor fail");
        })
    }
    const addToCart = (product, isCheck) => {
        if (isCheck === "equal") {
            const remove = cartItem.filter((item) => item.id !== product.id)
            setCartItem([...remove, product]);
        } else if (isCheck === "unequal") {
            setCartItem([...cartItem, product]);
        }
    }
    const updateToCart = (product) => {
        const updatedItems = cartItem.map((item) => {
            if (item.id === product.id) {
                return {
                    ...item,
                    count: product.count,
                    // Cập nhật các thuộc tính khác của sản phẩm nếu cần thiết
                };
            }
            return item;
        });
        setCartItem(updatedItems);
    }

    const deleteToCart = (product) => {
        const updatedCartItems = cartItem.filter((item) => item.id !== product.id);
        setCartItem(updatedCartItems);
    }
    const getAllCategorys = async () => {
        await axios.get(
            `http://localhost:8081/category/get`
        ).then((response) => {
            setDataCategorys(response.data);
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
                cartItem={user ? cartItem : null}
                updateToCart={updateToCart}
                deleteToCart={deleteToCart}
                getBookByCategory={getBookByCategory}
                getBookByAuthor={getBookByAuthor}
            />
            <Header />
            <Body
                userName={userPaser ? userPaser.sub : null}
                addToCart={addToCart}
                getBook={getBook}
                dataBooks={dataBooks}
            />
            <Footer />
        </>
    )
}
export default Home;