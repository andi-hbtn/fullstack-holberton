import { Modal, Row, Col, ListGroup, Badge, Button } from 'react-bootstrap';
import { FiPackage, FiDollarSign, FiCalendar, FiUser } from 'react-icons/fi';

const OrdersModal = ({ open, close, orders }) => {
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
                    {orders.map((currentOrder, index) => (
                        <div key={currentOrder.id} className="mb-4">
                            <Row className="mb-4">
                                <Col md={6}>
                                    <div className="d-flex align-items-center mb-3">
                                        <FiDollarSign className="me-2 text-muted" />
                                        <div>
                                            <small className="text-muted">Total Amount</small>
                                            <h4 className="mb-0">${parseFloat(currentOrder.total_price || 0).toFixed(2)}</h4>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-3">
                                        <FiCalendar className="me-2 text-muted" />
                                        <div>
                                            <small className="text-muted">Order Date</small>
                                            <h6 className="mb-0">
                                                {new Date(currentOrder.created_at).toLocaleDateString('en-US', {
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
                                                currentOrder.status === 'pending' ? 'warning' :
                                                    currentOrder.status === 'shipped' ? 'info' :
                                                        currentOrder.status === 'delivered' ? 'success' : 'danger'
                                            }
                                            className="me-2 fs-6"
                                        >
                                            {currentOrder.status?.toUpperCase()}
                                        </Badge>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <FiUser className="me-2 text-muted" />
                                        <div>
                                            <small className="text-muted">Customer</small>
                                            <h6 className="mb-0">
                                                {currentOrder.user?.email || 'Guest Customer'}
                                            </h6>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {/* Order Items */}
                            <h6 className="mb-3">Order Items ({currentOrder.orderItems?.length || 0})</h6>
                            <ListGroup variant="flush">
                                {currentOrder.orderItems?.map((item) => (
                                    <ListGroup.Item key={item.id} className="px-0">
                                        <Row className="align-items-center">
                                            <Col xs={3} md={2}>
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}api/product/uploads/${item.product?.image}`}
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
                                                <h6 className="mb-1">{item.product?.title}</h6>
                                                <div className="text-muted small">
                                                    <div>SKU: #{item.product?.id.toString().padStart(4, '0')}</div>
                                                    <div>Category: {item.product?.category?.title}</div>
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
                    ))}
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
