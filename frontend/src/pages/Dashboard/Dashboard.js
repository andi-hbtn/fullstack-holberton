import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Categories from "../../pages/Categories/Categories";
import Authors from '../../pages/Authors/Authors';
import Books from "../../pages/Books/Books";

import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import "./index.css";

const Dashboard = () => {

	return (
		< Router >
			<div>
				<Navbar bg="primary" variant="dark" expand="lg">
					<Navbar.Brand as={Link} to="/">Admin Dashboard</Navbar.Brand>
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
							<Routes>
								<Route path="/authors" element={<Authors />} />
								<Route path="/category" element={<Categories />} />
								<Route path="/books" element={<Books />} />
							</Routes>
						</Col>
					</Row>
				</Container>
			</div>
		</Router >
	);
};
export default Dashboard;