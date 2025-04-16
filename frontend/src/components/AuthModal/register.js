import { useState } from 'react';
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import { Modal, Container, Row, Col, Form, Button } from 'react-bootstrap';
import AlertMessage from '../alert/AlertMessage';
const Register = ({ openRegister, closeRegister }) => {

  const { register } = useAuthenticateContext();
  const [registerResponse, setRegisterResponse] = useState({ error: false, message: "", status: 0 });
  const [values, setValues] = useState({ firstname: "", lastname: "", email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("register----",values);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  const isDisabled = Object.values(values).some(value => value.trim().length === 0);


  return (
    <Modal
      show={openRegister}
      onHide={closeRegister}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className='login-form'>
              <Col xs={12} md={12}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Your lastname</Form.Label>
                  <Form.Control
                    value={values.firstname}
                    onChange={handleChange}
                    type="text"
                    name="firstname"
                    placeholder="insert your name..."
                    autoFocus
                    className='border-radius'
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={12}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Your lastname</Form.Label>
                  <Form.Control
                    value={values.lastname}
                    onChange={handleChange}
                    type="text"
                    name="lastname"
                    placeholder="insert your lastname..."
                    autoFocus
                    className='border-radius'
                  />
                </Form.Group>
              </Col>
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
            registerResponse.error ?
              <AlertMessage status={registerResponse.status} message={registerResponse.message} />
              :
              ""
          }
          <Button type="submit" variant="dark" disabled={isDisabled} className='login-btn'>Register</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Register;