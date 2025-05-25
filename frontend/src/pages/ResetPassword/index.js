import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';
import './index.css';

const ResetPassword = () => {
    const { resetPassword } = useAuthenticateContext();
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setVariant('danger');
            setMessage('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
             await resetPassword(token, password);
            setVariant('success');
            setMessage('Password reset successfully! Redirecting to login...');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            setVariant('danger');
            setMessage(error.response?.data?.message || 'Error resetting password');
        }
        setLoading(false);
    };

    return (
        <>
            <Header />
            <Container fluid="lg" className="my-5 py-5">
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <Card className="shadow-sm border-0">
                            <Card.Body className="p-4">
                                <div className="text-center mb-4">
                                    <i className="bi bi-shield-lock fs-1 text-primary"></i>
                                    <h2 className="mt-3 mb-2" style={{ color: '#012440' }}>
                                        Reset Your Password
                                    </h2>
                                    <p className="text-muted">
                                        Enter your new password below.
                                    </p>
                                </div>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter new password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength="6"
                                            style={{ borderColor: '#d5dee3' }}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Confirm New Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            minLength="6"
                                            style={{ borderColor: '#d5dee3' }}
                                        />
                                    </Form.Group>

                                    <div className="d-grid gap-2">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            disabled={loading}
                                            size="lg"
                                            style={{ backgroundColor: '#012440', border: 'none' }}
                                        >
                                            {loading ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        className="me-2"
                                                    />
                                                    Resetting...
                                                </>
                                            ) : (
                                                'Reset Password'
                                            )}
                                        </Button>
                                    </div>

                                    {message && (
                                        <Alert
                                            variant={variant}
                                            className="mt-4 text-center"
                                            dismissible
                                            onClose={() => setMessage('')}
                                            style={{
                                                backgroundColor: variant === 'success' ? '#e8edef' : '#f8d7da',
                                                borderColor: variant === 'success' ? '#d5dee3' : '#f5c6cb',
                                                color: variant === 'success' ? '#012440' : '#721c24'
                                            }}
                                        >
                                            {message}
                                        </Alert>
                                    )}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default ResetPassword;