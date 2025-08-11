import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCategoryContext } from '../../context/CategoryContext';
import Header from '../../components/Header';
import Slider from "../../components/Slider";
import Footer from '../../components/Footer';
import './index.css';

const Home = () => {
	const { categories } = useCategoryContext();


	return (
		<>
			<Header />
			<div className="luxe-glass-home">
				<Slider />
				{/* Categories Section */}
				<Container className="categories-section">
					<Row className="justify-content-center">
						{categories.map((category, index) => (
							<Col key={index} xl={3} lg={4} md={6} className="mb-5">
								<Link to={`category/${category.id}`} className="card-link">
									<Card className="luxe-card">
										<div className="card-image-container">
											<Card.Img
												variant="top"
												src={`${process.env.REACT_APP_API_URL}api/category/uploads/${category.image}`}
												className="card-image"
												alt={category.title}
											/>
											<div className="image-overlay"></div>
										</div>
										<Card.Body className="text-center">
											<Card.Title>
												<h3>{category.title}</h3>
											</Card.Title>
										</Card.Body>
									</Card>
								</Link>
							</Col>
						))}
					</Row>
				</Container>
			</div>
			<Footer />
		</>
	)
};

export default Home;