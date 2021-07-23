import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { domain, header } from "../env";

const OldOrders = () => {
  const [orders, setOrders] = useState(null);
  const [reload, setReload] = useState(null);
  useEffect(() => {
    const getOrders = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/orders/`,
        headers: header,
      }).then((res) => {
        // console.log("Orders : ", res.data);
        setOrders(res.data);
      });
    };
    getOrders();
  }, [reload]);

  const deleteOldorder = async (id) => {
    await Axios({
      method: "delete",
      url: `${domain}/api/orders/${id}/`,
      headers: header,
    }).then((res) => {
      // console.log("Delete : ", res.data);
      setReload(res.data);
    });
  };

  return (
    <div className="container py-4">
      <h2 className="title">Old Orders</h2>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Total</th>
            <th>Product</th>
            <th>Order Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders?.langth !== 0 ? (
            orders?.map((order, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>Tk. {order?.total}</td>
                <td>{order?.cartproduct?.length}</td>
                <td>{order?.status}</td>
                <td>
                  <Link to={`/order_details/${order?.id}`}>
                    <button className="btn btn-primary">Order Details</button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => deleteOldorder(order?.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <div className="p-5 w-50 m-auto bg-light m-5 text center">
              Sorry... You have no Orders. Buy somthings and confirm your Order.
              <Link to="/">
                <button className="btn-btn-primary my-3">Go to Home</button>
              </Link>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OldOrders;
