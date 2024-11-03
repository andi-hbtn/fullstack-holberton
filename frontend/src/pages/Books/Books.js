import { useState } from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Table, Button } from "react-bootstrap";
import { useBookContext } from "../../context/BookContext";
import ModalManager from "../../components/modals/ModalManager";
import { fields } from "./fields";
const Books = () => {
	const { books, categories, authors, createBook, updateBook, deleteBook } = useBookContext();
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

	console.log("book----", books);

	return (
		<>
			<Navbar bg="primary" variant="dark" expand="lg">
				<Navbar.Brand as={Link} to="/books">Admin Dashboard</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/authors">Authors</Nav.Link>
						<Nav.Link as={Link} to="/category">Categories</Nav.Link>
						<Nav.Link as={Link} to="/books">Books</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Container fluid>
				<Row>
					<Col md={2} className="bg-light sidebar">
						<h4 className="p-3">Navigation</h4>
						<Nav defaultActiveKey="/home" className="flex-column">
							<Nav.Link as={Link} to="/reports">Reports</Nav.Link>
							<Nav.Link as={Link} to="/settings">Settings</Nav.Link>
						</Nav>
					</Col>
					<Col md={10} className="p-4">
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
										<th>Category</th>
										<th>Author</th>
										<th>Price</th>
										<th>Status</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{
										books.map((book, index) => {
											console.log("book----", book);
											return (
												<tr key={index}>
													<td>{book.id}</td>
													<td>{book.title}</td>
													<td>{book.description}</td>

													<td>{book.category.name}</td>
													<td>{book.author.name}</td>

													<td>${book?.price}</td>
													<td>{book.is_active ? "Is available" : "Not available"}</td>
													<td>
														<Button variant="primary" onClick={() => { handleEdit(book.id) }}>Edit</Button>
													</td>
													<td>
														<Button variant="danger" onClick={() => { handleDelete(book.id) }}>Delete</Button>
													</td>
												</tr>
											)
										})
									}
								</tbody>
							</Table>
						</Col>
						{
							open && <ModalManager
								open={open}
								close={close}
								fields={fields}
								case_modal={caseModal}
								id={dataId}
								create={createBook}
								update={updateBook}
								categories={categories}
								authors={authors} />
						}
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Books;