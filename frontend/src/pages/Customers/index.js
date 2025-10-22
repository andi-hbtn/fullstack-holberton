import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useCustomerContext } from "../../context/CustomerContext";
import NavAdmin from "../../components/NavAdmin";
import AdminSideBar from "../../components/AdminSideBar";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Customers = () => {
    const { customers } = useCustomerContext();

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }

    return (
        <>
            <div className="admin-dashboard">
                <NavAdmin />
                <Container fluid className="main-content">
                    <Row>
                        <Col md={3} xl={2} className="sidebar bg-dark text-light">
                            <AdminSideBar />
                        </Col>

                        <Col md={9} xl={10} className="p-4 main-content-area">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="page-title">Customers Section</h2>
                            </div>

                            <div className="custom-card p-4 shadow-sm">
                                <Table hover responsive className="customer-table">
                                    <thead className="table-header">
                                        <tr>
                                            <th>#</th>
                                            <th>Full Name</th>
                                            <th>Company Name</th>
                                            <th>Company Address</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Country</th>
                                            <th>Town</th>
                                            <th>Zip Code</th>
                                            <th>Appartment</th>
                                            <th>Message</th>
                                            <th>Role</th>
                                            <th>Guest?</th>
                                            <th>Created At</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers?.length > 0 ? (
                                            customers.map((customer, index) => (
                                                <tr key={customer.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{customer.firstname} {customer.lastname}</td>
                                                    <td>{customer.company_name || '-'}</td>
                                                    <td>{customer.company_address || '-'}</td>
                                                    <td>{customer.email}</td>
                                                    <td>{customer.phone}</td>
                                                    <td>{customer.country || '-'}</td>
                                                    <td>{customer.town || '-'}</td>
                                                    <td>{customer.zipCode || '-'}</td>
                                                    <td>{customer.appartment || '-'}</td>
                                                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {customer.message || '-'}
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-info text-dark">{customer.roles}</span>
                                                    </td>
                                                    <td>
                                                        {customer.is_guest ? (
                                                            <span className="badge bg-secondary">Yes</span>
                                                        ) : (
                                                            <span className="badge bg-success">No</span>
                                                        )}
                                                    </td>
                                                    <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <Button
                                                                variant="outline-primary"
                                                                size="sm"
                                                                className="action-btn"
                                                                onClick={() => handleDelete(customer)}
                                                            >
                                                                <FiTrash2 />
                                                            </Button>
                                                            <Button
                                                                variant="outline-primary"
                                                                size="sm"
                                                                className="action-btn"
                                                                onClick={() => handleEdit(customer)}
                                                            >
                                                                <FiEdit />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="15" className="text-center py-4">
                                                    No customers found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Customers;
