import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import "./index.css";

const Checkout = () => {

    const [cart, setCart] = useState([]);
    const [userValues, setUserValues] = useState({ name: "", lastname: "", email: "", phone: 0, country: "united-kingdom", town: "", zipCode: "", streetAddr: "", appartment: 0, message: "" });
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("items")) || [];
        loadItems(storedCart);
    }, []);

    const loadItems = (items) => {
        const result = items.map((el, index) => {
            return {
                id: el.id,
                product_id: el.items[0].product_id,
                title: el.items[0].title,
                image: el.items[0].image,
                price: el.items[0].price,
                quantity: el.items.length
            };
        });
        setCart(result);
    }

    const subtotal = cart.reduce((acc, item) => {
        return acc + (Number(item.price) * Number(item.quantity))
    }, 0);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setUserValues((prev) => {
            return { ...prev, [name]: value };
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("userValues----", userValues);
    }

    const isDisabled = false;

    return (
        <>
            <Header />
            <Container>

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
                                                name="name"
                                                value={userValues.name}
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
                                                value={userValues.lastname}
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
                                                value={userValues.email}
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
                                                value={userValues.phone}
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
                                                    value={userValues.country}
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
                                                value={userValues.town}
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
                                                value={userValues.zipCode}
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
                                                name="streetAddr"
                                                value={userValues.streetAddr}
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
                                                value={userValues.appartment}
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
                                                    name="message" value={userValues.message} onChange={handleChange}
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
                                            cart.map((el, index) => {
                                                return (
                                                    <>
                                                        <Row key={index} className='each-order border-bottom'>
                                                            <Col sm={12} md={5} lg={5} className='checkout-img-title'>
                                                                <img src={`http://localhost:3000/api/product/uploads/${el.image}`} alt='product name' />
                                                                <span>{el.title} </span>
                                                            </Col>
                                                            <Col sm={12} md={2} lg={2} className='checkout-quantity'>
                                                                <span> x {el.quantity}</span>
                                                            </Col>

                                                            <Col sm={12} md={5} lg={5} className='checkout-quantity'>
                                                                <span>{el.quantity * el.price}</span>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className='checkout-total'>
                                    <span>Subtotal</span>
                                    <span>${subtotal}</span>
                                </div>

                                <Button variant="dark" className='place-order-btn' type="submit" disabled={isDisabled}>
                                    Proceed to checkout
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Container >
        </>
    )
}

export default Checkout;