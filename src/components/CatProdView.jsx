import Axios from "axios";
import React, { useEffect, useState } from "react";
import { domain } from "../env";
import SingleProduct from "./SingleProduct";

const CatProdView = () => {
  const [category, setCategory] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [category3, setCategory3] = useState(null);
  const [category4, setCategory4] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/category_product/1/`,
      }).then((res) => {
        // console.log("My Category Title : ", res.data[0]);
        setCategory(res.data[0]);
      });
    };
    getCategory();
  }, []);

  useEffect(() => {
    const getCategory2 = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/category_product/2/`,
      }).then((res) => {
        // console.log("My Category Title : ", res.data[0]);
        setCategory2(res.data[0]);
      });
    };
    getCategory2();
  }, []);
  useEffect(() => {
    const getCategory3 = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/category_product/3/`,
      }).then((res) => {
        // console.log("My Category Title : ", res.data[0]);
        setCategory3(res.data[0]);
      });
    };
    getCategory3();
  }, []);
  useEffect(() => {
    const getCategory4 = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/category_product/4/`,
      }).then((res) => {
        // console.log("My Category Title : ", res.data[0]);
        setCategory4(res.data[0]);
      });
    };
    getCategory4();
  }, []);
  return (
    <>
      <div className="container">
        {category !== null && (
          <>
            {/* Single Product list Start  */}

            <h2 className="title2 text-uppercase">{category?.title}</h2>
            <hr />
            <div className="row my-4">
              {category?.category_products?.map((item, i) => (
                <div key={i} className="col-md-3">
                  <SingleProduct item={item} />
                </div>
              ))}
            </div>

            {/* Single Product list End  */}

            {/* Single Product list Start  */}

            <h2 className="title2 text-uppercase">{category2?.title}</h2>
            <hr />
            <div className="row my-4">
              {category2?.category_products?.map((item, i) => (
                <div key={i} className="col-md-3">
                  <SingleProduct item={item} />
                </div>
              ))}
            </div>

            {/* Single Product list End  */}
            {/* Single Product list Start  */}

            <h2 className="title2 text-uppercase">{category3?.title}</h2>
            <hr />
            <div className="row my-4">
              {category3?.category_products?.map((item, i) => (
                <div key={i} className="col-md-3">
                  <SingleProduct item={item} />
                </div>
              ))}
            </div>

            {/* Single Product list End  */}
            {/* Single Product list Start  */}

            <h2 className="title2 text-uppercase">{category4?.title}</h2>
            <hr />
            <div className="row my-4">
              {category4?.category_products?.map((item, i) => (
                <div key={i} className="col-md-3">
                  <SingleProduct item={item} />
                </div>
              ))}
            </div>

            {/* Single Product list End  */}
          </>
        )}
      </div>
    </>
  );
};

export default CatProdView;
