import Axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { domain, header } from "../env";
import { useGlobalState } from "../state/provider";

const Cart = () => {
  const [{ cartuncomplete }, dispatch] = useGlobalState();
  const history = useHistory();
  let cart_product_length = 0;
  if (cartuncomplete !== null) {
    cart_product_length = cartuncomplete?.cartproduct?.length;
  } else {
    cart_product_length = 0;
  }

  const Updatecart = async (id) => {
    await Axios({
      method: "post",
      url: `${domain}/api/updatecart/`,
      data: { id: id },
      headers: header,
    }).then((res) => {
      console.log("Add to Cart : ", res.data);
      dispatch({
        type: "PAGE_RELOAD",
        pagerelod: res.data,
      });
    });
  };

  const Removecart = async (id) => {
    await Axios({
      method: "post",
      url: `${domain}/api/removecart/`,
      data: { id: id },
      headers: header,
    }).then((res) => {
      console.log("Add to Cart : ", res.data);
      dispatch({
        type: "PAGE_RELOAD",
        pagerelod: res.data,
      });
    });
  };
  const Deletecart = async (id) => {
    await Axios({
      method: "post",
      url: `${domain}/api/deletecart/`,
      data: { id: id },
      headers: header,
    }).then((res) => {
      console.log("Add to Cart : ", res.data);
      dispatch({
        type: "PAGE_RELOAD",
        pagerelod: res.data,
      });
    });
  };

  const deletefullcart = async (id) => {
    await Axios({
      method: "post",
      url: `${domain}/api/deletefullcart/`,
      headers: header,
      data: { id: id },
    }).then((res) => {
      // console.log("delete cart : ", res.data);
      dispatch({
        type: "PAGE_RELOAD",
        pagerelod: res.data,
      });
      dispatch({
        type: "ADD_CARTUNCOMPLETE",
        cartuncomplete: null,
      });
      alert("Your Full Cart is Deleted");
      history.push("/");
    });
  };

  return (
    <div className="container py-4 px-2">
      <h2 className="title2">Cart Items</h2>
      <hr />
      <br />
      {cart_product_length !== 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>SN</th>
              <th>Prduct</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartuncomplete?.cartproduct.map((data, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{data.product[0].title}</td>
                <td>{data.price}</td>
                <td>{data.quantity}</td>
                <td>{data.subtotal}</td>
                <td>
                  <button
                    onClick={() => Removecart(data.id)}
                    className="btn btn-warning"
                  >
                    -
                  </button>
                  <button
                    onClick={() => Deletecart(data.id)}
                    className="btn btn-danger mx-1"
                  >
                    X
                  </button>
                  <button
                    onClick={() => Updatecart(data.id)}
                    className="btn btn-success"
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tFoot>
            <tr>
              <th colSpan="4" className="text-right">
                Total
              </th>
              <th>{cartuncomplete?.total}</th>
              <th>
                <Link className="btn btn-primary" to="/orders">
                  Order Now
                </Link>
              </th>
            </tr>
          </tFoot>
        </table>
      ) : (
        <h2>There is no cart... </h2>
      )}

      <div className="row">
        <div className="col">
          <Link to="/old_orders" className="btn btn-primary">
            Old Order
          </Link>
        </div>
        {cart_product_length !== 0 && (
          <div className="col">
            <Link
              onClick={() => deletefullcart(cartuncomplete?.id)}
              className="btn btn-danger"
            >
              Delete Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
