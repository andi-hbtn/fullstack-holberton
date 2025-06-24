import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useProductContext } from "../../context/ProductContext";

const ProductColorModal = ({ show, close, productId }) => {
    const { uploadColorProduct } = useProductContext();
    const [resMsg, setResMsg] = useState({ error: false, message: "", status: 0 });

    const [data, setData] = useState({
        product_id: 0,
        colorVariants: [{ colorName: '', price: '', stock: '', color_image: null, main_image: null }]
    });

    useEffect(() => {
        if (show && productId) {
            setData({
                product_id: productId,
                colorVariants: [{ colorName: '', price: '', stock: '', color_image: null, main_image: null }]
            });
        }
    }, [productId, show]);

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

    const handleFileChange = (e, index, field) => {
        const file = e.target.files[0];
        if (index !== undefined) {
            const updatedVariants = [...data.colorVariants];
            updatedVariants[index][field] = file;
            setData({ ...data, colorVariants: updatedVariants });
        } else {
            setData({ ...data, main_image: file });
        }
    };

    const addColorVariant = () => {
        setData({
            ...data,
            colorVariants: [...data.colorVariants, { colorName: '', price: '', stock: '', color_image: null, main_image: null }]
        });
    };

    const removeColorVariant = (index) => {
        const filteredVariants = data.colorVariants.filter((_, i) => i !== index);
        setData({ ...data, colorVariants: filteredVariants });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("productId", data.product_id);

        const colors = data.colorVariants.map(variant => ({
            color: variant.colorName,
            price: parseFloat(variant.price),
            stock: parseInt(variant.stock, 10)
        }));

        data.colorVariants.forEach(variant => {
            formData.append("files", variant.color_image);
            formData.append("files", variant.main_image);
        });

        formData.append("colors", JSON.stringify(colors));
        try {
            const response = await uploadColorProduct(formData);
            setResMsg({ error: false, message: response.message, status: response.statusCode });
            close();
        } catch (error) {
            setResMsg({ error: true, message: error.message, status: error.statusCode });
        }
    };

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
                                    <Button variant="outline-primary" size="sm" onClick={addColorVariant}>
                                        <FaPlus /> Add Color
                                    </Button>
                                </div>

                                {data.colorVariants.map((variant, index) => (
                                    <div key={index} className="mb-3 border-bottom pb-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h6 className="mb-0">Color #{index + 1}</h6>
                                            <Button variant="link" size="sm" className="text-danger" onClick={() => removeColorVariant(index)} disabled={data.colorVariants.length === 1}>
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

                                        <Form.Group className="mb-2">
                                            <Form.Label>Price (€)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="price"
                                                value={variant.price || ''}
                                                onChange={(e) => handleInputChange(e, index)}
                                                step="0.01"
                                                min="0"
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-2">
                                            <Form.Label>Stock Quantity</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="stock"
                                                value={variant.stock || ''}
                                                onChange={(e) => handleInputChange(e, index)}
                                                min="0"
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-2">
                                            <Form.Label>Colored Image</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, index, 'color_image')}
                                                required
                                            />
                                            {variant.color_image && (
                                                <Image src={URL.createObjectURL(variant.color_image)} thumbnail className="mt-2" style={{ maxHeight: '80px' }} />
                                            )}
                                        </Form.Group>

                                        <Form.Group className="mb-2">
                                            <Form.Label>Main Image</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange(e, index, 'main_image')}
                                                required
                                            />
                                            {variant.main_image && (
                                                <Image src={URL.createObjectURL(variant.main_image)} thumbnail className="mt-2" style={{ maxHeight: '80px' }} />
                                            )}
                                        </Form.Group>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>Cancel</Button>
                    <Button variant="primary" type="submit">Add Color Variants</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ProductColorModal;