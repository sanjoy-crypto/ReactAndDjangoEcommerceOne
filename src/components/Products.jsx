import Axios from "axios";
import React, { useEffect, useState } from "react";
import { domain } from "../env";
import HomeProduct from "./HomeProduct";

const Products = () => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/product`,
      }).then((res) => {
        // console.log('All Prod : ',res.data)
        setProducts(res.data);
      });
    };
    getProducts();
  }, []);

  const previousProducts = async () => {
    await Axios({
      method: "get",
      url: products?.previous,
    }).then((res) => {
      // console.log('Previous : ',res.data)
      setProducts(res.data);
    });
  };

  const nextProducts = async () => {
    await Axios({
      method: "get",
      url: products?.next,
    }).then((res) => {
      // console.log('next : ',res.data)
      setProducts(res.data);
    });
  };

  return (
    <div className="container my-5">
      <h2 className="title">All Products</h2>
      <hr />
      <div className="row my-5">
        {products !== null &&
          products?.results.map((item, i) => (
            <div key={i} className="col-md-3">
              <HomeProduct item={item} />
            </div>
          ))}
      </div>
      <div className="home__pagination">
        {products?.previous != null ? (
          <button
            onClick={previousProducts}
            className="btn btn-outline-primary mx-2"
          >
            1
          </button>
        ) : (
          <button className="btn btn-outline-primary" disabled>
            1
          </button>
        )}
        {products?.next != null ? (
          <button
            onClick={nextProducts}
            className="btn btn-outline-primary mx-2"
          >
            2
          </button>
        ) : (
          <button className="btn btn-outline-primary" disabled>
            2
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;
