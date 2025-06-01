import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import NotFount from "../../components/NotFount";
import { PiMinusLight, PiPlusLight } from "react-icons/pi";
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
        }
    }, [product]);

    const getQuantity = (productId) => {
        const item = cart.items?.find(el => el.id === productId);
        return item?.quantity || 0;
    };

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
                                <Card className="product-image-card">
                                    <Card.Img
                                        variant="top"
                                        src={`${process.env.REACT_APP_API_URL}api/product/uploads/` + (selectedColor ? `colors/${mainImage}` : `${mainImage}`)}
                                        className="product-image"
                                    />
                                </Card>
                            </Col>

                            <Col lg={6}>
                                <div className="product-details">
                                    <h1 className="product-title mb-3">{product.title}</h1>
                                    <Badge bg="success" className="mb-3">In Stock</Badge>

                                    <div className="price-section mb-4">
                                        <h3 className="text-primary mb-0">
                                            £{product.price}
                                        </h3>
                                        <small className="text-muted">(Inc. VAT)</small>
                                    </div>

                                    {/* Color Selector */}
                                    {product.colorImages && product.colorImages.length > 0 && (
                                        <div className="color-selector mb-4">
                                            <h5 className="fw-medium">Color:</h5>
                                            <div className="d-flex gap-2">
                                                {product.colorImages.map((colorImage) => (
                                                    <div
                                                        key={colorImage.id}
                                                        className={`color-swatch ${selectedColor === colorImage.id ? 'selected' : ''}`}
                                                        onClick={() => {
                                                            setSelectedColor(colorImage.id);
                                                            setMainImage(colorImage.product_color_image);
                                                        }}
                                                    >
                                                        <img
                                                            src={`${process.env.REACT_APP_API_URL}api/product/uploads/colors/${colorImage.color_image}`}
                                                            alt={colorImage.color}
                                                            className="img-fluid"
                                                            style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                objectFit: 'cover',
                                                                borderRadius: '50%',
                                                                cursor: 'pointer',
                                                                border: selectedColor === colorImage.id
                                                                    ? '2px solid var(--bs-primary)'
                                                                    : '1px solid #ddd'
                                                            }}
                                                        />
                                                    </div>
                                                ))}

                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}api/product/uploads/${product.image}`}
                                                    className="img-fluid"
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        objectFit: 'cover',
                                                        borderRadius: '50%',
                                                        cursor: 'pointer',
                                                        border: '1px solid #ddd'
                                                    }}
                                                    onClick={() => {
                                                        setSelectedColor(null);
                                                        setMainImage(product.image);
                                                    }}
                                                />
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
                            </Col >
                        </Row >
                    )
                }
            </Container >
        </>
    )
}
export default ProductPage;