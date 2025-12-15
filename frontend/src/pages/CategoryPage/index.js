import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCategoryContext } from "../../context/CategoryContext";
import { useCartContext } from "../../context/CartContext";
import {
    Container,
    Row,
    Col,
    Card,
    Spinner,
    Tooltip,
    OverlayTrigger
} from "react-bootstrap";
import { PiMinusLight, PiPlusLight } from "react-icons/pi";
import Header from "../../components/Header";
import NotFound from "../../components/NotFount";
import Footer from "../../components/Footer";
import "./index.css";

const CategoryPage = () => {
    const { id } = useParams();
    const { getCategory } = useCategoryContext();
    const { addQuantity, removeQuantity, cart, addToCart } = useCartContext();

    const [category, setCategory] = useState(null);
    const [selectedVariants, setSelectedVariants] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* ---------------- FETCH CATEGORY ---------------- */
    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await getCategory(id);

                if (result.statusCode === 200) {
                    setCategory(result.data);

                    // default variant per product
                    const defaults = {};
                    result.data.products.forEach((p) => {
                        if (p.colorVariants?.length > 0) {
                            defaults[p.id] = p.colorVariants[0].id;
                        }
                    });
                    setSelectedVariants(defaults);
                } else {
                    setError({ message: "Category not found", status: result.statusCode });
                }
            } catch (err) {
                setError({
                    message: err.message || "An error occurred",
                    status: err.statusCode || 500
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id, getCategory]);

    /* ---------------- HELPERS ---------------- */
    const getSelectedVariant = (product) => {
        const variantId = selectedVariants[product.id];
        return product.colorVariants.find(v => v.id === variantId);
    };

    const getQuantity = (productId, variantId) => {
        const item = cart.items?.find(
            (el) => el.productId === productId && el.variantId === variantId
        );
        return item?.quantity || 1;
    };

    const colorSwatchButton = (productId, variant, isActive) => (
        <OverlayTrigger
            key={variant.id}
            placement="top"
            overlay={<Tooltip>{variant.color}</Tooltip>}
        >
            <button
                type="button"
                className={`swatch-dot ${variant.color} ${isActive ? "active" : ""}`}
                onClick={() =>
                    setSelectedVariants(prev => ({
                        ...prev,
                        [productId]: variant.id
                    }))
                }
            />
        </OverlayTrigger>
    );

    /* ---------------- STATES ---------------- */
    if (loading) {
        return (
            <>
                <Header />
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                    <Spinner animation="border" />
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

    if (!category || !category.products?.length) {
        return (
            <>
                <Header />
                <Container className="py-5 text-center">
                    <h2>No products found</h2>
                </Container>
                <Footer />
            </>
        );
    }

    /* ---------------- RENDER ---------------- */
    return (
        <>
            <Header />

            <Container className="category-page py-5">
                <Row className="g-4">
                    {category.products.map((el) => {
                        const selectedVariant = getSelectedVariant(el);

                        return (
                            <Col xs={12} sm={6} lg={4} xl={3} key={el.id}>
                                <Card className="product-card h-100">
                                    <Link to={`/product/${el.id}`} className="link-of-category">
                                        <div className="card-image-container">
                                            <Card.Img
                                                src={`${process.env.REACT_APP_API_URL}api/product/uploads/${el.image}`}
                                                alt={el.title}
                                            />
                                        </div>
                                    </Link>

                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="product-title">
                                            {el.title}
                                        </Card.Title>

                                        {/* -------- QUICK BUY -------- */}
                                        {el.colorVariants.length > 0 && (
                                            <div className="variant-section premium-variant">

                                                {/* PRICE + SWATCHES */}
                                                <div className="premium-variant-header horizontal">
                                                    <span className="premium-price">
                                                        £{selectedVariant?.price || el.price}
                                                    </span>

                                                    <div className="premium-swatches">
                                                        {el.colorVariants.map(variant =>
                                                            colorSwatchButton(
                                                                el.id,
                                                                variant,
                                                                selectedVariants[el.id] === variant.id
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                {/* CART */}
                                                <div className="premium-cart-section">
                                                    <div className="quantity-selector m-0">
                                                        <button
                                                            className="quantity-btn"
                                                            onClick={() => removeQuantity(selectedVariant)}
                                                            disabled={!selectedVariant}
                                                        >
                                                            <PiMinusLight size={20} />
                                                        </button>

                                                        <span className="quantity-value">
                                                            {getQuantity(el.id, selectedVariants[el.id])}
                                                        </span>

                                                        <button
                                                            className="quantity-btn"
                                                            onClick={() => addQuantity(el.title, selectedVariant)}
                                                            disabled={
                                                                selectedVariant?.stock <=
                                                                getQuantity(el.id, selectedVariants[el.id])
                                                            }
                                                        >
                                                            <PiPlusLight size={20} />
                                                        </button>
                                                    </div>

                                                    <button
                                                        className="add-to-cart-btn p-2"
                                                        onClick={() => addToCart(el, selectedVariant)}
                                                        disabled={!selectedVariant || selectedVariant.stock <= 0}
                                                    >
                                                        Add to cart
                                                    </button>
                                                </div>

                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

            <Footer />
        </>
    );
};

export default CategoryPage;
