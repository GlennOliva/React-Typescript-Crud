import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
  item_name: Yup.string().required("Item Name is required"),
  price: Yup.number().positive("Price must be a positive number").required("Price is required"),
  category: Yup.string().required("Category is required"),
  quantity: Yup.number().positive("Quantity must be a positive number").required("Quantity is required"),
});

const Item_Insert = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      item_name: "",
      price: "",
      category: "",
      quantity: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleCreateItem(values);
    },
  });

  const handleCreateItem = (values: { item_name: string; price: string; category: string; quantity: string; }) => {
    axios.post("http://localhost:8081/create", values)
      .then((response) => {
        formik.resetForm(); // Reset form fields
        console.log("Response: " + response.data);
      
        // Show SweetAlert upon success
        Swal.fire({
          title: 'Item Created!',
          text: 'The item has been successfully created.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Navigate to the home route after the user clicks "OK"
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("Error creating item:", error);
      });
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <h1>Add New Item</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="itemName" className="form-label">Item Name</label>
              <input
                type="text"
                className={`form-control ${formik.errors.item_name && formik.touched.item_name ? 'is-invalid' : ''}`}
                id="itemName"
                {...formik.getFieldProps('item_name')}
              />
              <div className="invalid-feedback">{formik.errors.item_name}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="text"
                className={`form-control ${formik.errors.price && formik.touched.price ? 'is-invalid' : ''}`}
                id="price"
                {...formik.getFieldProps('price')}
              />
              <div className="invalid-feedback">{formik.errors.price}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input
                type="text"
                className={`form-control ${formik.errors.category && formik.touched.category ? 'is-invalid' : ''}`}
                id="category"
                {...formik.getFieldProps('category')}
              />
              <div className="invalid-feedback">{formik.errors.category}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="text"
                className={`form-control ${formik.errors.quantity && formik.touched.quantity ? 'is-invalid' : ''}`}
                id="quantity"
                {...formik.getFieldProps('quantity')}
              />
              <div className="invalid-feedback">{formik.errors.quantity}</div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              style={{ marginLeft: '3%' }}
              className="btn btn-danger"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Item_Insert;
