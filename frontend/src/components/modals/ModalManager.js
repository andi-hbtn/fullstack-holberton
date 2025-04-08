import { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import AlertMessage from "../alert/AlertMessage";

const ModalManager = ({ open, categories, close, case_modal, fields, create, update,data,setData }) => {

	const [show, setShow] = useState(false);

	const onSubmit = async (event) => {
		event.preventDefault();


		// console.log("data-----",data);

		if (case_modal.create) {
			await create(data);
		} else {
			await update({...data})
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
				<Form onSubmit={onSubmit} encType="multipart/form-data">
					<Modal.Header closeButton>
						<Modal.Title>{case_modal.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{
							fields.map((field, index) => {
								console.log("field----",data[field.name]);
								return(
									<Form.Group key={index} className="mb-3">
										{
											field.name === "category_id" ?
												<Form.Select name={field.name} onChange={()=>{ return setData()}} aria-label="Default select example">
													{
														categories.map((category, i) => {
															return (
																<option key={i} value={category.id}>{category.name}</option>
															)
														})
													}
												</Form.Select>
											: field.name === "image" ?
												<>
													<Form.Label>{field.label}</Form.Label>
													<Form.Control
														type={field.type}
														name={field.name}
														onChange={()=>{return setData()}}
													/>
												</>	
											: field.name === "is_active" ?
												<>
													<Form.Check
														name={field.name}
														type={field.type}
														label={field.label}
														checked={data[field.name]}
														onChange={()=>{ return setData()}}
													/>
												</>
											:
											<>
												<Form.Label>{field.label}</Form.Label>
												<Form.Control
													type={field.type}
													name={field.name}
													placeholder={field.placeholder}
													onChange={()=>{ return setData()}}
													value={data[field.name]}
												/>
											</>
										}
									</Form.Group>
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