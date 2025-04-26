import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import NotFount from "../../components/NotFount";
import { useProductContext } from "../../context/ProductContext";
import { useCartContext } from "../../context/CartContext";
import "./index.css";

const ProductPage = () => {
    const { id } = useParams();
    const { getProduct } = useProductContext();
    const { addQuantity, removeQuantity, quantity, addToCart } = useCartContext();
    const [product, setProduct] = useState([]);
    const [error, setError] = useState({ message: "", status: 0 });

    useEffect(() => {
        getById(id)
    }, [id]);

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

    return (
        <>
            <Header />

            <Container>
                {
                    error.message
                        ?
                        <Row>
                            <Col md={10} className="p-4">
                                <NotFount errors={error} />
                            </Col>
                        </Row>
                        :
                        <Row className="prod-cart-cnt">
                            <Col sm={5} md={5} lg={5} className="card-cnt">
                                <Card.Img variant="top" src={`${process.env.REACT_APP_API_URL}api/product/uploads/${product.image}`} />
                            </Col>
                            <Col sm={5} md={5} lg={5} className="prod-desc">
                                <h1>{product.title}</h1>
                                <h4>&pound; {product.price}</h4>
                                <h4>subtotal is &pound;{quantity.total_price}</h4>
                                <p>{product.description}</p>
                                <Col sm={12} md={12} lg={12}>
                                    <Row>
                                        <Col sm={12} md={6} lg={6} className="p-q">
                                            <Button variant="dark" onClick={() => removeQuantity(product)}>-</Button>
                                            <span className="text-center">{quantity.items.length}</span>
                                            <Button variant="dark" onClick={() => addQuantity(product)}>+</Button>
                                        </Col>

                                        <Col sm={12} md={6} lg={6} className="p-c">
                                            <Button variant="dark" className="" onClick={() => { addToCart() }}>Add to cart</Button>

                                            <a href="/cart">
                                                <Button variant="dark">
                                                    View cart
                                                </Button>
                                            </a>
                                        </Col>
                                    </Row>
                                </Col>
                            </Col>
                        </Row>
                }
            </Container>
        </>
    )
}

export default ProductPage;