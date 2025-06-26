import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import NotFount from "../../components/NotFount";
import { PiMinusLight, PiPlusLight, PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";
import { useProductContext } from "../../context/ProductContext";
import { useCartContext } from "../../context/CartContext";
import "./index.css";

const ProductPage = () => {
    const { id } = useParams();
    const { getProduct } = useProductContext();
    const { addQuantity, removeQuantity, cart, addToCart } = useCartContext();
    const [product, setProduct] = useState([]);
    const [error, setError] = useState({ message: "", status: 0 });
    const [selectedColor, setSelectedColor] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const getById = async (id) => {
            try {
                const result = await getProduct(id);
                if (result.statusCode === 200) {
                    setProduct(result.data);
                }
            } catch (error) {
                setError({ message: error.message, status: error.statusCode });
            }
        }
        getById(id)
    }, [id]);

    useEffect(() => {
        if (product?.image) {
            setMainImage(product.image);
            setSelectedColor(null);
            setCurrentImageIndex(0);
        }
    }, [product]);

    const getQuantity = (productId) => {
        const item = cart.items?.find(el => el.id === productId);
        return item?.quantity || 0;
    };

    const getAvailableImages = () => {
        const images = [];
        // Add main product image
        if (product.image) {
            images.push({
                type: 'main',
                src: `${process.env.REACT_APP_API_URL}api/product/uploads/${product.image}`
            });
        }
        // Add color variant images if available
        if (product.productVariants && product.productVariants.length > 0) {
            product.productVariants.forEach(colorImage => {
                images.push({
                    type: 'color',
                    src: `${process.env.REACT_APP_API_URL}api/product/uploads/colors/${colorImage.product_color_image}`,
                    colorId: colorImage.id
                });
            });
        }
        return images;
    };

    const handleNextImage = () => {
        const images = getAvailableImages();
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        const nextImage = images[currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1];
        if (nextImage.type === 'color') {
            setSelectedColor(nextImage.colorId);
        } else {
            setSelectedColor(null);
        }
        setMainImage(nextImage.src.split('/').pop());
    };

    const handlePrevImage = () => {
        const images = getAvailableImages();
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        const prevImage = images[currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1];
        if (prevImage.type === 'color') {
            setSelectedColor(prevImage.colorId);
        } else {
            setSelectedColor(null);
        }
        setMainImage(prevImage.src.split('/').pop());
    };

    const images = getAvailableImages();

    return (
        <>
            <Header />
            <Container className="py-5">
                {
                    error.message ? (
                        <Row>
                            <Col md={10} className="p-4">
                                <NotFount errors={error} />
                            </Col>
                        </Row>
                    ) : (
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
                                    <Badge bg={product.stock > 0 ? 'success' : 'secondary'} className="mb-3"> {product.stock > 0 ? 'In Stock' : 'Out of Stock '}</Badge>
                                    <div className="price-section mb-4">
                                        <h3 className="text-primary mb-0">
                                            £{product.price}
                                        </h3>
                                        <small className="text-muted">(Inc. VAT)</small>
                                    </div>

                                    {/* Color Selector */}
                                    {product.productVariants && product.productVariants.length > 0 && (
                                        <div className="color-selector mb-4">
                                            <h5 className="fw-medium mb-3">Select Color:</h5>
                                            <div className="color-options-container">
                                                {product.productVariants.map((colorImage) => (
                                                    <div
                                                        key={colorImage.id}
                                                        className={`color-option ${selectedColor === colorImage.id ? 'selected' : ''}`}
                                                        onClick={() => {
                                                            setSelectedColor(colorImage.id);
                                                            setMainImage(colorImage.product_color_image);
                                                            const images = getAvailableImages();
                                                            const foundIndex = images.findIndex(img =>
                                                                img.type === 'color' && img.colorId === colorImage.id
                                                            );
                                                            if (foundIndex !== -1) setCurrentImageIndex(foundIndex);
                                                        }}
                                                    >
                                                        <div className="color-swatch-container">
                                                            <div
                                                                className="color-swatch"
                                                                style={{
                                                                    backgroundImage: `url(${process.env.REACT_APP_API_URL}api/product/uploads/colors/${colorImage.color_image})`,
                                                                    borderColor: selectedColor === colorImage.id ? '#3a5663' : '#e0e0e0'
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="color-name">{colorImage.color}</span>
                                                    </div>
                                                ))}

                                                {/* Default color option */}
                                                <div
                                                    className={`color-option ${selectedColor === null ? 'selected' : ''}`}
                                                    onClick={() => {
                                                        setSelectedColor(null);
                                                        setMainImage(product.image);
                                                        setCurrentImageIndex(0);
                                                    }}
                                                >
                                                    <div className="color-swatch-container">
                                                        <div
                                                            className="color-swatch"
                                                            style={{
                                                                backgroundImage: `url(${process.env.REACT_APP_API_URL}api/product/uploads/${product.image})`,
                                                                borderColor: selectedColor === null ? '#3a5663' : '#e0e0e0'
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="color-name">Default</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="quantity-controls mb-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <span className="fw-medium">Quantity:</span>
                                            <div className="d-flex align-items-center border rounded-pill">
                                                <Button variant="link" onClick={() => { removeQuantity(product) }}>
                                                    <PiMinusLight />
                                                </Button>
                                                <span className="px-3 fs-5">{getQuantity(product.id)}</span>
                                                <Button variant="link" onClick={() => { addQuantity(product) }}>
                                                    <PiPlusLight />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="w-100 mb-4 add-to-cart-btn"
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
                    )
                }
            </Container >
        </>
    )
}
export default ProductPage;