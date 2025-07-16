import { Container, Card, Row, Col } from 'react-bootstrap';
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer';
import { useCategoryContext } from '../../context/CategoryContext';
import "./index.css";

const Home = () => {
	const { categories } = useCategoryContext();
	return (
		<>
			<Header />
			<Container>
				<Row>
					{
						categories.map((category, index) => {
							return (
								<Col key={index} xs={12} sm={6} className='custom-col'>
									<Card className='card-cnt'>
										<a href={`category/${category.id}`}>
											<Card.Img variant="top" src={`${process.env.REACT_APP_API_URL}api/category/uploads/${category.image}`} />
											<Card.Title className='text-center'>
												<h4>{category.title} </h4>
											</Card.Title>
										</a>
									</Card>
								</Col>
							)
						})
					}
				</Row>
			</Container>
			<Footer />
		</>
	);
};

export default Home;
