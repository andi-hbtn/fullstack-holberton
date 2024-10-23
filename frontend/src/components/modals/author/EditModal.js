import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useAuthorContext } from "../../../context/AuthorContext";
import AlertMessage from "../alert/AlertMessage";
const EditModal = ({ open, handleClose, authors, handleChage }) => {

	const { updateAuthor } = useAuthorContext();
	const [show, setShow] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		await updateAuthor(authors);
		setShow(!show);
	}

	return (
		<>
			<Modal
				show={open}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Form onSubmit={handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Author</Modal.Title>
					</Modal.Header>
					<Modal.Body>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Author name</Form.Label>
							<Form.Control
								type="text"
								name="name"
								placeholder="insert name...."
								autoFocus
								onChange={handleChage}
								value={authors.name}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>Author Lastname</Form.Label>
							<Form.Control
								type="text"
								name="lastname"
								placeholder="insert name...."
								autoFocus
								onChange={handleChage}
								value={authors.lastname}
							/>
						</Form.Group>

					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" type="submit">Edit</Button>
					</Modal.Footer>
				</Form>
				{show && <AlertMessage message="category has been updated successfully" />}
			</Modal >
		</>
	);
}

export default EditModal;