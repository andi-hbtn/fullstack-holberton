import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Table, Button, Badge } from "react-bootstrap";
import { useProductContext } from "../../context/ProductContext";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { FiLogOut, FiBox, FiList, FiShoppingBag, FiHome, FiSettings, FiEdit } from "react-icons/fi";
import ProductColorModal from "./ProductColorModal.js";
import "./index.css";

const ProductWithColorOptions = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        product_id: '',
        mainImage: null,
        colorVariants: [{ colorName: '', image: null }]
    });
    const { products } = useProductContext();
    const { authUser, logout } = useAuthenticateContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    const handleModal = (data) => {
        setFormData({
            product_id: data?.id,
            mainImage: data?.image,
            colorVariants: [{ colorName: '', image: null }]
        });
        setOpen(!open);
    }

    return (
        <div className="admin-dashboard">
            <Navbar bg="dark" variant="dark" expand="lg" className="admin-navbar">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/products" className="d-flex align-items-center">
                        <FiBox className="me-2" />
                        <span className="brand-text">Admin Panel</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/admin-category" className="nav-link">
                                <FiList className="me-1" />
                                Categories
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin-products" className="nav-link">
                                <FiShoppingBag className="me-1" />
                                Products
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin-product-with-colors" className="nav-link active">
                                <FiBox className="me-1" />
                                Product Colors
                            </Nav.Link>
                            <Nav.Link as={Link} to="/" className="nav-link">
                                <FiHome className="me-1" />
                                Home
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            {authUser && (
                                <Button variant="outline-light" onClick={handleLogout} className="logout-btn">
                                    <FiLogOut className="me-2" />
                                    Logout
                                </Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container fluid className="main-content">
                <Row>
                    <Col md={3} xl={2} className="sidebar bg-dark text-light">
                        <div className="sidebar-sticky pt-4">
                            <h4 className="px-3 mb-4">Quick Actions</h4>
                            <Nav className="flex-column">
                                <Nav.Link as={Link} to="/reports" className="nav-link text-light">
                                    <FiSettings className="me-2" />
                                    Reports
                                </Nav.Link>
                                <Nav.Link as={Link} to="/settings" className="nav-link text-light">
                                    <FiSettings className="me-2" />
                                    Settings
                                </Nav.Link>
                            </Nav>
                            <div className="sidebar-stats mt-5 px-3">
                                <div className="stat-item mb-3">
                                    <small className="text-muted">Total Products</small>
                                    <h3 className="text-primary">{products.length}</h3>
                                </div>
                                <div className="stat-item">
                                    <small className="text-muted">Active Orders</small>
                                    <h3 className="text-success">24</h3>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col md={9} xl={10} className="p-4 main-content-area">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="page-title">Product Color Management</h2>
                        </div>

                        <div className="custom-card p-4 shadow-sm">
                            <Table hover responsive className="product-table">
                                <thead className="table-header">
                                    <tr>
                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>Color Options</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr key={index} className="table-row">
                                            <td className="text-muted">#{product.id}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={`${process.env.REACT_APP_API_URL}api/product/uploads/${product.image}`}
                                                        alt="product"
                                                        className="product-img rounded-circle me-3"
                                                    />
                                                    <div>
                                                        <h6 className="mb-0">{product.title}</h6>
                                                        <small className="text-muted">
                                                            {product.description.substring(0, 40)}...
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="color-options">
                                                    {product.colors?.map((color, i) => (
                                                        <span
                                                            key={i}
                                                            className="color-dot"
                                                            style={{ backgroundColor: color }}
                                                        />
                                                    ))}
                                                </div>
                                            </td>
                                            <td>
                                                <Badge bg={product.status === 'active' ? 'success' : 'secondary'}>
                                                    {product.status}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="me-2 action-btn"
                                                    onClick={() => handleModal(product)}
                                                >
                                                    <FiEdit />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ProductColorModal show={open} close={handleModal} data={formData} setData={setFormData} />
        </div>
    )
}

export default ProductWithColorOptions;