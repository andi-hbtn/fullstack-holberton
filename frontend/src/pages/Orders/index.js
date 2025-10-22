import { useState, useEffect } from "react";
import { useOrderContext } from "../../context/OrderContext";
import NavAdmin from "../../components/NavAdmin";
import { Container, Row, Col, Table, Button, Badge, Form, Alert } from "react-bootstrap";
import { FiEye } from "react-icons/fi";

import helpers from "../../helpers/index.js";
import AdminSideBar from "../../components/AdminSideBar";
import OrderModal from "./OrderModal";

const Orders = () => {
	const { orders, updateOrderStatus, filteredOrders } = useOrderContext();
	const [orderId, setOrderId] = useState(0);
	const [searchResults, setSearchResults] = useState(filteredOrders);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setSearchResults(filteredOrders);
	}, [filteredOrders]);



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


	const handleSearch = (event) => {
		const term = event.target.value.toLowerCase();

		if (term === "") {
			setSearchResults(filteredOrders);
			return;
		}

		const results = orders.filter((order) => {
			const sku = helpers.generateSKU(order.id).toLowerCase();
			return sku.includes(term);
		});

		setSearchResults(results);
	}

	return (
		<>
			<div className="admin-dashboard">
				<NavAdmin />
				<Container fluid className="main-content">
					<Row>
						<Col md={3} xl={2} className="sidebar bg-dark text-light">
							<AdminSideBar />
						</Col>

						<Col md={9} xl={10} className="p-4 main-content-area">
							<div className="d-flex justify-content-between align-items-center mb-4">
								<h2 className="page-title">Order Management</h2>


								<Col md={4}>
									<Form.Group className="mb-4" controlId="appartment">
										<Form.Label>Search Order by order-number</Form.Label>
										<Form.Control
											type="text"
											name="orderNumber"
											onChange={handleSearch}
											className="form-input"
										/>
									</Form.Group>
								</Col>
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
										{searchResults.length > 0 ? (
											searchResults.map((order, index) => (
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