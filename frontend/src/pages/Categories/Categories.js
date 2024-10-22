import { useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import EditModal from "../../components/modals/category/EditModal";
import CreateModal from "../../components/modals/category/CreateModal";
import { useCategoryContext } from "../../context/CategoryContext";

const Categories = () => {
	const { categories, deleteCategorie } = useCategoryContext();
	const [openEdit, setOpenEdit] = useState(false);
	const [openCreate, setOpeCreate] = useState(false);
	const [category, setCategory] = useState(useState({ id: 0, name: "", description: "" }));

	const handleShow = (data) => {
		setCategory({ id: data.id, name: data.name, description: data.description })
		setOpenEdit(!openEdit);
	}

	const handleChage = (event) => {
		const { name, value } = event.target;
		setCategory((prev) => {
			return { ...prev, [name]: value }
		})
	}

	const closeEdit = () => setOpenEdit(!openEdit);
	const closeCreate = () => setOpeCreate(!openCreate);


	const handleDelete = async (id) => {
		await deleteCategorie(id);
	}

	const handleCreate = () => {
		setOpeCreate(!openCreate);
	}

	return (
		<>
			<Row>
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
												<Button variant="danger" onClick={() => { handleDelete(category.id) }}>Delete</Button>
											</td>
										</tr>
									)
								})}
						</tbody>
					</Table>
				</Col>
			</Row>
			{
				openEdit && <EditModal open={openEdit} handleShow={handleShow} close={closeEdit} category={category} handleChage={handleChage} />
			}
			{
				openCreate && <CreateModal open={openCreate} close={closeCreate} />
			}
		</>
	)
}

export default Categories;