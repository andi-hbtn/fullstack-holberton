import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCategoryContext } from '../../context/CategoryContext';
import { useState } from 'react';
import Header from '../../components/Header';
import Slider from "../../components/Slider";
import Footer from '../../components/Footer';
import './index.css';

const Home = () => {
	const { categories } = useCategoryContext();
	const [searchResults, setSearchResults] = useState({ categories: [], products: [] });

	const resultsToShow = searchResults.categories.length || searchResults.products.length
		? [...searchResults.categories, ...searchResults.products]
		: categories;

	return (
		<>
			<Header onSearchChange={setSearchResults} />
			<div className="luxe-glass-home">
				<Slider />
				<Container className="categories-section">
					<Row className="justify-content-center">
						{resultsToShow.map((item, index) => (
							<Col key={index} xl={2} lg={4} md={6} className="mb-5">
								<Link to={item?.products ? `/category/${item.id}` : `/product/${item.id}`} className="card-link">
									<Card className="luxe-card">
										<div className="card-image-container">
											<Card.Img
												variant="top"
												src={`${process.env.REACT_APP_API_URL}${item.price ? 'api/product/uploads/' : 'api/category/uploads/'}${item.image}`}
												className="card-image"
												alt={item.title}
											/>
											<div className="image-overlay"></div>
										</div>
										<Card.Body className="text-center category-card">
											<Card.Title>
												<h3>{item.title}</h3>
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