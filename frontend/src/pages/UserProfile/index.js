import { useAuthenticateContext } from '../../context/AuthenticateContext';
import { useOrderContext } from "../../context/OrderContext";
import dateUtils from "../../helpers/dateTime";
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import Header from "../../components/Header/Header";
import "./index.css";

const UserProfile = () => {
    const { authUser } = useAuthenticateContext();
    const { getOrderById } = useOrderContext();
    const [order, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await getOrderById(32);
                if (result.statusCode === 200) {
                    setOrders(result.data);
                }
                return result;
            } catch (error) {
                setError(error.message || 'Failed to load data');
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return <Badge bg="success">{status}</Badge>;
            case 'shipped':
                return <Badge bg="primary">{status}</Badge>;
            case 'cancelled':
                return <Badge bg="danger">{status}</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };


    const subtotal = order.orderItems?.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.20;
    const deliveryFee = 4.99;
    const total = subtotal + tax + deliveryFee;

    return (
        <>
            <Header />
            <Container className="profile-container">
                <Row className="mb-5">
                    <Col md={4}>
                        <Card className="profile-card">
                            <Card.Body className="text-center">
                                <div className="profile-avatar">
                                    <span>
                                        {authUser.firstname.charAt(0)}
                                        {authUser.lastname.charAt(0)}
                                    </span>
                                </div>
                                <h3 className="profile-name">{authUser.firstname} {authUser.lastname}</h3>
                                <p className="profile-email">{authUser.email}</p>
                                <p className="profile-meta">Member since {dateUtils.formatIsoDateTime(authUser.createdAt)}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card className="orders-card">
                            <Card.Header className="orders-header">
                                <h3>Your Orders</h3>
                            </Card.Header>
                            <Card.Body>
                                {order.orderItems?.length > 0 ? (
                                    <div className="orders-table-container">
                                        <Table hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Product</th>
                                                    <th>Color</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.orderItems.map((orderItem, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <a href={`/order/${orderItem.id}`} className="order-link">
                                                                #{orderItem.id}
                                                            </a>
                                                        </td>
                                                        <td>{orderItem.variant?.product?.title || "No product"}</td>
                                                        <td>{orderItem.variant?.color || "N/A"}</td>
                                                        <td>{orderItem.quantity}</td>
                                                        <td>${orderItem.price}</td>
                                                        <td>${(orderItem.price * orderItem.quantity).toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>

                                        <div className="order-summary">
                                            <Card className="summary-card">
                                                <Card.Header className="summary-header">
                                                    <h5 className="mb-0">Order Summary</h5>
                                                </Card.Header>
                                                <Card.Body>
                                                    <div className="summary-row status-row">
                                                        <span>Order Status:</span>
                                                        <span>{getStatusBadge(order.status)}</span>
                                                    </div>
                                                    <div className="summary-divider"></div>
                                                    <div className="summary-row">
                                                        <span>Subtotal:</span>
                                                        <span>${subtotal.toFixed(2)}</span>
                                                    </div>
                                                    <div className="summary-row">
                                                        <span>TVSH (20%):</span>
                                                        <span>${tax.toFixed(2)}</span>
                                                    </div>
                                                    <div className="summary-row">
                                                        <span>Delivery Fee:</span>
                                                        <span>${deliveryFee.toFixed(2)}</span>
                                                    </div>
                                                    <div className="summary-divider"></div>
                                                    <div className="summary-row total-row">
                                                        <span>Total:</span>
                                                        <span>${total.toFixed(2)}</span>
                                                    </div>
                                                    <div className="summary-divider"></div>
                                                    <div className="summary-row date-row">
                                                        <span>Order Date:</span>
                                                        <span>{dateUtils.formatIsoDateTime(order.created_at)}</span>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="no-orders">
                                        <p>You haven't placed any orders yet.</p>
                                        <a href="/products" className="btn btn-primary">
                                            Browse Products
                                        </a>
                                    </div>
                                )}
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default UserProfile;