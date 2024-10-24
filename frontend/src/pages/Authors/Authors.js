import { useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useAuthorContext } from "../../context/AuthorContext";
import ModalManager from "../../components/modals/ModalManager";
import { fields } from "./fields";

const Authors = () => {
	const { authors, createAuthor, deleteAuthor, updateAuthor } = useAuthorContext();
	const [open, setOpen] = useState(false);
	const [caseModal, setCaseModal] = useState({ title: "", create: false, button: "" });
	const [dataId, setDataId] = useState({});

	const close = () => setOpen(!open);

	const handleCreate = () => {
		setCaseModal({ title: "Create Author", create: true, button: "Create" });
		setOpen(!open);
	}

	const handleEdit = (id) => {
		setDataId(id);
		setCaseModal({ title: "Edit Author", create: false, button: "Update" })
		setOpen(!open);
	}

	const handleDelete = async (id) => {
		await deleteAuthor(id);
	}

	return (
		<>
			<Row>
				<Col md={12} className="mb-4">
					<h4>Create a new Author <Button variant="primary" onClick={handleCreate}>Create</Button></h4>
				</Col>
				<Col md={12} className="mb-4">
					<Table striped>
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Lastname</th>
								<th>Created at</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								authors.map((el, index) => {
									return (
										<tr key={index}>
											<td>{el.id}</td>
											<td>{el.name}</td>
											<td>{el.lastname}</td>
											<td>{el?.created}</td>
											<td>
												<Button variant="primary" onClick={() => { handleEdit(el.id) }}>Edit</Button>
											</td>
											<td>
												<Button variant="danger" onClick={() => { handleDelete(el.id) }}>Delete</Button>
											</td>
										</tr>
									)
								})}
						</tbody>
					</Table>
				</Col>
			</Row>
			{
				open && <ModalManager
					open={open}
					close={close}
					fields={fields}
					case_modal={caseModal}
					id={dataId}
					create={createAuthor}
					update={updateAuthor} />
			}
		</>
	)
}

export default Authors;