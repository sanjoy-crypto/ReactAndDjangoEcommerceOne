import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { domain } from "../env";
import SingleProduct from "./SingleProduct";

const CategoryProducts = () => {
  const [categoryProducts, setCategoryProducts] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const categoryProducts = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/category/${id}/`,
      }).then((res) => {
        setCategoryProducts(res.data[0]);
        console.log(res.data);
      });
    };
    categoryProducts();
  }, [id]);
  return (
    <div className="container mt-4">
      <h2 className="title2">Category : {categoryProducts?.title}</h2>
      <hr />

      <p className="pb-1"></p>

      <div className="row">
        {categoryProducts !== null &&
          categoryProducts?.category_products?.map((product, i) => (
            <div key={i} className="col-md-3">
              <SingleProduct item={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
