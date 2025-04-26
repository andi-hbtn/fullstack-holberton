import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Table, Button } from "react-bootstrap";
import { useCategoryContext } from "../../context/CategoryContext";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import ModalManager from "../../components/modals/ModalManager";
import { fields } from "./fields";
import dateUtils from "../../helpers/dateTime.js";

const Categories = () => {
	const { categories, createCategories, updateCategory, deleteCategorie } = useCategoryContext();
	const { authUser, logout } = useAuthenticateContext();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [caseModal, setCaseModal] = useState({ title: "", create: false, button: "" });
	const [formData, setFormData] = useState({ id: 0, title: "", description: "" });
	const close = () => setOpen(!open);

	const handleCreate = () => {
		setFormData({});
		setCaseModal({ title: "Create Category", create: true, button: "Create" });
		setOpen(!open);
	}

	const handleEdit = (category) => {
		setFormData(
			{ id: category.id, title: category.title, description: category.description }
		);
		setCaseModal({ title: "Edit Category", create: false, button: "Update" })
		setOpen(!open);
	}

	const handleDelete = async (id) => {
		await deleteCategorie(id);
	}

	const handleLogout = async () => {
		await logout();
		navigate("/");
	}

	return (
		<>
			<Navbar bg="primary" variant="dark" expand="lg">
				<Navbar.Brand as={Link} to="">Admin Dashboard</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/admin-category">Categories</Nav.Link>
						<Nav.Link as={Link} to="/admin-products">Products</Nav.Link>
						<Nav.Link as={Link} to="/admin-orders">Orders</Nav.Link>
						<Nav.Link as={Link} to="/">Home</Nav.Link>
					</Nav>
					<Nav className="d-flex">
						{
							authUser ?
								<>
									<Nav>
										<Button variant="danger" className="logout-btn" onClick={handleLogout}>Logout</Button>
									</Nav>
								</>
								:
								""
						}
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
							<h4>Create a new Category <Button variant="primary" onClick={handleCreate}>Create</Button></h4>
						</Col>
						<Col md={12} className="mb-4">
							<Table striped>
								<thead>
									<tr>
										<th>Id</th>
										<th>Name</th>
										<th>Description</th>
										<th>Created at</th>
										<th>Image</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{
										categories.map((category, index) => {
											return (
												<tr key={index}>
													<td>{category.id}</td>
													<td>{category.title}</td>
													<td>{category.description}</td>
													<td>{dateUtils.formatIsoDateTime(category.created)}</td>
													<td>
														<img className="small-img" src={`${process.env.REACT_APP_API_URL}api/category/uploads/${category.image}`} alt="category alt" width={"60px"} height={"60px"} />
													</td>
													<td>
														<Button variant="primary" onClick={() => { handleEdit(category) }}>Edit</Button>
													</td>
													<td>
														<Button variant="danger" onClick={() => { handleDelete(category.id) }}>Delete</Button>
													</td>
												</tr>
											)
										})}
								</tbody>
							</Table>
						</Col>
						{
							open && <ModalManager
								open={open}
								close={close}
								fields={fields}
								case_modal={caseModal}
								create={createCategories}
								update={updateCategory}
								data={formData}
								setData={setFormData}
							/>
						}
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Categories;