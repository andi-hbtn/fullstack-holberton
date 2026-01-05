import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductModal.css";

const ProductsModal = ({ show, onHide, categories }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            onMouseLeave={onHide}
            backdrop={false}
            className="products-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Products</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <ul className="categories-list-vertical">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="category-item-li-vertical"
                        >
                            <Link
                                to={`/category/${category.id}`}
                                className="category-link-vertical"
                            >
                                <div className="category-image-wrapper-vertical">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/api/category/uploads/${category.image}`}
                                        alt={category.title}
                                        className="category-image-vertical"
                                    />
                                </div>

                                <span className="category-title-vertical">
                                    {category.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Modal.Body>
        </Modal>
    );
};

export default ProductsModal;
