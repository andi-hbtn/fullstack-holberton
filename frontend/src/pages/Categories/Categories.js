import { useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import EditModal from "../../components/modals/EditModal";
import { useCategoryContext } from "../../context/CategoryContext";
const Categories = () => {
	const { categories } = useCategoryContext();
	const [open, setOpen] = useState(false);
	const [category, setCategory] = useState(useState({ id: 0, name: "", description: "" }));

	const handleShow = (data) => {
		setCategory({ id: data.id, name: data.name, description: data.description })
		setOpen(!open);
	}

	const handleChage = (event) => {
		const { name, value } = event.target;
		setCategory((prev) => {
			return { ...prev, [name]: value }
		})
	}

	const handleClose = () => setOpen(!open);

	return (
		<>
			<Row>
				<Col md={12} className="mb-4">
					<Table striped>
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Description</th>
								<th>Created at</th>
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
											<td>{category.name}</td>
											<td>{category.description}</td>
											<td>{category?.created}</td>
											<td>
												<Button variant="primary" onClick={() => { handleShow(category) }}>Edit</Button>
											</td>
											<td>
												<Button variant="danger">Delete</Button>
											</td>
										</tr>
									)
								})}
						</tbody>
					</Table>
				</Col>

			</Row>

			{
				open && <EditModal open={open} handleShow={handleShow} handleClose={handleClose} category={category} handleChage={handleChage} />
			}
		</>
	)
}

export default Categories;