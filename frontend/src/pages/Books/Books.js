import { useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useBookContext } from "../../context/BookContext";
import ModalManager from "../../components/modals/ModalManager";
import { fields } from "./fields";
const Books = () => {
	const { books, createBook, updateBook, deleteBook } = useBookContext();
	const [open, setOpen] = useState(false);
	const [caseModal, setCaseModal] = useState({ title: "", create: false, button: "" });
	const [dataId, setDataId] = useState({});

	const close = () => setOpen(!open);

	const handleCreate = () => {
		setCaseModal({ title: "Create Book", create: true, button: "Create" });
		setOpen(!open);
	}

	const handleEdit = (id) => {
		setDataId(id);
		setCaseModal({ title: "Edit Book", create: false, button: "Update" })
		setOpen(!open);
	}

	const handleDelete = async (id) => {
		await deleteBook(id);
	}

	return (
		<>
			<Row>
				<Col md={12} className="mb-4">
					<h4>Create a new Book <Button variant="primary" onClick={handleCreate}>Create</Button></h4>
				</Col>
				<Col md={12} className="mb-4">
					<Table striped>
						<thead>
							<tr>
								<th>Id</th>
								<th>Title</th>
								<th>Description</th>
								<th>Price</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								books.map((book, index) => {
									return (
										<tr key={index}>
											<td>{book.id}</td>
											<td>{book.title}</td>
											<td>{book.description}</td>
											<td>${book?.price}</td>
											<td>
												<Button variant="primary" onClick={() => { handleEdit(book.id) }}>Edit</Button>
											</td>
											<td>
												<Button variant="danger" onClick={() => { handleDelete(book.id) }}>Delete</Button>
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
					create={createBook}
					update={updateBook} />
			}
		</>
	)
}

export default Books;