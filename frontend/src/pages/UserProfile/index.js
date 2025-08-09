import { useAuthenticateContext } from '../../context/AuthenticateContext';
import { useOrderContext } from "../../context/OrderContext";
import dateUtils from "../../helpers/dateTime";
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import Header from "../../components/Header";
import "./index.css";

const UserProfile = () => {
    const { authUser } = useAuthenticateContext();
    const { getOrderById, getUserOrders } = useOrderContext();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await getUserOrders(authUser.id);
                if (result.statusCode === 200) {
                    setOrders(result.orders);
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
                                {orders?.length > 0 ? (
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
                                                    <th>Status</th>
                                                    <th>Order Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders?.map((order, index) => (
                                                    order.orderItems.map((orderItem, itemIndex) => {
                                                        return (
                                                            <tr key={itemIndex}>
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
                                                                <td>{getStatusBadge(order.status)}</td>
                                                                <td>{dateUtils.formatIsoDateTime(order.created_at)}</td>
                                                            </tr>
                                                        )
                                                    })
                                                ))}
                                            </tbody>
                                        </Table>

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