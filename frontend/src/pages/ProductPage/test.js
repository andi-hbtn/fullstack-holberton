import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { PiMinusLight, PiPlusLight } from "react-icons/pi";
import { useCartContext } from "../../context/CartContext";
import products from "./products";
import "./test.css";

const Test = () => {
    const { id } = useParams();
    const { addQuantity, removeQuantity, cart, addToCart } = useCartContext();
    const [product, setProduct] = useState({});
    const [selectedColor, setSelectedColor] = useState("");
    const [error, setError] = useState({ message: "", status: 0 });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 500));
                const result = products.find(p => p.id === Number(id));

                if (result) {
                    setProduct(result);
                    setSelectedColor(result.colors[0]);
                } else {
                    setError({ message: "Product not found", status: 404 });
                }
            } catch (err) {
                setError({ message: "Failed to load product", status: 500 });
            }
        };

        fetchProduct();
    }, [id]);

    const getQuantity = () => {
        const item = cart.items.find(el =>
            el.product_id === product.id && el.selectedColor === selectedColor
        );
        return item?.quantity || 0;
    };

    const handleAddToCart = () => {
        addToCart({
            ...product,
            selectedColor,
            price: product.price,
            image: product.image
        });
    };

    if (error.message) {
        return (
            <div className="text-center py-5">
                <h2 className="text-danger mb-3">{error.message}</h2>
                <Button variant="outline-primary" href="/">
                    Continue Shopping
                </Button>
            </div>
        );
    }

    if (!product.id) return <div className="text-center py-5">Loading...</div>;

    return (
        <>
            <Header />
            <Container className="py-5">
                <Row className="prod-card-container g-5">
                    <Col lg={6} className="d-flex justify-content-center">
                        <Card className="product-image-card">
                            <Card.Img
                                variant="top"
                                src={`${product.src}`}
                                className="product-image"
                            />
                            <div className="product-badge">
                                <Badge bg="warning" className="me-2">
                                    ⭐ {product.rating}
                                </Badge>
                                <span className="text-muted">({product.reviews} reviews)</span>
                            </div>
                        </Card>
                    </Col>

                    <Col lg={6}>
                        <div className="product-details">
                            <h1 className="product-title mb-3">{product.title}</h1>
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <Badge bg="success">In Stock</Badge>
                                <small className="text-muted">SKU: WATCH-{product.id}</small>
                            </div>

                            <div className="price-section mb-4">
                                <h3 className="text-primary mb-0">
                                    £{product.price.toFixed(2)}
                                </h3>
                                <small className="text-muted">Inc. VAT & Free Shipping</small>
                            </div>

                            <div className="color-selection mb-4">
                                <span className="fw-medium">Select Color:</span>
                                <div className="d-flex gap-2 mt-2">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`color-option ${selectedColor === color ? "selected" : ""}`}
                                            style={{ backgroundColor: color }}
                                            aria-label={`Select color ${color}`}
                                        >
                                            {selectedColor === color && (
                                                <span className="selected-indicator">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="quantity-controls mb-4">
                                <div className="d-flex align-items-center gap-3">
                                    <span className="fw-medium">Quantity:</span>
                                    <div className="d-flex align-items-center border rounded-pill">
                                        <Button
                                            variant="link"
                                            onClick={() => removeQuantity({ ...product, selectedColor })}
                                        >
                                            <PiMinusLight />
                                        </Button>
                                        <span className="px-3 fs-5">{getQuantity()}</span>
                                        <Button
                                            variant="link"
                                            onClick={() => addQuantity({ ...product, selectedColor })}
                                        >
                                            <PiPlusLight />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-100 mb-4 add-to-cart-btn"
                                onClick={handleAddToCart}
                            >
                                Add to Cart - £{(product.price * getQuantity()).toFixed(2)}
                            </Button>

                            <div className="product-info">
                                <h4 className="mb-3">Product Details</h4>
                                <p className="product-description">{product.description}</p>
                                <ul className="features-list">
                                    <li>✔️ 2-year international warranty</li>
                                    <li>✔️ Free engraving service</li>
                                    <li>✔️ Premium gift packaging</li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Test;