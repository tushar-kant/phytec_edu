import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';


const Signup = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });
    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });

    }
    const postData = async (e) => {
        e.preventDefault();
        const { name, email, phone, work, password, cpassword } = user;
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword

            })
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert("invalid registration");
            console.log("invalid registration");
        } else {
            window.alert("registration successful");
            console.log(" registration success");
            history.push("./login");

        }

    }
    return (
        <>
            <h3>signup Here</h3>
            <form method="POST" className="row g-3">
        
                
                <div className="input-group mb-3">
                    <span className="input-group-text" id="phone">name</span>
                    <input type="text" className="form-control"  id="name" name="name" placeholder="name"
                        value={user.name}
                        onChange={handleInputs}
                        aria-label="Username" aria-describedby="basic-addon1" />
                </div>


              

                
                <div className="input-group mb-3">
                    <span className="input-group-text" id="phone">email</span>
                    <input type="email" className="form-control"  id="email" name="email" placeholder="email"
                        value={user.email}
                        onChange={handleInputs}
                        aria-label="Username" aria-describedby="basic-addon1" />
                </div>




                <div className="input-group mb-3">
                    <span className="input-group-text" id="phone">phone</span>
                    <input type="number" className="form-control" id="phone" name="phone" placeholder="phone"
                        value={user.phone}
                        onChange={handleInputs}
                        aria-label="Username" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">work</span>
                    <input type="text" className="form-control" id="work" name="work" placeholder="work"
                        value={user.work}
                        onChange={handleInputs}
                        aria-label="Username" aria-describedby="basic-addon1" />
                </div>

                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password"
                        value={user.password}
                        onChange={handleInputs}
                        id="exampleInputPassword1" />
                </div>

                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label"> confirmPassword</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword"
                        value={user.cpassword}
                        onChange={handleInputs}
                        id="exampleInputPassword1" />
                </div>



                <button type="submit" name="signup" id="signup" value="register"
                    onClick={postData}
                    className="btn btn-outline-secondary mb-4 ">register</button>


            </form>
            <NavLink to="/login" className="signup-image-link">already registered</NavLink>
        </>
    )
}

export default Signup;
