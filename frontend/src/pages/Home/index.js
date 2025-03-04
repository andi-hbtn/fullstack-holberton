import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import Header from "../../components/Header/Header";
import { useProductContext } from "../../context/ProductContext";
import "./index.css";

const Home = () => {
	const { products } = useProductContext();
	return (
		<>
			<Header/>
			<Container className="my-5">
				<h2 className="mb-4 text-center" style={{ color: '#444', fontWeight: 'bold' }}>Product Collection</h2>
				<Row className="justify-content-center">
					{products.map((product) => (
						<Col key={product.id} md={4} className="mb-4 d-flex justify-content-center">
							<Card className="card">
								<div style={{ position: 'relative' }}>
									<Card.Img variant="top" src="https://m.media-amazon.com/images/I/71GvZSXhm4L._AC_UY218_.jpg" alt={product.title} style={{ height: '350px', objectFit: 'cover' }} />
									<span className='stock'> {product.is_active ? "stock" : "out of stock"} </span>
									<span className='price'>${product.price}</span>
								</div>
								<Card.Body style={{ padding: '15px' }}>
									<Card.Title style={{ fontSize: '1.5rem', color: '#333', fontWeight: '600' }}>
										{product.title}
										<FaInfoCircle style={{ marginLeft: '8px', color: '#007BFF', cursor: 'pointer' }} />
									</Card.Title>
									<Card.Subtitle className="mt-1 text-muted" style={{ color: '#555', fontStyle: 'italic' }}>{product.description}</Card.Subtitle>
									<div className="d-flex justify-content-between align-items-center mt-2">
										<Button variant="outline-primary" className="cart-btn" disabled={product.is_active ? false : true} >Add to Cart</Button>
									</div>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</>
	);
};

export default Home;