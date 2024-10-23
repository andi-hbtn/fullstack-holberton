import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import "./BookDetailsModal.css";

const BookDetailsModal = ({ show, viewDetail, book }) => {
	if (!book) return null; // Ensure book is defined

	return (
		<Modal show={show} onHide={viewDetail} centered>
			<Modal.Header closeButton>
				<Modal.Title>{book.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<img src="https://m.media-amazon.com/images/I/71GvZSXhm4L._AC_UY218_.jpg" alt={book.title} className="book-img" />
				<h5>Description</h5>
				<p>{book.description}</p>
				<h5>Price: ${book.price}</h5>
				<h5><span className='stock'> {book.is_active ? "stock" : "out of stock"} </span></h5>
				<h5>Author: {book.author}</h5>
				<h5>Published: {book.publishedDate}</h5>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={viewDetail}>
					<FaTimes /> Close
				</Button>
				<Button variant="primary" onClick={() => console.log('Add to Cart functionality here')}>
					Add to Cart
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default BookDetailsModal;
