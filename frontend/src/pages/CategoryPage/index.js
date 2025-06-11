import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useCategoryContext } from "../../context/CategoryContext";
import { Container, Row, Col, Button, Card, Spinner } from "react-bootstrap";
import { PiMinusLight, PiPlusLight } from "react-icons/pi";
import { useCartContext } from "../../context/CartContext";

import Header from "../../components/Header/Header";
import NotFound from "../../components/NotFount";
import Footer from "../../components/Footer";
import "./index.css";

const CategoryPage = () => {
    const { id } = useParams();
    const { addQuantity, removeQuantity, cart, addToCart } = useCartContext();
    const { getCategory } = useCategoryContext();

    const [category, setCategory] = useState(null); // Start with null
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
                <Row>
                    <Col md={4} className="p-4 center-error-msg">
                        <NotFound errors={error} />
                    </Col>
                </Row>
                <Footer />
            </>
        );
    }

    if (!category || !category.products || category.products.length === 0) {
        return (
            <>
                <Header />
                <Container className="py-5 text-center">
                    <h2>No products found in this category.</h2>
                </Container>
                <Footer />
            </>
        );
    }

    const getQuantity = (id) => cart.items?.find(el => el.id === id)?.quantity || 1;

    return (
        <>
            <Header />
            <Container>
                <Row>
                    {category.products.map((product, index) => (
                        <Col xs={12} sm={6} lg={4} xl={3} key={product.id || index}>
                            <Card className="card-cnt">
                                <a href={`/product/${product.id}`}>
                                    <Card.Img
                                        variant="top"
                                        src={`${process.env.REACT_APP_API_URL}api/product/uploads/${product.image}`}
                                    />
                                </a>
                                <Card.Body>
                                    <Card.Title className="product-title">{product.title.length > 15 ? product.title.slice(0, 15) + "..." : product.title}</Card.Title>
                                    <Card.Title className="product-price">&#163;{product.price}</Card.Title>
                                    <Card.Text className="text-center">{product.description }</Card.Text>
                                    <div className="price-cart">
                                        <div className="quantity text-center">
                                            <Button variant="link" onClick={() => { removeQuantity(product) }}>
                                                <PiMinusLight />
                                            </Button>

                                            <span>{getQuantity(product.id)}</span>

                                            <Button variant="link" onClick={() => { addQuantity(product) }}>
                                                <PiPlusLight />
                                            </Button>
                                        </div>
                                        <div className="cart">
                                            <Button variant="link" onClick={() => { addToCart(product) }}>Add to Cart</Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default CategoryPage;
