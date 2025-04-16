import {Row, Col } from 'react-bootstrap';
import "./index.css";

const Footer = () => {
    return (
        <>
            <Row className='footer-cnt'>
                <Col>
                    <p>&#169; 2023 London Glass Fittings</p>
                </Col>
            </Row>
        </>
    )
}

export default Footer;