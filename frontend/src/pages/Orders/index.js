import { useState } from "react";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { useCartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Table, Button } from "react-bootstrap";


const Orders = () => {
	const { authUser, logout } = useAuthenticateContext();
	const { orders } = useCartContext();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/");
	}


	console.log("orders----", orders);

	return (
		<>
			<Navbar bg="primary" variant="dark" expand="lg">
				<Navbar.Brand as={Link} to="/products">Admin Dashboard</Navbar.Brand>
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
								<Nav>
									<Button variant="danger" className="logout-btn" onClick={handleLogout}>Logout</Button>
								</Nav>
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
							<h4>Orders section</h4>
						</Col>
						<Col md={12} className="mb-4">
							<Table striped>
								<thead>
									<tr>
										<th>Order Id</th>
										<th>Total Price</th>
										<th>Status</th>
										<th>Created</th>
										<th>Email</th>

									</tr>
								</thead>
								<tbody>
									{
										orders.map((order, index) => {
											return (
												<tr key={index}>
													<td>{order.id}</td>
													<td className="col-2">{order.total_price}</td>
													<td className="col-2">{order.status}</td>
													<td className="col-2">{order.createdAt}</td>
													<td>{order?.user.email}</td>
												</tr>
											)
										})
									}
								</tbody>
							</Table>
						</Col>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Orders;