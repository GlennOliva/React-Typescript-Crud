import { useState , useEffect } from "react"

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:8081/users")
    .then((res)=> res.json())
    .then((data)=> setData(data))
    .catch((err)=> console.log(err));
  }, []);


  return (

    <div className="container mt-3">
      <div className="row">
        <div className="col-sm-12">
          <h1>Users List</h1>
          <table className="table table-hover table-bordered">
            <thead>
            <button type="button" style={{margin: '10px'}} className="btn btn-success">Insert</button>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((data,key)=> (
                <tr key={key}>
                  <td>{data["id"]}</td>
                  <td>{data["name"]}</td>
                  <td>{data["phone"]}</td>
                  <td>{data["email"]}</td>
                  <td><button type="button" style={{margin: '10px'}} className="btn btn-primary">Edit</button>
                  <button type="button" className="btn btn-danger">Delete</button></td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users
