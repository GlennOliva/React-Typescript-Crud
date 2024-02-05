import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
  item_name: Yup.string().required("Item Name is required"),
  price: Yup.number().positive("Price must be a positive number").required("Price is required"),
  category: Yup.string().required("Category is required"),
  quantity: Yup.number().positive("Quantity must be a positive number").required("Quantity is required"),
});

const Item_Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    item_name: "",
    price: "",
    category: "",
    quantity: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8081/edit/` + id)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setItem(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [id]);

  const formik = useFormik({
    initialValues: {
      item_name: item.item_name,
      price: item.price,
      category: item.category,
      quantity: item.quantity,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here (e.g., update the item)
      handleUpdateItem(values);
    },
    enableReinitialize: true, // Re-run the hook when initialValues change
  });

  const handleUpdateItem = (values: { item_name: string; price: string; category: string; quantity: string; }) => {
    axios
      .put(`http://localhost:8081/edit/${id}`, values)
      .then((response) => {
        console.log("response: " + response.data);
        Swal.fire({
          title: 'Item Updated!',
          text: 'The item has been successfully updated.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <h1>Edit New Item</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="itemName" className="form-label">
                  Item Name
                </label>
                <input
                  type="text"
                  className={`form-control ${formik.errors.item_name && formik.touched.item_name ? 'is-invalid' : ''}`}
                  placeholder="Item_name"
                  {...formik.getFieldProps('item_name')}
                />
                <div className="invalid-feedback">{formik.errors.item_name}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="Price" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  className={`form-control ${formik.errors.price && formik.touched.price ? 'is-invalid' : ''}`}
                  placeholder="Price"
                  {...formik.getFieldProps('price')}
                />
                <div className="invalid-feedback">{formik.errors.price}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="Category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className={`form-control ${formik.errors.category && formik.touched.category ? 'is-invalid' : ''}`}
                  placeholder="Category"
                  {...formik.getFieldProps('category')}
                />
                <div className="invalid-feedback">{formik.errors.category}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="Quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="text"
                  className={`form-control ${formik.errors.quantity && formik.touched.quantity ? 'is-invalid' : ''}`}
                  placeholder="Quantity"
                  {...formik.getFieldProps('quantity')}
                />
                <div className="invalid-feedback">{formik.errors.quantity}</div>
              </div>

              <button type="submit" className="btn btn-primary">
                Update Item
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item_Update;
