import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import {Modal,Container,Row,Col,Form,Button} from 'react-bootstrap';
import AlertMessage from '../alert/AlertMessage';
import "./login.css"

const Login = ({openLogin,closeLogin}) => {
    const { login } = useAuthenticateContext();
    const [loginError,setLoginError]=useState({error:false,message:"",status:0});
    const [alert,setAlert] = useState(false);
    const [values, setValues] = useState({ email: "", password: "" });

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const result =  await login(values);
            if(result.status === 201){
              closeLogin()
            }
        } catch (error) {
          setLoginError({error:true,message:error.message,status:error.statusCode})
          console.log("error--in-handleLogin-",error);
        }
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevState) => {
            return { ...prevState, [name]: value }
        })

    }

    const isDisabled = values.email.trim().length === 0 || values.password.trim().length === 0;

    return (
        <Modal
          show={openLogin}
          onHide={closeLogin}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
           <Form>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Container>
                    <Row>
                        <Col xs={12} md={12}>
                          <Form.Group className="mb-3" controlId="email">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                value={values.email}
                                onChange={handleChange}
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                autoFocus
                                className='border-radius'
                              />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={12}>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              value={values.password}
                              onChange={handleChange}
                              type="password"
                              name="password"
                              placeholder="password"
                              autoFocus
                              className='border-radius'
                            />
                          </Form.Group>
                        </Col>
                    </Row>
                  </Container>
              </Modal.Body>
              <Modal.Footer>
              {
                  loginError.error ? 
                  <AlertMessage status={loginError.status} message={loginError.message}/>
                  :
                  ""
                }
                <Button type="submit" variant="dark" onClick={handleLogin} disabled={isDisabled} className='login-btn'>Login</Button>
              </Modal.Footer>
              </Form>
        </Modal>
    )
}

export default Login;