import { Row, Col, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./index.css";
const OrderConfirmed = ({ email }) => {
    return (
        <Row className="justify-content-center">
            <Col md={8} className="text-center">
                <div className="success-icon">
                    <FaCheckCircle size={64} />
                </div>
                <h2 className="success-title">Order Confirmed!</h2>
                <p className="success-message">
                    Thank you for your purchase. Your order has been received and is being processed.
                    We've sent a confirmation email to {email}.
                </p>
                <div className="success-actions">
                    <Button
                        as={Link}
                        to="/"
                        variant="dark"
                        className="continue-shopping-btn"
                    >
                        Continue Shopping
                    </Button>
                    <Button
                        as={Link}
                        to="/orders"
                        variant="outline-dark"
                        className="view-orders-btn"
                    >
                        View Your Orders
                    </Button>
                </div>
            </Col>
        </Row>
    )
}

export default OrderConfirmed;