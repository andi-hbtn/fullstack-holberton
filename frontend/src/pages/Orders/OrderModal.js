import { useEffect, useState } from 'react';
import { useOrderContext } from "../../context/OrderContext";
import { Modal, Row, Col, ListGroup, Badge, Button } from 'react-bootstrap';
import { FiPackage, FiDollarSign, FiCalendar, FiUser } from 'react-icons/fi';

const OrdersModal = ({ open, close, id }) => {

    const { getOrderById } = useOrderContext();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const result = await getOrderById(id);
                if (result.statusCode === 200) {
                    setOrders(result.data);
                }
            } catch (error) {
                console.log("error in order modal");
            }
        };
        if (id) fetchOrder();
    }, [id, getOrderById]);

    return (
        <Modal show={open} onHide={close} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton className="border-bottom-0">
                <Modal.Title className="fw-bold">
                    <FiPackage className="me-2" />
                    Orders ({orders.length})
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="pt-0">
                <div className="order-details">
                    {/* Loop through all orders */}
                    <div className="mb-4">
                        <Row className="mb-4">
                            <Col md={6}>
                                <div className="d-flex align-items-center mb-3">
                                    <FiDollarSign className="me-2 text-muted" />
                                    <div>
                                        <small className="text-muted">Total Amount</small>
                                        <h4 className="mb-0">${parseFloat(orders?.total_price || 0).toFixed(2)}</h4>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center mb-3">
                                    <FiCalendar className="me-2 text-muted" />
                                    <div>
                                        <small className="text-muted">Order Date</small>
                                        <h6 className="mb-0">
                                            {new Date(orders?.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </h6>
                                    </div>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="d-flex align-items-center mb-3">
                                    <Badge
                                        bg={
                                            orders?.status === 'pending' ? 'warning' :
                                                orders?.status === 'shipped' ? 'info' :
                                                    orders?.status === 'delivered' ? 'success' : 'danger'
                                        }
                                        className="me-2 fs-6"
                                    >
                                        {orders?.status?.toUpperCase()}
                                    </Badge>
                                </div>

                                <div className="d-flex align-items-center">
                                    <FiUser className="me-2 text-muted" />
                                    <div>
                                        <small className="text-muted">Customer</small>
                                        <h6 className="mb-0">
                                            {orders?.user ? `${orders.user.firstname} ${orders.user.lastname}` : 'Guest Customer'}
                                        </h6>

                                        {orders?.user && (
                                            <>
                                                <ul className="list-unstyled mb-0">
                                                    <li>
                                                        <small className="text-muted">
                                                            <strong>Email:</strong> {orders.user.email}
                                                        </small>
                                                    </li>
                                                    <li>
                                                        <small>
                                                            <strong>Phone:</strong> {orders.user.phone}
                                                        </small>
                                                    </li>
                                                    <li>
                                                        <small>
                                                            <strong>Street:</strong> {orders.user.street_address}
                                                            {orders.user.appartment && `, ${orders.user.appartment}`}
                                                        </small>
                                                    </li>
                                                    <li>
                                                        <small>
                                                            {orders.user.zipCode}, {orders.user.town}, {orders.user.country}
                                                        </small>
                                                    </li>
                                                    {orders.user.message && (
                                                        <li>
                                                            <small className="text-muted">
                                                                <strong>Message:</strong> {orders.user.message}
                                                            </small>
                                                        </li>
                                                    )}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </div>

                            </Col>
                        </Row>

                        {/* Order Items */}
                        <h6 className="mb-3">Order Items ({orders?.orderItems?.length || 0})</h6>
                        <ListGroup variant="flush">
                            {orders.orderItems?.map((item) => (
                                <ListGroup.Item key={item.id} className="px-0">
                                    <Row className="align-items-center">
                                        <Col xs={3} md={2}>
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}api/product/uploads/colors/${item?.main_image}`}
                                                alt={item.product?.title}
                                                className="img-fluid rounded"
                                                style={{
                                                    maxHeight: '60px',
                                                    objectFit: 'cover',
                                                    aspectRatio: '1/1'
                                                }}
                                            />
                                        </Col>
                                        <Col xs={6} md={7}>
                                            <h6 className="mb-1">{item.variant?.product?.title}</h6>
                                            <div className="text-muted small">
                                                <div>SKU: #{item.variant?.product?.id.toString().padStart(4, '0')}</div>
                                                <div>Category: {item.variant?.product?.category?.title}</div>
                                                <div>Stock: {item.product?.stock} available</div>
                                            </div>
                                            <div className="mt-1">
                                                <small className="text-muted">
                                                    {item.quantity} × ${parseFloat(item.price).toFixed(2)}
                                                </small>
                                            </div>
                                        </Col>

                                        <Col xs={3} md={3} className="text-end">
                                            <div className="h6 mb-0">
                                                ${(item.quantity * parseFloat(item.price)).toFixed(2)}
                                            </div>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>


                </div>
            </Modal.Body>
            <Modal.Footer className="border-top-0">
                <Button variant="outline-secondary" onClick={close}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrdersModal;
