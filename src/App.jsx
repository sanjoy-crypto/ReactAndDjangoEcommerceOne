import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import CategoryProducts from "./components/CategoryProducts";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import Products from "./components/Products";
import Axios from "axios";
import { domain, userToken, header } from "./env";
import { useGlobalState } from "./state/provider";
import Cart from "./components/Cart";
import OldOrders from "./components/OldOrders";
import Order from "./components/Order";
import OrderDetails from "./components/OrderDetails";
const App = () => {
  const [{ profile, pagerelod, cartuncomplete, cartcomplete }, dispatch] =
    useGlobalState();
  // console.log('User Profile : ',profile)
  console.log("Complete : ", cartcomplete);
  console.log("UnComplete : ", cartuncomplete);
  useEffect(() => {
    if (userToken != null) {
      const getData = async () => {
        await Axios({
          method: "get",
          url: `${domain}/api/profile/`,
          headers: header,
        }).then((res) => {
          // console.log("profile data : ",res.data)
          dispatch({
            type: "ADD_PROFILE",
            profile: res.data.data,
          });
        });
      };
      getData();
    }
  }, [pagerelod]);

  useEffect(() => {
    const getCart = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/cart/`,
        headers: header,
      }).then((res) => {
        console.log("Cart : ", res.data);
        {
          const all_data = [];
          res.data.map((data) => {
            if (data.complete) {
              all_data.push(data);
              dispatch({
                type: "ADD_CARTCOMPLETE",
                cartcomplete: all_data,
              });
            } else {
              dispatch({
                type: "ADD_CARTUNCOMPLETE",
                cartuncomplete: data,
              });
            }
          });
        }
      });
    };
    getCart();
  }, [pagerelod]);

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/products" exact component={Products} />
          <Route path="/product/:id" exact component={ProductDetails} />
          <Route path="/category/:id" exact component={CategoryProducts} />

          {profile !== null ? (
            <>
              <Route path="/profile" exact component={ProfilePage} />
              <Route path="/cart" exact component={Cart} />
              <Route path="/old_orders" exact component={OldOrders} />
              <Route path="/orders" exact component={Order} />
              <Route path="/order_details/:id" exact component={OrderDetails} />
            </>
          ) : (
            <>
              <Route path="/login" exact component={LoginPage} />
              <Route path="/register" exact component={RegisterPage} />
            </>
          )}
          <Route exact component={HomePage} />
        </Switch>
        <div className="text-center py-3 bg-dark text-white">
          Copyright &copy; 2021 | React & Django Ecommerce App | By Sanjoy
          Sarker
        </div>
      </Router>
    </div>
  );
};

export default App;
