import { Container, Card, Row, Col } from 'react-bootstrap';
import { useCategoryContext } from '../../context/CategoryContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.css';

const Home = () => {
	const { categories } = useCategoryContext();

	return (
		<>
			<Header />
			<div className="luxe-glass-home">
				{/* Categories Section */}
				<Container className="categories-section">
					<div className="section-header">
						<h2>Premium Glass Collections</h2>
						<p>Discover our exquisite range of glass solutions</p>
						<div className="divider"></div>
					</div>

					<Row className="justify-content-center">
						{categories.map((category, index) => (
							<Col key={index} xl={3} lg={4} md={6} className="mb-5">
								<Card className="luxe-card">
									<div className="card-image-container">
										<Card.Img
											variant="top"
											src={`${process.env.REACT_APP_API_URL}api/category/uploads/${category.image}`}
											className="card-image"
										/>
										<div className="image-overlay"></div>
									</div>
									<Card.Body className="text-center">
										<Card.Title>
											<h3>{category.title}</h3>
										</Card.Title>
										<a href={`category/${category.id}`} className="explore-link">
											View Collection
											<span className="arrow">→</span>
										</a>
									</Card.Body>
								</Card>
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