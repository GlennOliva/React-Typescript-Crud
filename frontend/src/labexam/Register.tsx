import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleRegister = () => {
      axios.post(`http://localhost:8081/register`, { name, email, password })
          .then((response) => {
              setName("");
              setEmail("");
              setPassword("");
              console.log("response: " + response);
  
              Swal.fire({
                  title: 'Account Created!',
                  text: 'Register Successfully.',
                  icon: 'success',
                  confirmButtonText: 'OK',
              }).then(() => {
                  navigate("/login"); // Use the navigate function here
              });
          })
          .catch((error) => {
              if (error.response && error.response.status === 409) {
                  // HTTP status 409 indicates conflict (user already exists)
                  Swal.fire({
                      title: 'Oops!',
                      text: 'This email is already in use. Please use a different email.',
                      icon: 'error',
                      confirmButtonText: 'OK',
                  });
              } else {
                  console.error("Error registering account:", error);
              }
          });
  };
  
    
  return (
    <div>
      Register page

      <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name:</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
     value={name}
     onChange={(e) => setName(e.target.value)}/>
  </div>

      <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
     value={email}
     onChange={(e) => setEmail(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"
     value={password}
     onChange={(e) => setPassword(e.target.value)}/>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handleRegister}>Submit</button>


  <Link to="/login">
    <br />
  Login instead
  </Link>
    </div>

    

  )
}

export default Register
