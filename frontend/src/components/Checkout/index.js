import { useState, useEffect } from 'react';
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { useCartContext } from '../../context/CartContext';
import OrderConfirmed from '../OrderConfirmed';
import EmptyCart from '../EmptyCart';
import dateTime from "../../helpers/dateTime";
import Header from '../Header/Header';
import AlertMessage from "../AlertMessage";
import { Container, Row, Col, Form, Button, Card, Badge } from 'react-bootstrap';
import { FaArrowRight, FaLock, FaMapMarkerAlt, FaEnvelope, FaUser } from "react-icons/fa";
import { PiShoppingCart } from "react-icons/pi";
import "./index.css";

const Checkout = () => {
    const { authUser } = useAuthenticateContext();
    const { createOrder, finalCart, setFinalCart, setCart, cart } = useCartContext();
    const [order, setOrder] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        country: "united-kingdom",
        town: "",
        zipCode: "",
        street_address: "",
        appartment: "",
        message: ""
    });
    const [errors, setError] = useState({ status: false, message: "" });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || '{"items": []}';
        loadItems(storedCart);
    }, [finalCart]);

    const loadItems = (items) => {
        const result = items.items.map((el, index) => {
            return {
                product_id: el.productId,
                variantId: el.variantId,
                color: el.color,
                color_image: el.color_image,
                main_image: el.main_image,
                price: el.price,
                quantity: el.quantity,
                title: el.title
            };
        });
        setOrder(result);
    }

    const handleChange = (event) => {
        const { value, name } = event.target;
        setValues((prev) => {
            return { ...prev, [name]: value };
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const total_price = order.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);

            const items = order.map(el => ({
                product_id: el.product_id,
                variantId: el.variantId,
                color: el.color,
                color_image: el.color_image,
                main_image: el.main_image,
                price: el.price,
                quantity: el.quantity,
            }));

            const order_product = {
                user_id: authUser?.id || 0,
                items,
                total_price,
                status: "pending",
                created_at: dateTime.formatDate()
            }
            await createOrder(order_product, values);
            setOrderSuccess(true);
            setFinalCart(0);
            setCart({
                items: [],
                total_price: 0,
                user_id: authUser.id || null
            });
            localStorage.setItem("cart", JSON.stringify({
                items: [],
                total_price: 0,
                user_id: authUser.id || null
            }));
        } catch (error) {
            setError({ status: true, message: error.message });
        }
    }

    const isDisabled = (order.length === 0 ||
        (Object.entries(values).some(([key, value]) => {
            if (key === "message" || key === "appartment") return false;
            return !authUser && (value || "").toString().trim().length === 0;
        }))
    );

    const subtotal = order.reduce((acc, item) => {
        return acc + (Number(item.price) * Number(item.quantity))
    }, 0);

    const vat = +(subtotal * 0.20).toFixed(2);
    const totalWithVat = +(subtotal + vat).toFixed(2);

    useEffect(() => {
        if (authUser) {
            setValues((prev) => ({
                ...prev,
                firstname: authUser.firstname || "",
                lastname: authUser.lastname || "",
                email: authUser.email || "",
                phone: authUser.phone || "",
                country: authUser.country || "united-kingdom",
                town: authUser.town || "",
                zipCode: authUser.zipCode || "",
                street_address: authUser.street_address || "",
                appartment: authUser.appartment || "",
                message: authUser.message || ""
            }));
        }
    }, [authUser]);

    return (
        <>
            <Header />
            <Container className="checkout-page-container">
                {errors.status && (
                    <AlertMessage status={true} message={errors.message} />
                )}
                {orderSuccess ? (
                    <OrderConfirmed />
                ) : cart.items.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <>
                        <Row className="checkout-header">
                            <Col>
                                <h1 className="page-title">
                                    <PiShoppingCart className="me-2" />
                                    Checkout
                                    <Badge bg="primary" className="ms-3 item-count-badge">
                                        {order.length} {order.length === 1 ? 'item' : 'items'}
                                    </Badge>
                                </h1>
                            </Col>
                        </Row>

                        <Row className="checkout-content">
                            <Col lg={7} className="pe-lg-4">
                                <Card className="shipping-form-card">
                                    <Card.Body>
                                        <h2 className="form-section-title">
                                            <FaUser className="me-2" />
                                            Contact Information
                                        </h2>
                                        <Form onSubmit={handleSubmit}>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="firstname">
                                                        <Form.Label>First name</Form.Label>
                                                        <Form.Control
                                                            name="firstname"
                                                            value={values.firstname}
                                                            onChange={handleChange}
                                                            type="text"
                                                            placeholder="Enter first name"
                                                            className="form-input"
                                                            required
                                                            readOnly={!!authUser}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="lastname">
                                                        <Form.Label>Last name</Form.Label>
                                                        <Form.Control
                                                            name="lastname"
                                                            value={values.lastname}
                                                            onChange={handleChange}
                                                            type="text"
                                                            placeholder="Enter last name"
                                                            className="form-input"
                                                            required
                                                            readOnly={!!authUser}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="email">
                                                        <Form.Label>Email address</Form.Label>
                                                        <Form.Control
                                                            name="email"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            type="email"
                                                            placeholder="Enter email"
                                                            className="form-input"
                                                            required
                                                            readOnly={!!authUser}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="phoneNumber">
                                                        <Form.Label>Phone number</Form.Label>
                                                        <Form.Control
                                                            name="phone"
                                                            value={values.phone}
                                                            onChange={handleChange}
                                                            type="text"
                                                            placeholder="Phone number"
                                                            className="form-input"
                                                            required
                                                            readOnly={!!authUser}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <h2 className="form-section-title mt-5">
                                                <FaMapMarkerAlt className="me-2" />
                                                Shipping Address
                                            </h2>

                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="country">
                                                        <Form.Label>Country / Region</Form.Label>
                                                        <Form.Select
                                                            name="country"
                                                            value={values.country}
                                                            onChange={handleChange}
                                                            className="form-input"
                                                            disabled={!!authUser}
                                                        >
                                                            <option value="united-kingdom">United Kingdom (UK)</option>
                                                            <option value="united-states">United States (US)</option>
                                                            <option value="canada">Canada</option>
                                                            <option value="australia">Australia</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="town">
                                                        <Form.Label>Town / City</Form.Label>
                                                        <Form.Control
                                                            name="town"
                                                            value={values.town}
                                                            onChange={handleChange}
                                                            type="text"
                                                            placeholder="Enter town/city"
                                                            className="form-input"
                                                            required
                                                            readOnly={!!authUser}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="zip">
                                                        <Form.Label>Postal Code</Form.Label>
                                                        <Form.Control
                                                            name="zipCode"
                                                            value={values.zipCode}
                                                            onChange={handleChange}
                                                            type="text"
                                                            placeholder="Enter postal code"
                                                            className="form-input"
                                                            required
                                                            readOnly={!!authUser}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={12}>
                                                    <Form.Group className="mb-4" controlId="street">
                                                        <Form.Label>Street address</Form.Label>
                                                        <Form.Control
                                                            name="street_address"
                                                            value={values.street_address}
                                                            onChange={handleChange}
                                                            type="text"
                                                            placeholder="Enter street address"
                                                            className="form-input"
                                                            required
                                                            readOnly={!!authUser}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={12}>
                                                    <Form.Group className="mb-4" controlId="appartment">
                                                        <Form.Label>Apartment, suite, unit, etc. (optional)</Form.Label>
                                                        <Form.Control
                                                            name="appartment"
                                                            value={values.appartment}
                                                            onChange={handleChange}
                                                            type="text"
                                                            placeholder="Enter apartment/suite/unit"
                                                            className="form-input"
                                                            readOnly={!!authUser}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <h2 className="form-section-title mt-5">
                                                <FaEnvelope className="me-2" />
                                                Additional Information
                                            </h2>

                                            <Form.Group className="mb-4" controlId="information">
                                                <Form.Label>Order notes (optional)</Form.Label>
                                                <Form.Control
                                                    name="message"
                                                    value={values.message}
                                                    onChange={handleChange}
                                                    as="textarea"
                                                    placeholder="Notes about your order, e.g. special delivery instructions"
                                                    style={{ height: '120px' }}
                                                    className="form-input"
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col lg={5} className="ps-lg-4">
                                <div className="order-summary-container">
                                    <Card className="order-summary-card">
                                        <Card.Body>
                                            <h2 className="summary-title">Order Summary</h2>

                                            <div className="order-items">
                                                {order.map((item, index) => (
                                                    <div key={index} className="order-item">
                                                        <div className="item-image">
                                                            <img
                                                                src={`${process.env.REACT_APP_API_URL}api/product/uploads/colors/${item.main_image}`}
                                                                alt={item.title}
                                                                loading="lazy"
                                                            />
                                                            <span className="item-quantity">{item.quantity}</span>
                                                        </div>
                                                        <div className="item-details">
                                                            <h4 className="item-title">{item.title}</h4>
                                                            <div className="item-variant">
                                                                <span className="color-dot" style={{ backgroundColor: item.color_code || '#ccc' }}></span>
                                                                <span>{item.color}</span>
                                                            </div>
                                                        </div>
                                                        <div className="item-price">£{(item.price * item.quantity).toFixed(2)}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="order-totals">
                                                <div className="total-row">
                                                    <span>Subtotal</span>
                                                    <span>£{subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="total-row">
                                                    <span>VAT (20%)</span>
                                                    <span>£{vat}</span>
                                                </div>
                                                <div className="total-row grand-total">
                                                    <span>Total</span>
                                                    <span>£{totalWithVat}</span>
                                                </div>
                                            </div>

                                            <div className="secure-checkout">
                                                <FaLock className="me-2" />
                                                <span>Secure checkout</span>
                                            </div>

                                            <Button
                                                variant="primary"
                                                className="place-order-btn"
                                                type="submit"
                                                onClick={handleSubmit}
                                                disabled={order.length === 0 || isDisabled}
                                            >
                                                Place Order
                                                <FaArrowRight className="ms-2" />
                                            </Button>

                                            <div className="payment-methods">
                                                <div className="payment-icon visa"></div>
                                                <div className="payment-icon mastercard"></div>
                                                <div className="payment-icon amex"></div>
                                                <div className="payment-icon paypal"></div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </>
    )
}

export default Checkout;