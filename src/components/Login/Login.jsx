import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
    const [show, setShow] = useState(false);
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const from = location.state?.from?.pathname || '/';

    const handleLogin= event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
            navigate(from, {replace: true});
        })
        .catch(error => {
            console.error(error);
        })
    }
    return (
        <div className='form-container'>
            <h3 className='form-title'>Login</h3>
            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={show ? "text" : "password"} name="password" id="" required />
                    <p onClick={ () => setShow(!show)}><small>
                        {
                            show ? <span>Hide Password</span> : <span>Show Password</span>
                        }
                        </small></p>
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p><small>New to ema-john? <Link to='/signup'>Create a new account</Link></small></p>
        </div>
    );
};

export default Login;