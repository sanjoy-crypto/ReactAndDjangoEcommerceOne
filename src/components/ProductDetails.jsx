import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { domain, header } from "../env";
import { useGlobalState } from "../state/provider";
import SingleProduct from "./SingleProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categoryProduct, setCategoryProduct] = useState(null);

  const [{ profile }, dispatch] = useGlobalState();

  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/product/${id}`,
      }).then((res) => {
        // console.log('Single : ', res.data)
        setProduct(res.data);
        getCategory(res?.data?.category.id);
      });
    };
    getData();
  }, [id]);

  const getCategory = async (id) => {
    await Axios({
      method: "get",
      url: `${domain}/api/category/${id}`,
    }).then((res) => {
      // console.log('Category: ',res.data)
      setCategoryProduct(res.data);
    });
  };

  const addtocart = async (id) => {
    profile !== null
      ? await Axios({
          method: "post",
          url: `${domain}/api/addtocart/`,
          data: { id: id },
          headers: header,
        }).then((res) => {
          console.log("Add to Cart : ", res.data);
          dispatch({
            type: "PAGE_RELOAD",
            pagerelod: res.data,
          });
        })
      : history.push("/login");
  };

  return (
    <div className="container my-5">
      {product !== null && (
        <div className="row">
          <div className="col-md-6 imageSize">
            <img className="" src={product?.image} width="100%" alt="" />
          </div>
          <div className="col-md-6">
            <h2>{product?.title}</h2>
            <h5>
              Tk {product?.selling_price}{" "}
              <del className="danger-text">Tk {product?.market_price}</del>
            </h5>
            <p className="desc">{product?.description}</p>
            Size :{" "}
            <select
              className="form-select inputSize2"
              aria-label="Default select example"
            >
              <option selected>8GB | 128GB</option>
              <option value="3">4GB | 64GB</option>
              <option value="1">6GB | 64GB</option>
              <option value="2">6GB | 128GB</option>
            </select>
            <br />
            Color :{" "}
            <select
              className="form-select inputSize3"
              aria-label="Default select example"
            >
              <option selected>Black</option>
              <option value="3">Red</option>
              <option value="1">Silver</option>
              <option value="2">Blue</option>
            </select>{" "}
            <br />
            Quantity :{" "}
            <input className="inputSize3 form-control" type="number" /> <br />
            <br />
            <Link
              className="btn btn-primary"
              onClick={() => addtocart(product?.id)}
            >
              Add To Cart
            </Link>
            <Link className="btn btn-warning mx-3" to="">
              Buy Now
            </Link>
          </div>
        </div>
      )}

      <div className="row mt-5">
        <h2 className="">Related Products</h2>
        <hr />
        <p className="my-3"></p>

        {categoryProduct !== null &&
          categoryProduct[0]?.category_products?.map((product, i) => (
            <div key={i} className="col-md-3">
              <SingleProduct item={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDetails;
