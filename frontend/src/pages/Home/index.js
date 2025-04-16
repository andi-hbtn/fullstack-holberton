import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer';
import { useProductContext } from "../../context/ProductContext";
import "./index.css";

const Home = () => {
	const { products } = useProductContext();
	return (
		<>
			<Header/>
			<Container>
      			<Row>
					{
						products.map((product,index)=>{
							return(
								<Col xs={12} sm={6} lg={4} xl={3} key={index}>
									<Card className='card-cnt'>
										<a href={`product/${product.id}`}>
											<Card.Img variant="top" src={`http://localhost:3000/api/product/uploads/${product.image}`} />
										</a>
									</Card>
									<Card.Body>
										<Card.Title className='text-center'>{product.title}</Card.Title>
										<Card.Text className='text-center'>{product.description}</Card.Text>
										<div className='price-cart'>
											<div className='price text-center'>
												<span>{product.price}</span>
											</div>
											<div className='cart'>
												<Button>Add to cart</Button>
											</div>
										</div>
									</Card.Body>
								</Col>
							)
						})
					}
				</Row>
			</Container>
			<Footer/>
		</>
	);
};

export default Home;