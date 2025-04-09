import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Table, Button } from "react-bootstrap";
import { useProductContext } from "../../context/ProductContext";
import { useCategoryContext } from "../../context/CategoryContext";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import ModalManager from "../../components/modals/ModalManager";
import { fields } from "./fields";
import "./index.css";


const ProductModal = () => {
	const { products, createProduct , updateProduct } = useProductContext();
	const {categories} = useCategoryContext();
	const{ authUser,logout } = useAuthenticateContext();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [caseModal, setCaseModal] = useState({ title: "", create: false, button: "" });
	const [formData,setFormData] = useState({ id: 0, title: "", description: "", category_id : 0,price : 0,stock : 0,image : "", is_active:false});

	const close = () => setOpen(!open);

	const handleCreate = () => {
		setFormData({});
		setCaseModal({ title: "Create product", create: true, button: "Create" });
		setOpen(!open);
	}
	

	const handleEdit = (product) => {
		setFormData(
			{
				id: product.id,
				title: product.title,
				description: product.description,
				category_id: product.category_id,
				price: product.price,
				stock: product.stock,
				image: product.image,
				is_active: product.is_active
			}
		);
		setCaseModal({ title: "Edit product", create: false, button: "Update" })
		setOpen(!open);
	}

	const handleLogout = async() =>{
		await logout();
		navigate("/login");
	}

	return (
		<>
			<Navbar bg="primary" variant="dark" expand="lg">
				<Navbar.Brand as={Link} to="/products">Admin Dashboard</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
					<Nav.Link as={Link} to="/admin-category">Categories</Nav.Link>
					<Nav.Link as={Link} to="/admin-products">Products</Nav.Link>
					</Nav>
					<Nav className="d-flex">
					{
							authUser ?
							<>
							<Nav>
							<Button variant="danger" className="logout-btn" onClick={handleLogout}>Logout</Button>
							</Nav>
							<div className="user-auth">
								<span>
									{
										authUser.name?.charAt(0) +""+ authUser.lastname?.charAt(0) 
									}
								</span>
							</div>
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
							<h4>Create a new Product <Button variant="primary" onClick={handleCreate}>Create</Button></h4>
						</Col>
						<Col md={12} className="mb-4">
							<Table striped>
								<thead>
									<tr>
										<th>Id</th>
										<th>Title</th>
										<th>Description</th>
										<th>Category</th>
										<th>Price</th>
										<th>Status</th>
										<th>Stock</th>
										<th>Image</th>
										<th>Edit</th>
									</tr>
								</thead>
								<tbody>
									{
										products.map((product, index) => {
											return (
												<tr key={index}>
													<td>{product.id}</td>
													<td className="col-2">{product.title}</td>
													<td className="col-2">{product.description.substring(0, 50)}</td>
													<td className="col-2">{product.category.name}</td>
													<td>${product?.price}</td>
													<td>{product.is_active ? "Is available" : "Not available"}</td>
													<td>
														{product.stock}
													</td>
													<td>
														<img className="small-img" src={`http://localhost:3000/api/product/uploads/${product.image}`} alt="product alt" width={"60px"} height={"60px"}/>
													</td>
													<td>
														<Button variant="primary" onClick={() => { handleEdit(product) }}>Edit</Button>
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
								create={createProduct}
								update={updateProduct}
								data={formData}
								setData={setFormData}
								categories={categories}
								/>
						}
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default ProductModal;