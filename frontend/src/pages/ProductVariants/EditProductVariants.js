import { useState, useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const EditProductVariants = ({ show, close, product }) => {
    const { updateProductVariants } = useProductContext();

    const [productVarian, setProductVariant] = useState([]);

    useEffect(() => {
        if (product) {
            const productCopy = JSON.parse(JSON.stringify(product));
            setProductVariant(productCopy.colorVariants);
        }
    }, [product]);

    const handleAddVariant = () => {

    }

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        setProductVariant((prevState) => {
            const updatedVariants = [...prevState];
            updatedVariants[index] = {
                ...updatedVariants[index],
                [name]: value
            }
            return updatedVariants;
        })
    }

    const removeColorVariant = (index) => {

        setProductVariant((prevState) => {
            const updatedVariant = prevState.filter((el, i) => { return i !== index });
            return updatedVariant;
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await updateProductVariants(productVarian);
        return result;
    }

    return (
        <Modal show={show} onHide={close} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add products with colors</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Modal.Body>
                    <Row className="g-3">
                        <Col md={12}>
                            <div className="border p-3 rounded">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5>Color Variants</h5>
                                </div>

                                {productVarian?.map((variant, index) => {
                                    return (
                                        <div key={index} className="mb-3 border-bottom pb-3">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="mb-0">Color #{index + 1}</h6>
                                                <Button variant="link" size="sm" className="text-danger" onClick={() => removeColorVariant(index)} disabled={variant.length === 1}>
                                                    <FaTrash />
                                                </Button>
                                            </div>

                                            <Form.Group className="mb-2">
                                                <Form.Label>Color Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="color"
                                                    value={variant.color}
                                                    required
                                                    onChange={(e) => handleChange(e, index)}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Label>Price (€)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="price"
                                                    value={variant.price}
                                                    step="0.01"
                                                    min="0"
                                                    onChange={(e) => handleChange(e, index)}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Label>Stock Quantity</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="stock"
                                                    value={variant.stock}
                                                    min="0"
                                                    onChange={(e) => handleChange(e, index)}
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Control
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleChange(e, index)}
                                                />
                                                <Image
                                                    src={`${process.env.REACT_APP_API_URL}api/product/uploads/colors/${variant.color_image}`}
                                                    thumbnail
                                                    className="mt-2"
                                                    style={{ maxHeight: '80px' }} />
                                            </Form.Group>

                                            <Form.Group className="mb-2">
                                                <Form.Label>Colored Image</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleChange(e, index)}
                                                />
                                                <Image
                                                    src={`${process.env.REACT_APP_API_URL}api/product/uploads/colors/${variant.main_image}`}
                                                    thumbnail
                                                    className="mt-2"
                                                    style={{ maxHeight: '80px' }} />
                                            </Form.Group>
                                        </div>
                                    )
                                })}
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>Cancel</Button>
                    <Button variant="primary" type="submit" onClick={handleAddVariant}>Add Color Variants</Button>
                </Modal.Footer>
            </Form>
        </Modal >
    )
}

export default EditProductVariants;