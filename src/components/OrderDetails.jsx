import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { domain, header } from "../env";

const OrderDetails = () => {
  const [orderdetails, setOrderdetails] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getOrderDetails = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/orders/${id}/`,
        headers: header,
      }).then((res) => {
        //    console.log("Order Details : ", res.data["data"][0])
        setOrderdetails(res.data["data"][0]);
      });
    };
    getOrderDetails();
  }, []);
  const product = orderdetails?.cartproduct;

  return (
    <div className="container py-4">
      <h2 className="title">Order Details</h2>
      <hr />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Discount</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {orderdetails !== null && (
              <>
                <td>{orderdetails?.date}</td>
                <td>{orderdetails?.total}</td>
                <td>{orderdetails?.email}</td>
                <td>{orderdetails?.mobile}</td>
                <td>{orderdetails?.discount}%</td>
                <td>{orderdetails?.cartproduct?.length}</td>
              </>
            )}
          </tr>
        </tbody>
      </table>
      <h2 className="title">Product Details</h2>
      <hr />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>SN</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {product?.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.product[0].title}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
