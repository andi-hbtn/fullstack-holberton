import { useState } from "react";
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useProductContext } from "../../context/ProductContext";

const ProductColorModal = ({ show, close, data, setData }) => {

    const { uploadColorProduct } = useProductContext();
    const [resMsg, setResMsg] = useState({ error: false, message: "", status: 0 });

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        if (index !== undefined) {
            const updatedVariants = [...data.colorVariants];
            updatedVariants[index][name] = value;
            setData({ ...data, colorVariants: updatedVariants });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (index !== undefined) {
            const updatedVariants = [...data.colorVariants];
            updatedVariants[index].image = file;
            setData({ ...data, colorVariants: updatedVariants });
        } else {
            setData({ ...data, mainImage: file });
        }
    };

    const addColorVariant = () => {
        setData({
            ...data,
            colorVariants: [...data.colorVariants, { colorName: '', image: null }]
        });
    };

    const removeColorVariant = (index) => {
        const filteredVariants = data.colorVariants.filter((_, i) => i !== index);
        setData({ ...data, colorVariants: filteredVariants });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;
            response = await uploadColorProduct(data);
            setResMsg({ error: true, message: response.message, status: response.statusCode })
        } catch (error) {
            setResMsg({ error: true, message: error.message, status: error.statusCode })
        }
    }


    return (
        <Modal show={show} onHide={close} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Create New Product</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row className="g-3">

                        {/* Color Variants Section */}
                        <Col md={12}>
                            <div className="border p-3 rounded">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5>Color Variants</h5>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={addColorVariant}
                                    >
                                        <FaPlus /> Add Color
                                    </Button>
                                </div>

                                {data.colorVariants.map((variant, index) => (
                                    <div key={index} className="mb-3 border-bottom pb-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h6 className="mb-0">Color #{index + 1}</h6>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                className="text-danger"
                                                onClick={() => removeColorVariant(index)}
                                                disabled={data.colorVariants.length === 1}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </div>

                                        <Form.Group className="mb-2">
                                            <Form.Label>Color Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="colorName"
                                                value={variant.colorName}
                                                onChange={(e) => handleInputChange(e, index)}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Color Image</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, index)}
                                                required
                                            />
                                            {variant.image && (
                                                <Image
                                                    src={URL.createObjectURL(variant.image)}
                                                    thumbnail
                                                    className="mt-2"
                                                    style={{ maxHeight: '80px' }}
                                                />
                                            )}
                                        </Form.Group>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Create Product
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ProductColorModal;