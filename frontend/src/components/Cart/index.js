import Header from "../Header/Header";
import { Container,Row,Col } from "react-bootstrap";

const Cart = () =>{
    return(
        <>
        <Header/>
        <Container>
             <Row className="prod-cart-cnt">
                <Col>
                    <h4>Cart</h4>
                </Col>
             </Row>
             <Row>
                <Col sm={12} md={8} lg={8}>
                    <Row>
                        <Col sm={6} md={6} lg={6}>Product</Col>
                        <Col sm={3} md={3} lg={3}>Product</Col>
                        <Col sm={3} md={3} lg={3}>Product</Col>
                    </Row>
                </Col>
                <Col sm={12} md={4} lg={4}>
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <h4>Cart totals</h4>
                        </Col>
                    </Row>
                </Col>
             </Row>
        </Container>

        </>
    )
}

export default Cart;