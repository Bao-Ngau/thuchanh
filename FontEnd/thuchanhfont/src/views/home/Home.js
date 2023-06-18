import Body from "./Body";
import Header from "./Header";
import Navv from "./Navv"
import Footer from "./Footerr";

const Home = (props) => {
    return (
        <>
            <Navv setIsLogin={props.setIsLogin ? props.setIsLogin : null} />
            <Header />
            <Body />
            <Footer />
        </>
    )
}
export default Home;