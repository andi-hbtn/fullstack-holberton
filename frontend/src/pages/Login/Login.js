import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, InputGroup, Row, Container } from 'react-bootstrap';
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import Alert from 'react-bootstrap/Alert';
import "./Login.css";

const Login = () => {
    const { login } = useAuthenticateContext();
    const navigate = useNavigate();
    const [loginError,setLoginError]=useState({error:false,message:"",status:0});
    const [values, setValues] = useState({ email: "", password: "" });

    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                const result =  await login(values);
                if(result.status === 201){
                    navigate("/authors");
                }else{
                    throw new Error(result.response.data.statusCode);
                }
            } catch (error) {
                if(error.message === "404"){
                    setLoginError(
                        {
                            error:true,
                            message:"User with this email was not found",
                            status:404
                        }
                    );
                }
                return;
            }
    }
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
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <h4 className="mb-5">Login</h4>
                            {
                                loginError.error ? 
                                <Alert variant="danger">
                                    We have not found user with this email
                                </Alert>
                                : ""  
                            }
                            <Form.Group as={Col} md="10" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <InputGroup>
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
                                <InputGroup>
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