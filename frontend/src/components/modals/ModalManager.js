import { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import AlertMessage from "../alert/AlertMessage";

const ModalManager = ({ open, categories, authors, close, case_modal, id, fields, create, update }) => {
	const [formData, setFormData] = useState({});
	const [show, setShow] = useState(false);

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;
		setFormData((prev) => {
			return { ...prev, [name]: type === "checkbox" ? checked : value, };
		});
	}

	const onSubmit = async (event) => {
		event.preventDefault();
		if (case_modal.create) {
			await create(formData);
		} else {
			await update(id, formData)
		}
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
				<Form onSubmit={onSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>{case_modal.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{
							fields.map((field, index) => {
								//console.log("field----",field.name);
								return (
									<>
										{
											field.name === "category_id" ?
												(
													<Form.Group key={index} className="mb-3">
														<Form.Select name={field.name} onChange={handleChange} aria-label="Default select example">
															{
																categories.map((category, i) => {
																	return (
																		<option key={i} value={category.id}>{category.name}</option>
																	)
																})
															}
														</Form.Select>
													</Form.Group>
												)

												: field.name === "author_id" ?
													(
														<Form.Group key={index} className="mb-3">
															<Form.Select name={field.name} onChange={handleChange} aria-label="Default select example">
																{
																	authors.map((author, i) => {
																		return (
																			<option key={i} value={author.id}>{author.name}</option>
																		)
																	})
																}
															</Form.Select>
														</Form.Group>
													)
													: field.name === "is_active" ?
														<Form.Group key={index} className="mb-3">
															<Form.Check
																name={field.name}
																type={field.type}
																label={field.label}
																checked={formData[field.name]}
																onChange={handleChange}
															/>
														</Form.Group>
														:
														(
															<Form.Group key={index} className="mb-3">
																<Form.Label>{field.label}</Form.Label>
																<Form.Control
																	type={field.type}
																	name={field.name}
																	placeholder={field.placeholder}
																	onChange={handleChange}
																	value={formData[field.name]}
																/>
															</Form.Group>
														)
										}
									</>
								)
							}
							)}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={close}>
							Close
						</Button>
						<Button variant="primary" type="submit">{case_modal.button}</Button>
					</Modal.Footer>
				</Form>
				{show && <AlertMessage message={`${case_modal.title.split(' ')[1]} has been ${case_modal.create ? "created" : "updated"} successfully`} close={setShow} />}
			</Modal >
		</>
	);
}

export default ModalManager;