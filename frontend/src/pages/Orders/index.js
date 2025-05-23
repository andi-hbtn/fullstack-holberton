import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { useCartContext } from "../../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Table, Button, Badge } from "react-bootstrap";
import { FiLogOut, FiBox, FiList, FiShoppingBag, FiHome, FiSettings, FiEdit, FiPlus } from "react-icons/fi";
import { CiLock } from "react-icons/ci";

const Orders = () => {
	const { authUser, logout } = useAuthenticateContext();
	const { orders } = useCartContext();
	const navigate = useNavigate();

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
									<div className="stat-item mb-3">
										<small className="text-muted">Total Products</small>
										<h3 className="text-primary"></h3>
									</div>
									<div className="stat-item">
										<small className="text-muted">Active Orders</small>
										<h3 className="text-success">24</h3>
									</div>
								</div>
							</div>
						</Col>

						<Col md={9} xl={10} className="p-4 main-content-area">
							<div className="d-flex justify-content-between align-items-center mb-4">
								<h2 className="page-title">Product Color Management</h2>
								<Button variant="primary" className="rounded-pill">
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
											<th>Category</th>
											<th>Price</th>
											<th>Stock</th>
											<th>Status</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										<tr className="table-row">
											<td className="text-muted">#</td>
											<td>
												<div className="d-flex align-items-center">
													<img
														src=''
														alt="product"
														className="product-img rounded-circle me-3"
													/>
													<div>
														<h6 className="mb-0"></h6>
														<small className="text-muted">
															...
														</small>
													</div>
												</div>
											</td>
											<td>
												<Badge bg="secondary" className="category-badge">

												</Badge>
											</td>
											<td>
												<div className="color-options">
													<h6 className="mb-0"></h6>
												</div>
											</td>
											<td>
												<div className="color-options">
													<h6 className="mb-0"></h6>
												</div>
											</td>
											<td>
												<Badge bg='success' >

												</Badge>
											</td>
											<td>
												<Button
													variant="outline-primary"
													size="sm"
													className="me-2 action-btn"

												>
													<FiEdit />
												</Button>
											</td>
										</tr>
									</tbody>
								</Table>
							</div>
						</Col>
					</Row>
				</Container>
				<Button
					variant="primary"
					className="floating-action-btn rounded-circle"
				>
					<FiPlus size={24} />
				</Button>
			</div>
		</>
	)
}

export default Orders;