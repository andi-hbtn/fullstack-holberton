import { Button, Form, Modal } from 'react-bootstrap';
import { useCategoryContext } from "../../context/CategoryContext";
const EditModal = ({ open, handleShow, handleClose, category, handleChage }) => {

	const { updateCategory } = useCategoryContext();


	const handleSubmit = async (event) => {
		event.preventDefault();
		await updateCategory(category);
	}

	return (
		<>
			<Modal
				show={open}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Edit Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Category name</Form.Label>
							<Form.Control
								type="text"
								name="name"
								placeholder="insert name...."
								autoFocus
								onChange={handleChage}
								value={category.name}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>Category Description</Form.Label>
							<Form.Control as="textarea" rows={3} name="description" onChange={handleChage} value={category.description} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" type="submit">Edit</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default EditModal;