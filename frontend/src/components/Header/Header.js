import {Container,Row,Col,Button,Form,Nav,Navbar} from 'react-bootstrap';
import "./Header.css";
import logo from "../../images/logo.png";
import { useAuthenticateContext } from "../../context/AuthenticateContext";

const Header=()=>{

    const {authUser,logout} = useAuthenticateContext();

    const handleLogout = async() =>{
        return await logout();
    }

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
                    <img src={logo} alt='header brand logo'/>
                </Col>
            </Row>

            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Row className='menu-search-cnt'>
                            <Col xs={6} md={9} lg={9}>
                                <Nav className="menu-cnt" style={{ maxHeight: '100px' }} navbarScroll>
                                    <Nav.Link href="/">home</Nav.Link>
                                    <Nav.Link href="#action2">about us</Nav.Link>
                                    <Nav.Link href="#action3">our products</Nav.Link>
                                    <Nav.Link href="#action4">gallery</Nav.Link>
                                    <Nav.Link href="#action5">faq</Nav.Link>
                                    <Nav.Link href="#">shopping cart</Nav.Link>
                                    {!authUser?.id ? (
                                    <Nav.Link href="/login">Sign In/Register</Nav.Link>
                                    ) : (
                                    // Show user-related content when logged in
                                    <>
                                        <Nav.Link href="/profile" className="d-flex align-items-center">
                                        <span style={{ marginRight: '8px' }}>
                                            👋 Hi, {authUser.firstname}
                                        </span>
                                        </Nav.Link>
                                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                    </>
                                    )}
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
        </>
    );
}

export default Header;