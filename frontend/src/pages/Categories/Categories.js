import { useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useCategoryContext } from "../../context/CategoryContext";
import ModalManager from "../../components/modals/ModalManager";
import { fields } from "./fields";
const Categories = () => {
	const { categories, createCategories, updateCategory, deleteCategorie } = useCategoryContext();
	const [open, setOpen] = useState(false);
	const [caseModal, setCaseModal] = useState({ title: "", create: false, button: "" });
	const [dataId, setDataId] = useState({});

	const close = () => setOpen(!open);

	const handleCreate = () => {
		setCaseModal({ title: "Create Book", create: true, button: "Create" });
		setOpen(!open);
	}

	const handleEdit = (id) => {
		setDataId(id);
		setCaseModal({ title: "Edit Book", create: false, button: "Update" })
		setOpen(!open);
	}

	const handleDelete = async (id) => {
		await deleteCategorie(id);
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
												<Button variant="primary" onClick={() => { handleEdit(category.id) }}>Edit</Button>
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
				open && <ModalManager
					open={open}
					close={close}
					fields={fields}
					case_modal={caseModal}
					id={dataId}
					create={createCategories}
					update={updateCategory} />
			}
		</>
	)
}

export default Categories;