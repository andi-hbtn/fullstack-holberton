import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Table, Button, Collapse } from "react-bootstrap";
import { useProductContext } from "../../context/ProductContext.js";
import { useAuthenticateContext } from "../../context/AuthenticateContext.js";
import { FiLogOut, FiBox, FiList, FiShoppingBag, FiHome, FiPlus, FiEdit, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaTrash } from 'react-icons/fa';
import { CiLock } from "react-icons/ci";
import AdminSideBar from "../../components/AdminSideBar";

import ProductVariantsModal from "./ProductVariantsModal.js";
import EditProductVariants from "./EditProductVariants.js";
import "./index.css";

const ProductVariants = () => {
    const { deleteProductVariant } = useProductContext();
    const [open, setOpen] = useState(false);
    const { products } = useProductContext();
    const { authUser, logout } = useAuthenticateContext();
    const [id, setId] = useState(0);
    const [expandedRows, setExpandedRows] = useState([]);

    const [openEdit, setOpenEdit] = useState(false);
    const [productVariant, setProductVariant] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    const handleCreate = (data) => {
        setId(data.id);
        setOpen(!open);
    }

    const handleClose = () => { setOpen(!open); }
    const handleEdit = (product) => {
        setProductVariant(product);
        setOpenEdit(!openEdit);
    }

    const deleteVariantProduct = async (id, index) => {
        return await deleteProductVariant(id);
    }

    const toggleRow = (productId) => {
        if (expandedRows.includes(productId)) {
            setExpandedRows(expandedRows.filter(id => id !== productId));
        } else {
            setExpandedRows([...expandedRows, productId]);
        }
    };

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
                            <Nav.Link as={Link} to="/admin-orders" className="nav-link active">
                                <FiBox className="me-1" />
                                Orders
                            </Nav.Link>
                            <Nav.Link as={Link} to="/" className="nav-link">
                                <FiHome className="me-1" />
                                Home
                            </Nav.Link>

                            <Nav.Link as={Link} to="/forgot-password" className="nav-link">
                                <CiLock className="me-1" />
                                Forgot password
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
                        <AdminSideBar />
                    </Col>

                    <Col md={9} xl={10} className="p-4 main-content-area">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="page-title">Product Color Management</h2>
                        </div>

                        <div className="custom-card p-4 shadow-sm">
                            <Table hover responsive className="product-table">
                                <thead className="table-header">
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>Color Variants</th>
                                        <th>Add Variant</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <React.Fragment key={product.id}>
                                            <tr key={index} className="table-row">
                                                <td>
                                                    <Button
                                                        variant="link"
                                                        size="sm"
                                                        onClick={() => toggleRow(product.id)}
                                                        aria-expanded={expandedRows.includes(product.id)}
                                                    >
                                                        {expandedRows.includes(product.id) ?
                                                            <FiChevronUp /> : <FiChevronDown />}
                                                    </Button>
                                                </td>
                                                <td className="text-muted">#{product.id}</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        {
                                                            product.image ?
                                                                <img
                                                                    src={`${process.env.REACT_APP_API_URL}api/product/uploads/${product.image}`}
                                                                    alt="product"
                                                                    className="product-img rounded-circle me-3"
                                                                />
                                                                : ""
                                                        }
                                                        <div>
                                                            <h6 className="mb-0">{product.title}</h6>
                                                            <small className="text-muted">
                                                                {product.description.substring(0, 40)}...
                                                            </small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {product.colorVariants?.length || 0} variants
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        className="me-2 action-btn"
                                                        onClick={() => handleCreate(product)}
                                                    >
                                                        <FiPlus />
                                                    </Button>
                                                </td>
                                            </tr>

                                            <tr key={index + 1}>
                                                <td colSpan={5} className="p-0">
                                                    <Collapse in={expandedRows.includes(product.id)}>
                                                        <div className="variant-details p-3 bg-light">
                                                            {product.colorVariants?.length > 0 ? (
                                                                <Table bordered size="sm" className="variant-table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Color</th>
                                                                            <th>Color Name</th>
                                                                            <th>Price</th>
                                                                            <th>Stock</th>
                                                                            <th>Main Image</th>
                                                                            <th>Action </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {product.colorVariants.map((variant, vIndex) => (
                                                                            <tr key={vIndex}>
                                                                                <td>
                                                                                    <img
                                                                                        src={`${process.env.REACT_APP_API_URL}api/product/uploads/colors/${variant.color_image}`}
                                                                                        alt="variant"
                                                                                        className="variant-img"
                                                                                        style={{ width: "80px" }}
                                                                                    />
                                                                                </td>
                                                                                <td>{variant.color}</td>
                                                                                <td>&#163;{variant.price}</td>
                                                                                <td>{variant.stock}</td>
                                                                                <td>
                                                                                    <img
                                                                                        src={`${process.env.REACT_APP_API_URL}api/product/uploads/colors/${variant.main_image}`}
                                                                                        alt="variant"
                                                                                        className="variant-img"
                                                                                        style={{ width: "80px" }}
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    <div className="d-flex flex-wrap">
                                                                                        {variant.images?.map((img, imgIndex) => (
                                                                                            <img
                                                                                                key={imgIndex}
                                                                                                src={`${process.env.REACT_APP_API_URL}api/product/uploads/colors/${img}`}
                                                                                                alt="variant"
                                                                                                className="variant-img me-2 mb-2"
                                                                                            />
                                                                                        ))}
                                                                                    </div>
                                                                                    <Button
                                                                                        variant="outline-primary"
                                                                                        size="sm"
                                                                                        className="me-2 action-btn"
                                                                                        onClick={() => { handleEdit(variant) }}
                                                                                    >
                                                                                        <FiEdit />
                                                                                    </Button>


                                                                                    <Button
                                                                                        variant="outline-primary"
                                                                                        size="sm"
                                                                                        className="me-2 action-btn"
                                                                                        onClick={() => { deleteVariantProduct(variant.id, vIndex) }}
                                                                                    >
                                                                                        <FaTrash />
                                                                                    </Button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </Table>
                                                            ) : (
                                                                <div className="text-center text-muted py-3">
                                                                    No color variants available for this product
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Collapse>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ProductVariantsModal show={open} close={handleClose} productId={id} />
            <EditProductVariants show={openEdit} close={() => { return setOpenEdit(!openEdit) }} product={productVariant} />
        </div>
    )
}

export default ProductVariants;