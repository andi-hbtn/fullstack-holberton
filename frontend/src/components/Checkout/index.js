import { useState, useEffect } from 'react';
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { useCartContext } from '../../context/CartContext';
import OrderConfirmed from '../OrderConfirmed';
import EmptyCart from '../EmptyCart';
import dateTime from "../../helpers/dateTime";
import Header from '../Header/Header';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
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

    // Load items from cart when it is updated
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || '{"items": []}';
        loadItems(storedCart);
    }, [finalCart]);

    // Populate order items from cart data
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
            };
        });
        setOrder(result);
    }

    // Handle form input change
    const handleChange = (event) => {
        const { value, name } = event.target;
        setValues((prev) => {
            return { ...prev, [name]: value };
        });
    }

    // Handle form submission to create order
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
            console.error("Order submission failed:", error);
        }
    }

    // Check if any field is missing
    const isDisabled = (order.length === 0 ||
        (Object.entries(values).some(([key, value]) => {
            // Për përdoruesin që është i loguar, fushat e disa të dhënave do të jenë 'readOnly'
            if (key === "message" || key === "appartment") return false; // Mos kontrollo këto fusha
            // Kontrollo fushat e tjera vetëm nëse përdoruesi nuk është i loguar
            return !authUser && (value || "").toString().trim().length === 0;
        }))
    );

    // Calculate subtotal, VAT, and total price
    const subtotal = order.reduce((acc, item) => {
        return acc + (Number(item.price) * Number(item.quantity))
    }, 0);

    const vat = +(subtotal * 0.20).toFixed(2);
    const totalWithVat = +(subtotal + vat).toFixed(2);

    // Pre-fill form with user data if available
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
            <Container>
                {
                    orderSuccess ?
                        <OrderConfirmed />
                        :
                        cart.items.length === 0 ? < EmptyCart />
                            :
                            <>
                                <Row className='ch-t-cnt'>
                                    <Col>
                                        <h2>Checkout</h2>
                                        <h5>Billing details</h5>
                                    </Col>
                                </Row>
                                <Row className='billing-detail-cnt'>
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col sm={12} md={6} lg={6} className='billing-detail'>
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-3" controlId="firstname">
                                                            <Form.Label>First name</Form.Label>
                                                            <Form.Control
                                                                name="firstname"
                                                                value={values.firstname}
                                                                onChange={handleChange}
                                                                type="text"
                                                                placeholder="Enter name"
                                                                className='border-radius'
                                                                required
                                                                readOnly={!!authUser} // Make readonly if user is logged in
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6}>
                                                        <Form.Group className="mb-3" controlId="lastname">
                                                            <Form.Label>Last name</Form.Label>
                                                            <Form.Control
                                                                name="lastname"
                                                                value={values.lastname}
                                                                onChange={handleChange}
                                                                type="text"
                                                                placeholder="Enter lastname"
                                                                className='border-radius'
                                                                required
                                                                readOnly={!!authUser}
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={4}>
                                                        <Form.Group className="mb-3" controlId="email">
                                                            <Form.Label>Email address</Form.Label>
                                                            <Form.Control
                                                                name="email"
                                                                value={values.email}
                                                                onChange={handleChange}
                                                                type="email"
                                                                placeholder="Enter email"
                                                                className='border-radius'
                                                                required
                                                                readOnly={!!authUser}
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={4}>
                                                        <Form.Group className="mb-3" controlId="phoneNumber">
                                                            <Form.Label>Phone number</Form.Label>
                                                            <Form.Control
                                                                name="phone"
                                                                value={values.phone}
                                                                onChange={handleChange}
                                                                type="tel"
                                                                placeholder="Phone number"
                                                                className='border-radius'
                                                                required
                                                                readOnly={!!authUser}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={4}>
                                                        <Form.Group className="mb-3" controlId="country">
                                                            <Form.Label>Country / Region</Form.Label>
                                                            <Form.Select
                                                                name="country"
                                                                value={values.country}
                                                                onChange={handleChange}
                                                                className='border-radius'
                                                                disabled={!!authUser}
                                                            >
                                                                <option value="united-kingdom">United Kingdom (UK)</option>
                                                                <option value="united-states">United States (US)</option>
                                                                <option value="canada">Canada</option>
                                                                <option value="australia">Australia</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={4}>
                                                        <Form.Group className="mb-3" controlId="town">
                                                            <Form.Label>Town / City</Form.Label>
                                                            <Form.Control
                                                                name="town"
                                                                value={values.town}
                                                                onChange={handleChange}
                                                                type="text"
                                                                placeholder="Enter Town/City"
                                                                className='border-radius'
                                                                required
                                                                readOnly={!!authUser}
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={4}>
                                                        <Form.Group className="mb-3" controlId="zip">
                                                            <Form.Label>Zip Code</Form.Label>
                                                            <Form.Control
                                                                name="zipCode"
                                                                value={values.zipCode}
                                                                onChange={handleChange}
                                                                type="text"
                                                                placeholder="Enter ZIP Code"
                                                                className='border-radius'
                                                                required
                                                                readOnly={!!authUser}
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6}>
                                                        <Form.Group className="mb-3" controlId="street">
                                                            <Form.Label>Street address</Form.Label>
                                                            <Form.Control
                                                                name="street_address"
                                                                value={values.street_address}
                                                                onChange={handleChange}
                                                                type="text"
                                                                placeholder="Enter street address"
                                                                className='border-radius'
                                                                required
                                                                readOnly={!!authUser}
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col md={6}>
                                                        <Form.Group className="mb-3" controlId="appartment">
                                                            <Form.Label>Apartment, suite, unit, etc. (optional)</Form.Label>
                                                            <Form.Control
                                                                name="appartment"
                                                                value={values.appartment}
                                                                onChange={handleChange}
                                                                type="text"
                                                                placeholder="Enter appartment/suite/unit"
                                                                className='border-radius'
                                                                readOnly={!!authUser}
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col className='additional-cnt'>
                                                        <h5>Additional information</h5>
                                                        <Form.Group className="mb-3" controlId="information">
                                                            <Form.Label>Order notes (optional)</Form.Label>
                                                            <FloatingLabel controlId="information" label="Provide additional information">
                                                                <Form.Control
                                                                    name="message"
                                                                    value={values.message}
                                                                    onChange={handleChange}
                                                                    as="textarea"
                                                                    placeholder="Leave a comment here"
                                                                    style={{ height: '100px' }}
                                                                    className='border-radius'
                                                                />
                                                            </FloatingLabel>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col sm={12} md={5} lg={5} className='order-cnt'>
                                                <h5>Your order</h5>
                                                <div className='subtotal-cnt'>
                                                    <span>Product</span>
                                                    <span>Subtotal</span>

                                                    <div className='final-order'>
                                                        {order.map((el, index) => (
                                                            <Row key={index} className='each-order border-bottom'>
                                                                <Col sm={12} md={5} lg={5} className='checkout-img-title'>
                                                                    <img
                                                                        src={`${process.env.REACT_APP_API_URL}api/product/uploads/colors/${el.main_image}`}
                                                                        alt={el.title}
                                                                    />
                                                                    <span>{el.title}</span>
                                                                </Col>
                                                                <Col sm={12} md={2} lg={2} className='checkout-quantity'>
                                                                    <span> x {el.quantity}</span>
                                                                </Col>
                                                                <Col sm={12} md={5} lg={5} className='checkout-quantity'>
                                                                    <span>£{el.quantity * el.price}</span>
                                                                </Col>
                                                            </Row>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className='checkout-total'>
                                                    <span>Subtotal</span>
                                                    <span>£{subtotal}</span>
                                                </div>

                                                <div className='checkout-total'>
                                                    <span>VAT (20%)</span>
                                                    <span>£{vat}</span>
                                                </div>

                                                <div className='checkout-total total-payable'>
                                                    <span>
                                                        <strong>Total</strong>
                                                    </span>
                                                    <span>
                                                        <strong>£{totalWithVat}</strong>
                                                    </span>
                                                </div>

                                                <Button
                                                    variant="dark"
                                                    className='place-order-btn'
                                                    type="submit"
                                                    disabled={order.length === 0 || isDisabled}
                                                >
                                                    Place Order
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Row>
                            </>
                }
            </Container>
        </>
    )
}

export default Checkout;
