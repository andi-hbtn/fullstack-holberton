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
								<Col xs={12} sm={6} lg={4} xl={3} key={index}>
									<Card className='card-cnt'>
										<a href={`category/${category.id}`}>
											<Card.Img variant="top" src={`${process.env.REACT_APP_API_URL}api/category/uploads/${category.image}`} />
										</a>
									</Card>
									<Card.Body>
										<Card.Title className='text-center'>{category.title}</Card.Title>
										<Card.Text className='text-center'>{category.description}</Card.Text>
									</Card.Body>
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
