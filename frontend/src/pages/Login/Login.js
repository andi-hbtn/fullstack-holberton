import { useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Container } from 'react-bootstrap';
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import "./Login.css";

const Login = () => {
    const { login } = useAuthenticateContext();
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({ email: "", password: "" });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateValues(values)) {
            await login(values);
            setValidated(true);
        } else {
            setValidated(false);
        }
    }

    const validateValues = (values) => {
        const { email, password } = values;
        return (email && email.length > 0) || (password && password.length > 0);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues((prevState) => {
            return { ...prevState, [name]: value }
        })

    }

    return (
        <Container>
            <Row>
                <Col xs={8} className='form-container'>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <h4 className="mb-5">Login</h4>
                            <Form.Group as={Col} md="10" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        aria-describedby="email"
                                        required
                                        onChange={handleChange}
                                        name="email"
                                        value={values.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Insert your emial.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="10" controlId="validationCustomUsername">
                                <Form.Label>Password</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        aria-describedby="password"
                                        required
                                        onChange={handleChange}
                                        name="password"
                                        value={values.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Insert your password.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Button type="submit">Submit form</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login