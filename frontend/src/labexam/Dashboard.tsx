import React, { useEffect, useState } from 'react'


import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{
  faTrash,
  faPencil,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const { getUserEmail } = useAuth();
  const userEmail = getUserEmail();
    const navigate = useNavigate();
    const handleLogout = () =>{
        navigate('/login')
    }

    const [data, setData] = useState([]);

    useEffect(() => {
      fetch("http://localhost:8081/tbl_user")
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log(err));
    }, []);

  return (

   
    <div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" onClick={handleLogout}>Logout</a>
        </li>

       
      </ul>

      
      
    </div>

  </div>
  <h1 style={{fontSize: '16px' , marginRight: '6%'}}>Username: {userEmail}</h1>
</nav>


<div className="container mt-3">
      <div className="row">
        <div className="col-sm-12">
          <h1>User List</h1>
          <table className="table table-hover table-bordered">
            <thead>
              <Link style={{ margin: '10px' }}  className="btn btn-success" to="/create">
              Insert &nbsp;
              <FontAwesomeIcon icon={faCirclePlus} style={{ background: 'none' }} />

              </Link>

              
    
              <tr>
                <th>User_Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((user, key) => (
                <tr key={key}>
                  <td>{user["id"]}</td>
                  <td>{user["name"]}</td>
                  <td>{user["email"]}</td>
                  <td>{user["password"]}</td>
                  <td>
                  <Link style={{ margin: '10px' }} className="btn btn-primary" to={'/login'}>
                    Edit &nbsp;
                    <FontAwesomeIcon icon={faPencil}/>
                  </Link>
                  <button type="button" className="btn btn-danger" >
                      Delete &nbsp;
                    <FontAwesomeIcon icon={faTrash}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

         
        </div>
      </div>
    </div>
    </div>
  )
}

export default Dashboard
