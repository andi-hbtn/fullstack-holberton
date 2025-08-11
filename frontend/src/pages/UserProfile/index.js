import { useAuthenticateContext } from '../../context/AuthenticateContext';
import { useOrderContext } from "../../context/OrderContext";
import dateUtils from "../../helpers/dateTime";
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import Header from "../../components/Header";
import { FiEye } from "react-icons/fi";
import ItemsModal from './ItemsModal';

import "./index.css";

const UserProfile = () => {
    const { authUser } = useAuthenticateContext();
    const { getUserOrderItems } = useOrderContext();
    const [orders, setOrders] = useState([]);
    const [selectedOrderItems, setSelectedOrderItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await getUserOrderItems(authUser.id);
                if (result.statusCode === 200) {
                    setOrders(result.result);
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

    const handleOpen = (id) => {
        const order = orders.find(o => o.id === id);
        setSelectedOrderItems(order?.orderItems || []);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(!open)
        setSelectedOrderItems([]);
    }

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
                                                    <th>Price</th>
                                                    <th>Status</th>
                                                    <th>Order Date</th>
                                                    <th>Check Order</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    orders.map((order, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    #{order.id}
                                                                </td>
                                                                <td>{order?.total_price || "No product"}</td>
                                                                <td>{order?.status || "N/A"}</td>
                                                                <td>{dateUtils.formatIsoDateTime(order?.created_at)}</td>
                                                                <td>
                                                                    <Button
                                                                        variant="outline-primary"
                                                                        size="sm"
                                                                        className="me-2 action-btn"
                                                                        onClick={() => { return handleOpen(order.id) }}
                                                                    >
                                                                        <FiEye />
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
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
            <ItemsModal open={open} close={handleClose} selectedOrderItems={selectedOrderItems} />
        </>
    );
}

export default UserProfile;