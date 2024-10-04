import axios from 'axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap/';

const CreatePost = () => {


	const [post, setPost] = useState({ title: "", description: "", price: "", is_active: false });


	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.post("http://localhost:3000/api/posts/create", post);
	}

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setPost((prevState) => {
			return { ...prevState, [name]: value }
		});
	}

	return (
		<>
			<Form style={{ width: "50%", margin: "0 auto" }} onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control type="text" placeholder="Enter title" onChange={handleChange} value={post.title} name="title" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="description">
					<Form.Label>Description</Form.Label>
					<Form.Control type="text" placeholder="Enter description" onChange={handleChange} value={post.description} name="description" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="price">
					<Form.Label>Price</Form.Label>
					<Form.Control type="number" placeholder="Enter price" onChange={handleChange} value={post.price} name="price" />
				</Form.Group>


				<Form.Group className="mb-3" controlId="enable">
					<Form.Label> {post.is_active === true ? "Enable" : "Disable"} </Form.Label>
					<Form.Check type="checkbox" label="is active" onChange={handleChange} value={post.is_active} name="is_active" />
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</>
	);
}

export default CreatePost;