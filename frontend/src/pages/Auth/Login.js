import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthenticateContext } from "../../context/AuthenticateContext";
import "./Auth.css";

const Login = () => {
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
        <div className="limiter">
            <div className="container-login100 img-back">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                    <form className="login100-form validate-form" onSubmit={handleLogin}>
                        <span className="login100-form-title p-b-49">
                            Login
                        </span>

                        <div className="wrap-input100 validate-input m-b-23" data-validate = "Email is required">
                            <span className="label-input100">Email</span>
                            <input className="input100" type="email" name="email" value={values.email} placeholder="Type your email" onChange={handleChange}/>
                            <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <span className="label-input100">Password</span>
                            <input className="input100" type="password" name="password" value={values.password} placeholder="Type your password" onChange={handleChange}/>
                            <span className="focus-input100" data-symbol="&#xf190;"></span>
                        </div>

                        <div className="container-login100-form-btn m-t-50">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn" type='submit'>
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login