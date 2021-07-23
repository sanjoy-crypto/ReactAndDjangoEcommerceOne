import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { domain } from "../env";
import { useGlobalState } from "../state/provider";

const Navbar = () => {
  const [{ profile, cartuncomplete }, dispatch] = useGlobalState();
  let cart_product_length = 0;
  if (cartuncomplete != null) {
    cart_product_length = cartuncomplete?.cartproduct?.length;
  } else {
    cart_product_length = 0;
  }

  const [category, setCategory] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/category/`,
      }).then((res) => {
        // console.log('All Category : ',res.data)
        setCategory(res.data);
      });
    };
    getCategories();
  }, []);

  const logout = () => {
    window.localStorage.clear();
    dispatch({
      type: "ADD_PROFILE",
      profile: null,
    });
    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            MOBILE SHOP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <form className="container-fluid">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <span className="input-group-text" id="basic-addon1">
                Search
              </span>
            </div>
          </form>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav m-auto">
              <li className="nav-item dropdown active">
                <Link
                  className="nav-link dropdown-toggle active"
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  All Categories
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {category !== null &&
                    category?.map((cat, i) => (
                      <li key={i}>
                        <Link
                          className="dropdown-item"
                          to={`/category/${cat?.id}`}
                        >
                          {cat?.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              {profile !== null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      Cart({cart_product_length})
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
