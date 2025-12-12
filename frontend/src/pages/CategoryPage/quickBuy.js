import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCategoryContext } from "../../context/CategoryContext";
import { useCartContext } from "../../context/CartContext";
import { Container, Row, Col, Card, Spinner, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import {
    PiMinusLight,
    PiPlusLight,
} from "react-icons/pi";
import Header from "../../components/Header";
import NotFound from "../../components/NotFount";
import Footer from "../../components/Footer";
import "./index.css";

const CategoryPage = () => {
    const { id } = useParams();
    const { getCategory } = useCategoryContext();
    const { addQuantity, removeQuantity, cart, addToCart } = useCartContext();
    const [category, setCategory] = useState(null);
    const [selectedVariantId, setSelectedVariantId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getCategory(id);
                if (result.statusCode === 200) {
                    setCategory(result.data);
                } else {
                    setError({ message: "Category not found", status: result.statusCode });
                }
            } catch (err) {
                setError({ message: err.message || "An error occurred", status: err.statusCode || 500 });
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id, getCategory]);

    if (loading) {
        return (
            <>
                <Header />
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                    <Spinner animation="border" variant="primary" />
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <Container className="py-5 text-center">
                    <NotFound errors={error} />
                </Container>
                <Footer />
            </>
        );
    }

    if (!category || !category.products || category.products.length === 0) {
        return (
            <>
                <Header />
                <Container className="py-5 text-center">
                    <div className="empty-category">
                        <h2 className="mt-4">No products found</h2>
                        <p className="text-muted">This category doesn't have any products yet.</p>
                        <Button variant="outline-primary" className="mt-3" href="/">
                            Continue Shopping
                        </Button>
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    const getQuantity = (productId, variantId) => {
        const item = cart.items?.find(
            (el) => el.productId === productId && el.variantId === variantId
        );
        return item?.quantity || 1;
    };

    const selectedVariant = category?.product?.colorVariants.find(v => v.id === selectedVariantId);

    console.log(" category.products", category.products);



    return (
        <>
            <Header />
            <Container className="category-page py-5">
                <Row className="g-4">
                    {
                        category.products.map((el) => (
                            <Col xs={12} sm={6} lg={4} xl={3} key={el.id}>
                                <Link to={el.is_active ? `/product/${el.id}` : "#"} className={`link-of-category ${!el.is_active ? "disabled-link" : ""}`}>
                                    <Card className={`product-card h-100 ${!el.is_active ? 'out-of-stock' : ''}`}>
                                        <div className="card-image-container">
                                            <Card.Img
                                                variant="top"
                                                src={`${process.env.REACT_APP_API_URL}api/product/uploads/${el.image}`}
                                                className="product-image-category"
                                                alt={el.title}
                                            />
                                            {!el.is_active && (
                                                <div className="overlay">
                                                    <span>Out of Stock</span>
                                                </div>
                                            )}
                                        </div>
                                        <Card.Body className="d-flex flex-column">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <Card.Title className="product-title mb-0">
                                                    {el.title}
                                                </Card.Title>
                                            </div>
                                            <Card.Text className="product-description flex-grow-1">
                                                Ref: {el.reference_number}
                                            </Card.Text>

                                            {/*---------------Quick Buy structure---------------*/}
                                            {el.colorVariants.length > 0 && (
                                                <div className="variant-section premium-variant">

                                                    {/* PRICE + SWATCHES HORIZONTAL */}
                                                    <div className="premium-variant-header horizontal">
                                                        <span className="premium-price">
                                                            £{selectedVariant?.price || el.price}
                                                            15
                                                        </span>

                                                        <div className="premium-swatches">
                                                            {el.colorVariants.map((variant) => (
                                                                <OverlayTrigger
                                                                    key={variant.id}
                                                                    placement="top"
                                                                    overlay={<Tooltip id={`tooltip-${variant.id}`}>{variant.color}</Tooltip>}
                                                                >
                                                                    <div
                                                                        className={`premium-swatch-item ${selectedVariantId === variant.id ? "active" : ""}`}
                                                                        onClick={() => setSelectedVariantId(variant.id)}
                                                                    >
                                                                        <span
                                                                            className="premium-swatch-dot"
                                                                            style={{ backgroundColor: variant.hex || "#d5d5d5" }}
                                                                        ></span>
                                                                    </div>
                                                                </OverlayTrigger>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* ******** CART SECTION HORIZONTAL ******** */}
                                                    <div className="premium-cart-section">
                                                        {/* Quantity Selector */}
                                                        <div className="quantity-selector m-0">
                                                            <button
                                                                className="quantity-btn"
                                                                onClick={() => removeQuantity(selectedVariant)}
                                                            >
                                                                <PiMinusLight size={20} />
                                                            </button>

                                                            <span className="quantity-value">
                                                                5
                                                            </span>

                                                            <button
                                                                className="quantity-btn"

                                                            >
                                                                <PiPlusLight size={20} />
                                                            </button>
                                                        </div>

                                                        {/* Add to Cart */}
                                                        <button className="add-to-cart-btn" disabled={selectedVariant?.stock <= 0}>
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                    {/* ******** CART SECTION HORIZONTAL ******** */}

                                                </div>
                                            )}
                                            {/*---------------Quick Buy structure---------------*/}


                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default CategoryPage;