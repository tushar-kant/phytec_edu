import React, { useState,useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {

    const {state,dispatch} = useContext(UserContext);
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = res.json();
        if (res.status === 400 || !data) {
            window.alert("invalid credentials");
        } else {
            dispatch({type:"USER", payload:true})
            window.alert("login successful");
            history.push("/");
        }

    }
    return (
        <>
            <form method="POST" className="form-control">
            <h3>Log in Here</h3>

                <div className="form-floating mb-3 ">
                    <input type="email" className="form-control" id="email" name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                </div>




                <div className="form-floating mb-3 l">
                    <input type="password" className="form-control" id="password" name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>



                <div className="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" name="signin" id="signin" value="Log in "
                        onClick={loginUser}
                        className="btn btn-outline-secondary mb-4 ">Log in</button>
                </div>
            </form>
            <NavLink to="/signup" className="signin-image-link">don't have account !!!please register</NavLink>
        </>
    )
}

export default Login;
