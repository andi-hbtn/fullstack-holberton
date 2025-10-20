import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Table, Button, Badge } from "react-bootstrap";
import { FiLogOut, FiBox, FiList, FiShoppingBag, FiHome, FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import { useProductContext } from "../../context/ProductContext";
import { useCategoryContext } from "../../context/CategoryContext";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import ModalManager from "../../components/modals/ModalManager";
import { fields } from "./fields";
import AdminSideBar from "../../components/AdminSideBar";

const ProductModal = () => {
	const { products, createProduct, updateProduct, deleteProduct } = useProductContext();
	const { categories } = useCategoryContext();
	const { authUser, logout } = useAuthenticateContext();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [caseModal, setCaseModal] = useState({ title: "", create: false, button: "" });

	const initialProductData = {
		title: "",
		description: "",
		category_id: 0,
		price: 0,
		stock: 0,
		image: "",
		is_active: true
	};

	const initialCategorytData = {
		id: 0,
		title: "",
		description: "",
		image: "",
	};

	const [formData, setFormData] = useState(
		{
			title: "",
			description: "",
			category_id: 0,
			image: "",
			is_active: true
		}
	);

	const close = () => {
		setFormData(initialProductData || initialCategorytData);
		setOpen(!open);
	};

	const handleCreate = () => {
		setFormData({ ...formData, category_id: categories[0].id, });
		setCaseModal({ title: "Create product", create: true, button: "Create" });
		setOpen(!open);
	}

	const handleEdit = (product) => {
		setFormData(
			{
				id: product.id,
				title: product.title,
				description: product.description,
				reference_number: product.reference_number,
				category_id: product.category_id,
				is_active: product.is_active
			}
		);
		setCaseModal({ title: "Edit product", create: false, button: "Update" })
		setOpen(!open);
	}

	const handleDelete = async (id) => {
		await deleteProduct(id);
	}

	const handleLogout = async () => {
		await logout();
		navigate("/");
	}

	return (
		<>
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
								<Nav.Link as={Link} to="/admin-category" className="nav-link">
									<FiList className="me-1" />
									Categories
								</Nav.Link>
								<Nav.Link as={Link} to="/admin-products" className="nav-link active">
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
							<AdminSideBar />
						</Col>

						<Col md={9} xl={10} className="p-4 main-content-area">
							<div className="d-flex justify-content-between align-items-center mb-4">
								<h2 className="page-title">Product Management</h2>
								<Button variant="primary" className="rounded-pill" onClick={handleCreate}>
									<FiPlus className="me-2" />
									Add New Product
								</Button>
							</div>

							<div className="custom-card p-4 shadow-sm">
								<Table hover responsive className="product-table">
									<thead className="table-header">
										<tr>
											<th>ID</th>
											<th>Product</th>
											<th>Reference</th>
											<th>Category</th>
											<th>Status</th>
											<th>Image</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{products.map((product, index) => (
											<tr key={index} className="table-row">
												<td className="text-muted">#{product.id}</td>
												<td>
													<div className="d-flex align-items-center">
														<div>
															<h6 className="mb-0">{product.title}</h6>
															<small className="text-muted">
																{product.description.substring(0, 40)}...
															</small>
														</div>
													</div>
												</td>
												<td>{product?.reference_number}</td>
												<td>
													<Badge bg="secondary" className="category-badge">
														{product.category.title}
													</Badge>
												</td>
												<td>
													<Badge bg={product.is_active === true ? 'success' : 'secondary'}>
														{product.is_active === true ? 'Active' : 'Not Active'}
													</Badge>
												</td>
												<td>
													<img src={`${process.env.REACT_APP_API_URL}api/product/uploads/${product.image}`} alt="figure" width={"100px"} height={"100px"} />
												</td>
												<td>
													<Button
														variant="outline-primary"
														size="sm"
														className="me-2 action-btn"
														onClick={() => handleEdit(product)}
													>
														<FiEdit />
													</Button>
													<Button
														variant="outline-primary"
														size="sm"
														className="me-2 action-btn"
														onClick={() => handleDelete(product.id)}
													>
														<FiTrash />
													</Button>
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
					create={createProduct}
					update={updateProduct}
					data={formData}
					setData={setFormData}
					categories={categories}
				/>}

				<Button
					variant="primary"
					className="floating-action-btn rounded-circle"
					onClick={handleCreate}
				>
					<FiPlus size={24} />
				</Button>
			</div>
		</>
	)
}

export default ProductModal;
