import { useState } from "react";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { useOrderContext } from "../../context/OrderContext";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Table, Button, Badge, Form, Alert } from "react-bootstrap";
import { FiLogOut, FiBox, FiList, FiShoppingBag, FiHome, FiEye } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import helpers from "../../helpers/index.js";
import AdminSideBar from "../../components/AdminSideBar";
import OrderModal from "./OrderModal";

const Orders = () => {
	const { authUser, logout } = useAuthenticateContext();
	const { orders, updateOrderStatus, filteredOrders } = useOrderContext();
	const [orderId, setOrderId] = useState(0);
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);

	const handleLogout = async () => {
		await logout();
		navigate("/");
	}

	const handleOpen = (id) => {
		setOrderId(id);
		setOpen(!open);
	}

	const handleClose = () => {
		setOpen(!open);
	}

	const handleStatusChange = async (orderId, newStatus) => {
		try {
			await updateOrderStatus(orderId, newStatus);
		} catch (error) {
			console.error('Error updating order status:', error);
			return error
		}
	};

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
								<h2 className="page-title">Order Management</h2>
							</div>

							<div className="custom-card p-4 shadow-sm">
								<Table hover responsive className="product-table">
									<thead className="table-header">
										<tr>
											<th>ID</th>
											<th>Order Number</th>
											<th>Product</th>
											<th>Price</th>
											<th>Created at</th>
											<th>Status</th>
											<th>Open</th>
											<th>Edit</th>
										</tr>
									</thead>
									<tbody>
										{filteredOrders.length > 0 ? (
											filteredOrders.map((order, index) => (
												<tr key={index} className="table-row">
													<td className="text-muted justify-content-center">#{order.id}</td>
													<td>
														<div className="d-flex justify-content-center">{helpers.generateSKU(order.id)}</div>
													</td>
													<td>
														<div className="d-flex justify-content-center">
															{order.orderItems.map((product, pkey) => (
																<div key={pkey} className="d-flex align-items-center me-2">
																	<img
																		src={`${process.env.REACT_APP_API_URL}api/product/uploads/colors/${product?.main_image}`}
																		alt="product"
																		className="product-img rounded-circle me-2"
																		style={{ width: "40px", height: "40px" }}
																	/>
																	<h6 className="mb-0">{product.color}</h6>
																</div>
															))}
														</div>
													</td>
													<td>
														<div className="d-flex justify-content-center">
															<h6 className="mb-0">{order.total_price}</h6>
														</div>
													</td>
													<td>
														<div className="d-flex justify-content-center">
															<h6 className="mb-0">{new Date(order.created_at).toLocaleDateString()}</h6>
														</div>
													</td>
													<td>
														<div className="d-flex justify-content-center">
															<Badge bg="success">{order.status}</Badge>
														</div>
													</td>
													<td>
														<div className="d-flex justify-content-center">
															<Button
																variant="outline-primary"
																size="sm"
																className="me-2 action-btn"
																onClick={() => handleOpen(order.id)}
															>
																<FiEye />
															</Button>
														</div>
													</td>
													<td>
														<div className="d-flex justify-content-center">
															<Form.Select
																value={order.status}
																onChange={(e) => handleStatusChange(order.id, e.target.value)}
																style={{
																	cursor: "pointer",
																	width: "fit-content",
																	appearance: "none",
																	padding: "0.25rem 1.5rem 0.25rem 0.75rem",
																}}
															>
																<option value="pending">Pending</option>
																<option value="shipped">Shipped</option>
																<option value="delivered">Delivered</option>
																<option value="cancelled">Cancelled</option>
															</Form.Select>
														</div>
													</td>
												</tr>
											))
										) : (
											<tr>
												<td colSpan="8">
													<div className="d-flex justify-content-center py-4">
														<Alert variant="secondary" className="mb-0 text-center w-75">
															No orders found for this status.
														</Alert>
													</div>
												</td>
											</tr>
										)}
									</tbody>
								</Table>
							</div>
						</Col>
					</Row>
				</Container>
			</div >
			<OrderModal open={open} close={handleClose} orders={orders} id={orderId} />
		</>
	)
}

export default Orders;