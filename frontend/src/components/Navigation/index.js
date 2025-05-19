import { useState, useEffect } from 'react';
import { useCartContext } from '../../context/CartContext';
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import Login from '../AuthModal/login';
import Register from '../AuthModal/register';
import { Link } from 'react-router-dom';
import { Row, Col, Navbar, Container, Nav, Button, Form, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const Navigation = () => {
    const {  finalCart } = useCartContext();

    const { authUser, logout } = useAuthenticateContext();
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const handleLogout = async () => {
        return await logout();
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Row className='menu-search-cnt'>
                            <Col xs={6} md={9} lg={9}>
                                <Nav className="menu-cnt" style={{ maxHeight: '100px' }} navbarScroll>
                                    <Nav.Link href="/">home</Nav.Link>
                                    <Nav.Link href="/about-us">about us</Nav.Link>
                                    <Nav.Link href="#action3">products</Nav.Link>
                                    <Nav.Link href="#action4">gallery</Nav.Link>
                                    <Nav.Link href="/faq">faq</Nav.Link>
                                    {!authUser?.id ? (
                                        <>
                                            <Nav.Link onClick={() => setLoginModal(!loginModal)}>Login</Nav.Link>
                                            <Nav.Link onClick={() => setRegisterModal(!registerModal)}>Register</Nav.Link>
                                        </>
                                    ) : (
                                        <>
                                            <Nav.Link as={Link} to={authUser.roles === 'admin' ? '/admin-products' : '/profile'} className="d-flex align-items-center">
                                                <span style={{ marginRight: '8px' }}>
                                                    👋 Hi, {authUser.firstname}
                                                </span>
                                            </Nav.Link>
                                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                        </>
                                    )}
                                    <Nav.Link href="/contact">Contact Us</Nav.Link>
                                    <Nav.Link href="/cart" className="cart-link">
                                        cart
                                        <FaShoppingCart />
                                        <Badge
                                            pill
                                            bg="dark"
                                            className="cart-total-number"
                                        >
                                            {finalCart}
                                        </Badge>
                                    </Nav.Link>
                                </Nav>
                            </Col>
                            <Col xs={6} md={3} lg={3}>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Login openLogin={loginModal} closeLogin={() => setLoginModal(false)} />
            <Register openRegister={registerModal} closeRegister={() => setRegisterModal(false)} />
        </>
    )
}

export default Navigation;