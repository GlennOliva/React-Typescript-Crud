import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {

    const navigate = useNavigate();

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = () => {
      axios.post(`http://localhost:8081/login`, { email, password })
        .then((response) => {
          setEmail("");
          setPassword("");
    
          // Extract the user_id and email from the response
          const { id, email } = response.data.user;
    
          // Store the user_id and email in localStorage for future use
          localStorage.setItem("user_id", id);
          localStorage.setItem("userEmail", email);
          
    
          Swal.fire({
            title: 'Login Success',
            text: 'Login Successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            // Use the navigate function here
            navigate("/dashboard");
          });
        })
        .catch((error) => {
          console.error("Error during login:", error);
    
          Swal.fire({
            title: 'Login Failed',
            text: 'Invalid email or password.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });
    };
  return (
    <div>
      <h1>Login Form</h1>
    
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    value={email}
    onChange={(e) => setEmail(e.target.value)}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"
     value={password}
     onChange={(e) => setPassword(e.target.value)}/>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>

  <Link to="/register"> 
    <br />
  Click here to register
  </Link>

    </div>
  )
}

export default Login
