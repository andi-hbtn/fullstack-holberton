import "./Auth.css";

const Register = () => {

    const handleSubmit = (event)=>{
        event.preventDefault();
    }


  return (
    <div className="limiter">
        <div className="container-login100 img-back">
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <form className="login100-form validate-form" onSubmit={handleSubmit}>
                    <span className="login100-form-title p-b-49">
                        Register
                    </span>

                    <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is required">
                        <span className="label-input100">Username</span>
                        <input className="input100" type="text" name="username" placeholder="Type your username"/>
                        <span className="focus-input100" data-symbol="&#xf206;"></span>
                    </div>


                    <div className="wrap-input100 validate-input m-b-23" data-validate = "Lastname is required">
                        <span className="label-input100">Lastname</span>
                        <input className="input100" type="text" name="username" placeholder="Type your lastname"/>
                        <span className="focus-input100" data-symbol="&#xf206;"></span>
                    </div>


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
                            <button className="login100-form-btn">
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Register;
