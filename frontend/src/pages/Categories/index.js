import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Table, Button, Badge } from "react-bootstrap";
import { FiLogOut, FiBox, FiList, FiShoppingBag, FiHome, FiSettings, FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import { useCategoryContext } from "../../context/CategoryContext";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import ModalManager from "../../components/modals/ModalManager";
import { fields } from "./fields";
import dateUtils from "../../helpers/dateTime.js";
import "./index.css";

const Categories = () => {
	const { categories, createCategories, updateCategory, deleteCategorie } = useCategoryContext();
	const { authUser, logout } = useAuthenticateContext();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [caseModal, setCaseModal] = useState({ title: "", create: false, button: "" });
	const [formData, setFormData] = useState({ id: 0, title: "", description: "", image: "" });
	const close = () => setOpen(!open);

	const handleCreate = () => {
		setFormData({});
		setCaseModal({ title: "Create Category", create: true, button: "Create" });
		setOpen(!open);
	}

	const handleEdit = (category) => {
		setFormData(
			{ id: category.id, title: category.title, description: category.description, image: category.image }
		);
		setCaseModal({ title: "Edit Category", create: false, button: "Update" })
		setOpen(!open);
	}

	const handleDelete = async (id) => {
		try {
			const result = await deleteCategorie(id);
		} catch (error) {
			console.log("error----", error);
		}
	}

	const handleLogout = async () => {
		await logout();
		navigate("/");
	}

	return (
		<div className="admin-dashboard">
			<Navbar bg="dark" variant="dark" expand="lg" className="admin-navbar">
				<Container fluid>
					<Navbar.Brand as={Link} to="/products" className="d-flex align-items-center">
						<FiBox className="me-2" />
						<span className="brand-text">Admin Panel</span>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={Link} to="/admin-category" className="nav-link active">
								<FiList className="me-1" />
								Categories
							</Nav.Link>
							<Nav.Link as={Link} to="/admin-products" className="nav-link">
								<FiShoppingBag className="me-1" />
								Products
							</Nav.Link>
							<Nav.Link as={Link} to="/admin-product-with-colors" className="nav-link">
								<FiBox className="me-1" />
								Product Colors
							</Nav.Link>
							<Nav.Link as={Link} to="/admin-orders" className="nav-link active">
								<FiBox className="me-1" />
								Orders
							</Nav.Link>
							<Nav.Link as={Link} to="/" className="nav-link">
								<FiHome className="me-1" />
								Home
							</Nav.Link>
							<Nav.Link as={Link} to="/forgot-password" className="nav-link">
								<CiLock className="me-1" />
								Forgot password
							</Nav.Link>
						</Nav>
						<Nav>
							{authUser && (
								<Button variant="outline-light" onClick={handleLogout} className="logout-btn">
									<FiLogOut className="me-2" />
									Logout
								</Button>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Container fluid className="main-content">
				<Row>
					<Col md={3} xl={2} className="sidebar bg-dark text-light">
						<div className="sidebar-sticky pt-4">
							<h4 className="px-3 mb-4">Quick Actions</h4>
							<Nav className="flex-column">
								<Nav.Link as={Link} to="/reports" className="nav-link text-light">
									<FiSettings className="me-2" />
									Reports
								</Nav.Link>
								<Nav.Link as={Link} to="/settings" className="nav-link text-light">
									<FiSettings className="me-2" />
									Settings
								</Nav.Link>
							</Nav>
							<div className="sidebar-stats mt-5 px-3">
								<div className="stat-item">
									<small className="text-muted">Active Categories</small>
									<h3 className="text-success">{categories.filter(c => c.status === 'active').length}</h3>
								</div>
							</div>
						</div>
					</Col>

					<Col md={9} xl={10} className="p-4 main-content-area">
						<div className="d-flex justify-content-between align-items-center mb-4">
							<h2 className="page-title">Category Management</h2>
							<Button variant="primary" className="rounded-pill" onClick={handleCreate}>
								<FiPlus className="me-2" />
								Add New Category
							</Button>
						</div>

						<div className="custom-card p-4 shadow-sm">
							<Table hover responsive className="category-table">
								<thead className="table-header">
									<tr>
										<th>ID</th>
										<th>Category</th>
										<th>Created At</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{categories.map((category, index) => (
										<tr key={index} className="table-row">
											<td className="text-muted">#{category.id}</td>
											<td>
												<div className="d-flex align-items-center">
													<img
														src={`${process.env.REACT_APP_API_URL}api/category/uploads/${category.image}`}
														alt="category"
														className="category-img rounded-circle me-3"
													/>
													<h6 className="mb-0">{category.title}</h6>
												</div>
											</td>
											<td>
												<Badge bg="secondary">
													{dateUtils.formatIsoDateTime(category.created)}
												</Badge>
											</td>
											<td>
												<div className="d-flex gap-2">
													<Button
														variant="outline-primary"
														size="sm"
														className="action-btn"
														onClick={() => handleEdit(category)}
													>
														<FiEdit />
													</Button>
													<Button
														variant="outline-danger"
														size="sm"
														className="action-btn"
														onClick={() => handleDelete(category.id)}
													>
														<FiTrash2 />
													</Button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					</Col>
				</Row>
			</Container>

			{open && <ModalManager
				open={open}
				close={close}
				fields={fields}
				case_modal={caseModal}
				create={createCategories}
				update={updateCategory}
				data={formData}
				setData={setFormData}
			/>}

			<Button
				variant="primary"
				className="floating-action-btn rounded-circle"
				onClick={handleCreate}
			>
				<FiPlus size={24} />
			</Button>
		</div>
	)
}

export default Categories;