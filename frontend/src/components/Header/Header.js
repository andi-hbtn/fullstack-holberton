import { Row, Col } from 'react-bootstrap';
import "./Header.css";
import logo from "../../images/logo.png";
import Navigation from "../Navigation";

const Header = () => {
    return (
        <>
            <div className='main-cnt'>
                <Row>
                    <Col className='slogan-cnt'>
                        <h3>Your glass, our fittings</h3>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col className='logo-container'>
                    <img src={logo} alt='header brand logo' />
                </Col>
            </Row>
            <Navigation />
        </>
    );
}

export default Header;