import { useState } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import { useBookContext } from "../../context/BookContext";
import BookDetailsModal from '../../components/modals/books/BookDetailsModal';
import "./Books.css";

const Books = () => {
	const { books } = useBookContext();
	const [book, setBook] = useState({});
	const [show, setShow] = useState(false);

	const viewDetail = (book) => {
		setBook(book);
		setShow(!show);
	}

	return (
		<>
			<Container className="my-5">
				<h2 className="mb-4 text-center" style={{ color: '#444', fontWeight: 'bold' }}>Books Collection</h2>
				<Row className="justify-content-center">
					{books.map((book) => (
						<Col key={book.id} md={4} className="mb-4 d-flex justify-content-center">
							<Card className="card">
								<div style={{ position: 'relative' }}>
									<Card.Img variant="top" src="https://m.media-amazon.com/images/I/71GvZSXhm4L._AC_UY218_.jpg" alt={book.title} style={{ height: '350px', objectFit: 'cover' }} />
									<span className='stock'> {book.is_active ? "stock" : "out of stock"} </span>
									<span className='price'>${book.price}</span>
								</div>
								<Card.Body style={{ padding: '15px' }}>
									<Card.Title style={{ fontSize: '1.5rem', color: '#333', fontWeight: '600' }}>
										{book.title}
										<FaInfoCircle style={{ marginLeft: '8px', color: '#007BFF', cursor: 'pointer' }} />
									</Card.Title>
									<Card.Subtitle className="mt-1 text-muted" style={{ color: '#555', fontStyle: 'italic' }}>{book.description}</Card.Subtitle>
									<div className="d-flex justify-content-between align-items-center mt-2">
										<Button variant="primary" className="detail-btn" onClick={() => viewDetail(book)}>View Details</Button>
										<Button variant="outline-primary" className="cart-btn" disabled={book.is_active ? false : true} >Add to Cart</Button>
									</div>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
			<BookDetailsModal book={book} show={show} viewDetail={viewDetail} />
		</>
	);
};

export default Books;