import { useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import EditModal from "../../components/modals/author/EditModal";
import CreateModal from "../../components/modals/author/CreateModal";
import { useAuthorContext } from "../../context/AuthorContext";

const Authors = () => {
	const { authors, deleteAuthor } = useAuthorContext();
	const [openEdit, setOpenEdit] = useState(false);
	const [openCreate, setOpeCreate] = useState(false);
	const [author, setAuthor] = useState(useState({ id: 0, name: "", lastname: "" }));

	const handleShow = (data) => {
		setAuthor({ id: data.id, name: data.name, lastname: data.lastname })
		setOpenEdit(!openEdit);
	}

	const handleChage = (event) => {
		const { name, value } = event.target;
		setAuthor((prev) => {
			return { ...prev, [name]: value }
		})
	}

	const handleClose = () => setOpenEdit(!openEdit);
	const closeCreate = () => setOpeCreate(!openCreate);

	const handleCreate = () => {
		setOpeCreate(!openCreate);
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
												<Button variant="primary" onClick={() => { handleShow(el) }}>Edit</Button>
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
				openEdit && <EditModal open={openEdit} handleClose={handleClose} authors={author} handleChage={handleChage} />
			}
			{
				openCreate && <CreateModal open={openCreate} close={closeCreate} />
			}
		</>
	)
}

export default Authors;