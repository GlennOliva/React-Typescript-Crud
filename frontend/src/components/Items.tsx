import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{
  faTrash,
  faPencil,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from 'sweetalert2';



const Items = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/Items")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

 

  function handleDeleteItem(id: string) {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this item??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // If user clicks "OK," proceed with the deletion
        axios.delete(`http://localhost:8081/items/${id}`)
          .then((response) => {
            console.log("Response:", response.data);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your item has been deleted.',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              // Navigate to the home route after the user clicks "OK"
              window.location.reload();
            });
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
          });
      } else {
        // If user clicks "Cancel" or closes the dialog, do nothing
      }
    });
  }
  

  // const handleInsertClick = () => {
  //   // Redirect to the /create route
  //   navigate("/create");
  // };

  // const handleEditClick = () => {
  //   // Redirect to the /create route
  //   navigate("/edit");
  // };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-sm-12">
          <h1>Items List</h1>
          <table className="table table-hover table-bordered">
            <thead>
              <Link style={{ margin: '10px' }}  className="btn btn-success" to="/create">
              Insert &nbsp;
              <FontAwesomeIcon icon={faCirclePlus} style={{ background: 'none' }} />

              </Link>

              
    
              <tr>
                <th>Item_ID</th>
                <th>Item_Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, key) => (
                <tr key={key}>
                  <td>{item["item_id"]}</td>
                  <td>{item["item_name"]}</td>
                  <td>{item["price"]}</td>
                  <td>{item["category"]}</td>
                  <td>{item["quantity"]}</td>
                  <td>
                  <Link style={{ margin: '10px' }} className="btn btn-primary" to={`/edit/${item["item_id"]}`}>
                    Edit &nbsp;
                    <FontAwesomeIcon icon={faPencil}/>
                  </Link>
                  <button type="button" className="btn btn-danger" onClick={() => handleDeleteItem(item["item_id"])}>
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
  );
};

export default Items;
