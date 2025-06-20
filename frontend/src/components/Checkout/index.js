import { useState, useEffect } from 'react';
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { useCartContext } from '../../context/CartContext';
import dateTime from "../../helpers/dateTime";
import AlertMessage from '../alert/AlertMessage';
import Header from '../Header/Header';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import "./index.css";

const Checkout = () => {

    const { authUser } = useAuthenticateContext();
    const { createOrder, finalCart, setFinalCart, setCart } = useCartContext();
    const [order, setOrder] = useState([]);
    const [orderResponse, setOrderResponse] = useState({ show: false, message: "", status: 0 });
    const [values, setValues] = useState({ firstname: "", lastname: "", email: "", phone: "", country: "united-kingdom", town: "", zipCode: "", street_address: "", appartment: "", message: "" });
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || '{"items": []}';
        loadItems(storedCart);
    }, [finalCart]);

    const loadItems = (items) => {
        const result = items.items.map((el, index) => {
            return {
                id: el.id,
                product_id: el.id,
                title: el.title,
                image: el.image,
                price: el.price,
                quantity: el.quantity
            };
        });
        setOrder(result);
    }

    const subtotal = order.reduce((acc, item) => {
        return acc + (Number(item.price) * Number(item.quantity))
    }, 0);

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

            const items = order.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity
            }));

            const order_product = {
                user_id: authUser?.id || 0,
                items,
                total_price,
                status: "pending",
                created_at: dateTime.formatDate()
            }

            const result = await createOrder(order_product, values);
            setOrderResponse({ show: true, message: result.message, status: result.statusCode });
            setFinalCart(0);
            setCart({
                items: [],
                total_price: 0,
                user_id: authUser.id || null
            })
            localStorage.setItem("cart", JSON.stringify({
                items: [],
                total_price: 0,
                user_id: authUser.id || null
            }));
        } catch (error) {
            setOrderResponse({ show: true, message: error.message, status: error.statusCode });
        }
    }

    const isDisabled = Object.entries(values).some(([key, value]) => {
        if (key === "message") return false; // make "message" optional
        return (value || "").toString().trim().length === 0;
    });

    return (
        <>
            <Header />
            <Container>
                {
                    true ?
                        <AlertMessage status={orderResponse.status} message={orderResponse.message} /> :
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
                                                        />
                                                        {/* <Form.Text className="text-muted"> first name error message </Form.Text> */}
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
                                                        />
                                                        {/* <Form.Text className="text-muted"> lastname error message </Form.Text> */}
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-3" controlId="email">
                                                        <Form.Label>Email address</Form.Label>
                                                        <Form.Control
                                                            name="email"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            type="email"
                                                            placeholder="Enter email"
                                                            className='border-radius'
                                                        />
                                                        {/* <Form.Text className="text-muted"> We'll never share your email with anyone else. </Form.Text> */}
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group className="mb-3" controlId="phoneNumber">
                                                        <Form.Label>Phone number</Form.Label>
                                                        <Form.Control
                                                            name="phone"
                                                            value={values.phone}
                                                            onChange={handleChange}
                                                            type="number"
                                                            placeholder="Phone number"
                                                            className='border-radius'
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <Form.Group className="mb-3" controlId="country">
                                                        <Form.Label>Country / Region</Form.Label>
                                                        <Form.Select aria-label="country" className='border-radius'>
                                                            <option
                                                                name="country"
                                                                value={values.country}
                                                                onChange={handleChange}
                                                                type="options" >
                                                                United Kingdom (UK)
                                                            </option>
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
                                                        />
                                                        {/* <Form.Text className="text-muted"> Town / City error message </Form.Text> */}
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
                                                        />
                                                        {/* <Form.Text className="text-muted">street address </Form.Text> */}
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
                                                        />
                                                        {/* <Form.Text className="text-muted"> street address error message </Form.Text> */}
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
                                                        />
                                                        {/* <Form.Text className="text-muted"> appartment error message </Form.Text> */}
                                                    </Form.Group>
                                                </Col>

                                                <Col className='additional-cnt'>
                                                    <h5>Additional information</h5>
                                                    <Form.Group className="mb-3" controlId="information">
                                                        <Form.Label>Order notes (optional)</Form.Label>
                                                        <FloatingLabel controlId="information" label="Provide additional information">
                                                            <Form.Control
                                                                name="message" value={values.message} onChange={handleChange}
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
                                                    {
                                                        order.map((el, index) => (
                                                            <Row key={index} className='each-order border-bottom'>
                                                                <Col sm={12} md={5} lg={5} className='checkout-img-title'>
                                                                    <img src={`${process.env.REACT_APP_API_URL}api/product/uploads/${el.image}`} alt='product name' />
                                                                    <span>{el.title} </span>
                                                                </Col>
                                                                <Col sm={12} md={2} lg={2} className='checkout-quantity'>
                                                                    <span> x {el.quantity}</span>
                                                                </Col>

                                                                <Col sm={12} md={5} lg={5} className='checkout-quantity'>
                                                                    <span>{el.quantity * el.price}</span>
                                                                </Col>
                                                            </Row>
                                                        )
                                                        )
                                                    }
                                                </div>
                                            </div>

                                            <div className='checkout-total'>
                                                <span>Subtotal</span>
                                                <span>&#163;{subtotal}</span>
                                            </div>

                                            <Button variant="dark" className='place-order-btn' type="submit" disabled={order.length === 0 ? true : isDisabled}>
                                                Proceed to checkout
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Row>
                        </>
                }
            </Container >
        </>
    )
}

export default Checkout;
