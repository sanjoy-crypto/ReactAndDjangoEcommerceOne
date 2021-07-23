import Axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { domain, header } from "../env";
import { useGlobalState } from "../state/provider";

const HomeProduct = ({ item }) => {
  const [{ profile }, dispatch] = useGlobalState();

  const history = useHistory();

  const addtocart = async (id) => {
    profile !== null
      ? await Axios({
          method: "post",
          url: `${domain}/api/addtocart/`,
          data: { id: id },
          headers: header,
        }).then((res) => {
          // console.log("Add to Cart : ", res.data);
          dispatch({
            type: "PAGE_RELOAD",
            pagerelod: res.data,
          });
        })
      : history.push("/login");
  };

  return (
    <>
      <div className="card text-center mb-4">
        <Link className="text-center" to={`/product/${item.id}`}>
          <img src={item.image} className="card-img-top" alt={item.title} />
        </Link>
        <div className="card-body">
          <Link to={`/product/${item.id}`}>
            <h5 className="card-title oneline">{item.title}</h5>
          </Link>
          <p>
            {" "}
            <span className="price">
              Tk {item.selling_price}{" "}
              <del className="danger-text">Tk {item.market_price}</del>
            </span>
          </p>
          {/* <p className="card-text">{(item.description).substring(0,50)}...<Link to="">more</Link></p> */}
          <button
            onClick={() => addtocart(item.id)}
            className="btn btn-primary"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeProduct;
