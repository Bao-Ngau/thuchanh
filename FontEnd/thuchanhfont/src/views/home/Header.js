import { Carousel, Image } from "react-bootstrap";
const Header = () => {
    return (
        <Carousel className="bg-dark mt-1" data-bs-theme="dark" style={{ zIndex: 0 }}>
            <Carousel.Item interval={10000}>
                <img
                    className="d-flex m-auto"
                    style={{ width: '100%', height: '400px' }}
                    src="./booksale.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    {/* nội đụng nếu có */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={10000}>
                <img
                    className="d-flex m-auto"
                    style={{ width: '100%', height: '400px' }}
                    src="./book1.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    {/* nội đụng nếu có */}
                </Carousel.Caption>
            </Carousel.Item>


        </Carousel>
    )
}
export default Header;