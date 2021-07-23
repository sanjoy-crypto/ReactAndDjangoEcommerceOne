import Axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useGlobalState } from "../state/provider";
import { domain, header } from "../env";

const Order = () => {
  const [{ cartuncomplete }, dispatch] = useGlobalState();
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [mobile, setMobile] = useState(null);

  const history = useHistory();

  const ordernow = async () => {
    await Axios({
      method: "post",
      url: `${domain}/api/orders/`,
      headers: header,
      data: {
        cartid: cartuncomplete?.id,
        address: address,
        email: email,
        mobile: mobile,
      },
    }).then((res) => {
      dispatch({
        type: "PAGE_RELOAD",
        pagerelod: res.data,
      });
      dispatch({
        type: "ADD_CARTUNCOMPLETE",
        cartuncomplete: null,
      });
      history.push("/old_orders");
    });
  };
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6 mb-4">
          <h2 className="title">Ordered List</h2>
          <hr /> <br />
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
              {cartuncomplete?.cartproduct?.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.product[0].title}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.subtotal}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <Link to="/cart" className="btn btn-primary">
                    ← Edit Cart
                  </Link>
                </td>
                <td colSpan="3">Total</td>
                <td>{cartuncomplete?.total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="col-md-6"></div>

        <div className="col-md-6 mb-5">
          <h2 className="title">Order Now</h2>
          <hr /> <br />
          <div class="form-group mb-3">
            <label>Address</label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              class="form-control"
              placeholder="Address"
            />
          </div>
          <div
            onChange={(e) => setEmail(e.target.value)}
            class="form-group mb-3"
          >
            <label>Email</label>
            <input type="text" class="form-control" placeholder="Email" />
          </div>
          <div class="form-group mb-3">
            <label>Phone</label>
            <input
              onChange={(e) => setMobile(e.target.value)}
              type="text"
              class="form-control"
              placeholder="Phone"
            />
          </div>
          <button onClick={ordernow} className="btn btn-primary">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
