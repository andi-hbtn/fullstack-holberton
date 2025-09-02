import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCategoryContext } from "../../context/CategoryContext";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import Header from "../../components/Header";
import NotFound from "../../components/NotFount";
import Footer from "../../components/Footer";
import "./index.css";

const CategoryPage = () => {
    const { id } = useParams();
    const { getCategory } = useCategoryContext();
    const [category, setCategory] = useState(null);
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

    return (
        <>
            <Header />
            <Container className="category-page py-5">
                <Row className="g-4">
                    {category.products.map((product) => {
                        console.log("product-----", product);
                        return (
                            <Col xs={12} sm={6} lg={4} xl={3} key={product.id}>
                                <Link to={`/product/${product.id}`} className="link-of-category">
                                    <Card className="product-card h-100">
                                        <div className="card-image-container">
                                            <Card.Img
                                                variant="top"
                                                src={`${process.env.REACT_APP_API_URL}api/product/uploads/${product.image}`}
                                                className="product-image-category"
                                                alt={product.title}
                                            />
                                        </div>
                                        <Card.Body className="d-flex flex-column">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <Card.Title className="product-title mb-0">
                                                    {product.title}
                                                </Card.Title>
                                            </div>
                                            <Card.Text className="product-description flex-grow-1">
                                                {product.description.length > 40
                                                    ? `${product.description.substring(0, 50)}...`
                                                    : product.description}

                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default CategoryPage;