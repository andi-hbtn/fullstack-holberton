import {Modal,Container,Row,Col,Form,Button} from 'react-bootstrap/';

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthenticateContext } from "../../context/AuthenticateContext";

const Login = ({openLogin,closeLogin}) => {
    const { login } = useAuthenticateContext();
    const navigate = useNavigate();
    const [loginError,setLoginError]=useState({error:false,message:"",status:0});
    const [values, setValues] = useState({ email: "", password: "" });

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const result =  await login(values);
            if(result.status === 201){
                navigate("/");
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
        <Modal
        show={openLogin}
        onHide={closeLogin}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Container>
            <Row>
                <Col xs={12} md={12}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        autoFocus
                      />
                  </Form.Group>
                </Col>
                <Col xs={12} md={12}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
            </Row>
          </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeLogin}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Login;