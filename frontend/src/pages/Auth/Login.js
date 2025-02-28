import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import "./Auth.css";

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
        <div className="limiter">
            <div className="container-login100 img-back">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                    <form className="login100-form validate-form" onSubmit={handleSubmit}>
                        <span className="login100-form-title p-b-49">
                            Login
                        </span>

                        <div className="wrap-input100 validate-input m-b-23" data-validate = "Email is required">
                            <span className="label-input100">Email</span>
                            <input className="input100" type="text" name="username" placeholder="Type your lastname"/>
                            <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <span className="label-input100">Password</span>
                            <input className="input100" type="password" name="pass" placeholder="Type your password"/>
                            <span className="focus-input100" data-symbol="&#xf190;"></span>
                        </div>

                        <div className="container-login100-form-btn m-t-50">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn" type='submit'>
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // <Container>
        //     <Row>
        //         <Col xs={8} className='form-container'>
        //             <Form onSubmit={handleSubmit}>
        //                 <Row className="mb-3">
        //                     <h4 className="mb-5">Login</h4>
        //                     {
        //                         loginError.error ? 
        //                         <Alert variant="danger">
        //                             We have not found user with this email
        //                         </Alert>
        //                         : ""  
        //                     }
        //                     <Form.Group as={Col} md="10" controlId="email">
        //                         <Form.Label>Email</Form.Label>
        //                         <InputGroup>
        //                             <Form.Control
        //                                 type="email"
        //                                 placeholder="Email"
        //                                 aria-describedby="email"
        //                                 required
        //                                 onChange={handleChange}
        //                                 name="email"
        //                                 value={values.email}
        //                             />
        //                             <Form.Control.Feedback type="invalid">
        //                                 Please Insert your emial.
        //                             </Form.Control.Feedback>
        //                         </InputGroup>
        //                     </Form.Group>
        //                     <Form.Group as={Col} md="10" controlId="validationCustomUsername">
        //                         <Form.Label>Password</Form.Label>
        //                         <InputGroup>
        //                             <Form.Control
        //                                 type="password"
        //                                 placeholder="Password"
        //                                 aria-describedby="password"
        //                                 required
        //                                 onChange={handleChange}
        //                                 name="password"
        //                                 value={values.password}
        //                             />
        //                             <Form.Control.Feedback type="invalid">
        //                                 Please Insert your password.
        //                             </Form.Control.Feedback>
        //                         </InputGroup>
        //                     </Form.Group>
        //                 </Row>
        //                 <Button type="submit">Login</Button>
        //             </Form>
        //         </Col>
        //     </Row>
        // </Container>
    )
}

export default Login