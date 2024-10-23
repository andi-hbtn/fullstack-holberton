import { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { useCategoryContext } from "../../../context/CategoryContext";
import AlertMessage from "../alert/AlertMessage";
const CreateModal = ({ open, close }) => {

	const { createCategories } = useCategoryContext();
	const [category, setCategory] = useState({name: "", description: "" });
	const [show, setShow] = useState(false);

	const handleChage = (event) => {
		const { name, value } = event.target;
		setCategory((prev) => {
			return { ...prev, [name]: value }
		})
	}
	const handleSubmit = async (event) => {
		event.preventDefault();
		await createCategories(category);
		setShow(!show);
	}

	return (
		<>
			<Modal
				show={open}
				onHide={close}
				backdrop="static"
				keyboard={false}
			>
				<Form onSubmit={handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Create Category</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Category name</Form.Label>
							<Form.Control
								type="text"
								name="name"
								placeholder="insert name...."
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
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={close}>
							Close
						</Button>
						<Button variant="primary" type="submit">Create</Button>
					</Modal.Footer>
				</Form>

				{show && <AlertMessage message="category has been created successfully" close={setShow} />}
			</Modal >
		</>
	);
}

export default CreateModal;