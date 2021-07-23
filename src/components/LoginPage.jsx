import Axios from "axios";
import React, { useState } from "react";
import { domain, header2 } from "../env";

const LoginPage = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const loginRequest = async () => {
    await Axios({
      method: "POST",
      url: `${domain}/api/login/`,
      headers: header2,
      data: {
        username: username,
        password: password,
      },
    })
      .then((res) => {
        // console.log(res.data['token'])
        window.localStorage.setItem("token", res.data["token"]);
        window.location.href = "/";
      })
      .catch((_) => {
        alert("Your Username or Password is Invalid. Try again !!!");
      });
  };
  return (
    <>
      <br /> <br />
      <div className="container">
        <div className="">
          <div className="row justify-content-center bg-light p-5 mb-5">
            <div className="col-md-6">
              <h2 className="title">Login Here</h2>
              <hr /> <br />
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  class="form-control"
                  placeholder="Username"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <button onClick={loginRequest} className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
