import { useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { useCategoryContext } from '../../context/CategoryContext';
import Login from '../AuthModal/login';
import Register from '../AuthModal/register';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button, Form, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaSearch, FaUser, FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import "./index.css";

const Navigation = () => {
    const { finalCart } = useCartContext();
    const { authUser, logout } = useAuthenticateContext();
    const { categories, allCategories, setCategories } = useCategoryContext();
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [search, setSearch] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value.trim().toLowerCase();
        setSearch(value);
        if (value.length === 0) {
            setCategories(allCategories);
        } else {
            const result = categories.filter((category) => {
                return category.title.includes(value)
            });
            setCategories(result);
        }
    }

    const handleLogout = async () => {
        return await logout();
    }

    return (
        <>
            {/* Main Navigation */}
            <Navbar expand="lg" className="luxe-navbar">
                <Container>

                    {/* Mobile Menu Toggle */}
                    <Button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <IoMdClose /> : <FaBars />}
                    </Button>

                    {/* Desktop Navigation */}
                    <Navbar.Collapse id="navbarScroll" className={`${mobileMenuOpen ? 'show' : ''}`}>
                        <Nav className="luxe-nav">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/about-us">About Us</Nav.Link>
                            <Nav.Link as={Link} to="/products">Products</Nav.Link>
                            <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
                            <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
                            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        </Nav>

                        {/* Right Side Elements */}
                        <div className="nav-right-elements">
                            {/* Search Bar */}
                            <div className={`search-container ${searchFocused ? 'focused' : ''}`}>
                                <FaSearch className="search-icon" />
                                <Form.Control
                                    type="search"
                                    placeholder="Search collections..."
                                    className="luxe-search"
                                    onChange={handleChange}
                                    value={search}
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                />
                            </div>

                            {/* User Actions */}
                            <div className="user-actions">
                                {!authUser?.id ? (
                                    <>
                                        <Button
                                            variant="link"
                                            className="auth-link"
                                            onClick={() => setLoginModal(!loginModal)}
                                        >
                                            Login
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="register-btn"
                                            onClick={() => setRegisterModal(!registerModal)}
                                        >
                                            Register
                                        </Button>
                                    </>
                                ) : (
                                    <div className="user-profile">
                                        <div className="user-greeting">
                                            <FaUser className="user-icon" />
                                            <span>Hi, {authUser.firstname}</span>
                                        </div>
                                        <div className="profile-dropdown">
                                            <Link
                                                to={authUser.roles === 'admin' ? '/admin-products' : '/profile'}
                                                className="dropdown-link"
                                            >
                                                My Account
                                            </Link>
                                            <button
                                                className="dropdown-link"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Cart */}
                                <Nav.Link as={Link} to="/cart" className="luxe-cart">
                                    <FaShoppingCart className="cart-icon" />
                                    <Badge pill className="cart-badge">
                                        {finalCart === 0 ? "" : finalCart}
                                    </Badge>
                                </Nav.Link>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal Components */}
            <Login openLogin={loginModal} closeLogin={() => setLoginModal(false)} />
            <Register openRegister={registerModal} closeRegister={() => setRegisterModal(false)} />
        </>
    )
}

export default Navigation;