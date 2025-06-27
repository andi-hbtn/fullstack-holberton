import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import NotFount from "../../components/NotFount";
import {
    PiMinusLight,
    PiPlusLight,
    PiCaretLeftLight,
    PiCaretRightLight
} from "react-icons/pi";
import { useProductContext } from "../../context/ProductContext";
import { useCartContext } from "../../context/CartContext";
import "./index.css";

const ProductPage = () => {
    const { id } = useParams();
    const { getProduct } = useProductContext();
    const { addQuantity, removeQuantity, cart, addToCart } = useCartContext();

    const [product, setProduct] = useState(null);
    const [error, setError] = useState({ message: "", status: 0 });
    const [selectedVariantId, setSelectedVariantId] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await getProduct(id);
                if (result.status === 200) {
                    const fetchedProduct = result.data;
                    setProduct(fetchedProduct);

                    if (fetchedProduct.colorVariants?.length > 0) {
                        setSelectedVariantId(fetchedProduct.colorVariants[0].id);
                    }
                }
            } catch (err) {
                setError({ message: err.message, status: err.statusCode || 500 });
            }
        };

        fetchProduct();
    }, [id]);

    const selectedVariant = product?.colorVariants.find(v => v.id === selectedVariantId);

    const getQuantity = (productId) => {
        const item = cart.items?.find(el => el.id === productId);
        return item?.quantity || 0;
    };

    const getVariantImages = () => {
        if (!product) return [];

        return product.colorVariants.map(variant => ({
            type: "variant",
            src: `${process.env.REACT_APP_API_URL}api/product/uploads/colors/${variant.main_image}`,
            variantId: variant.id
        }));
    };

    const images = getVariantImages();

    const handleNextImage = () => {
        const nextIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
        setCurrentImageIndex(nextIndex);
        setSelectedVariantId(images[nextIndex].variantId);
    };

    const handlePrevImage = () => {
        const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(prevIndex);
        setSelectedVariantId(images[prevIndex].variantId);
    };

    if (error.message) {
        return (
            <>
                <Header />
                <Container className="py-5">
                    <Row>
                        <Col md={10} className="p-4">
                            <NotFount errors={error} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

    if (!product) return null;

    return (
        <>
            <Header />
            <Container className="py-5">
                <Row className="prod-card-container g-5">
                    <Col lg={6} className="d-flex justify-content-center">
                        <Card className="product-image-card position-relative">
                            {images.length > 1 && (
                                <>
                                    <Button
                                        variant="light"
                                        className="position-absolute start-0 top-50 translate-middle-y rounded-circle p-2 image-nav-btn"
                                        onClick={handlePrevImage}
                                    >
                                        <PiCaretLeftLight size={24} />
                                    </Button>
                                    <Button
                                        variant="light"
                                        className="position-absolute end-0 top-50 translate-middle-y rounded-circle p-2 image-nav-btn"
                                        onClick={handleNextImage}
                                    >
                                        <PiCaretRightLight size={24} />
                                    </Button>
                                </>
                            )}
                            <Card.Img
                                variant="top"
                                src={images[currentImageIndex]?.src}
                                className="product-image"
                                alt={product.title}
                            />
                        </Card>
                    </Col>

                    <Col lg={6}>
                        <div className="product-details">
                            <h1 className="product-title mb-3">{product.title}</h1>

                            <Badge
                                bg={selectedVariant?.stock > 0 ? "success" : "secondary"}
                                className="mb-3"
                            >
                                {selectedVariant?.stock > 0 ? `In Stock ${selectedVariant?.stock} pieces` : `Out of Stock`}
                            </Badge>

                            <div className="price-section mb-4">
                                <h3 className="text-primary mb-0">
                                    £{selectedVariant?.price ?? "N/A"}
                                </h3>
                                <small className="text-muted">(Inc. VAT)</small>
                            </div>

                            {/* Color Variants */}
                            <div className="color-selector mb-4">
                                <h5 className="fw-medium mb-3">Select Color:</h5>
                                <div className="color-options-container">
                                    {product.colorVariants.map((variant) => (
                                        <div
                                            key={variant.id}
                                            className={`color-option ${selectedVariantId === variant.id ? "selected" : ""}`}
                                            onClick={() => {
                                                setSelectedVariantId(variant.id);
                                                const idx = images.findIndex(img => img.variantId === variant.id);
                                                if (idx !== -1) setCurrentImageIndex(idx);
                                            }}
                                        >
                                            <div className="color-swatch-container">
                                                <img
                                                    className="color-swatch"
                                                    src={`${process.env.REACT_APP_API_URL}api/product/uploads/colors/${variant.color_image}`}
                                                    alt={variant.color}
                                                    style={{
                                                        border: `2px solid ${selectedVariantId === variant.id ? "#3a5663" : "#e0e0e0"}`
                                                    }}
                                                />
                                            </div>
                                            <span className="color-name">{variant.color}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="quantity-controls mb-4">
                                <div className="d-flex align-items-center gap-3">
                                    <span className="fw-medium">Quantity:</span>
                                    <div className="d-flex align-items-center border rounded-pill">
                                        <Button variant="link" onClick={() => removeQuantity(product)}>
                                            <PiMinusLight />
                                        </Button>
                                        <span className="px-3 fs-5">{getQuantity(product.id)}</span>
                                        <Button variant="link" onClick={() => addQuantity(product)}>
                                            <PiPlusLight />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-100 mb-4"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </Button>

                            <div className="product-info">
                                <h4 className="mb-3">Product Details</h4>
                                <p className="product-description">{product.description}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ProductPage;
