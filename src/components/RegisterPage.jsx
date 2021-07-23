import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { domain, header2 } from "../env";

const RegisterPage = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const history = useHistory();
  const registerUser = async () => {
    if (password !== confirmPassword) {
      alert("Passwords Not Match. Try Again!!!");
    } else {
      await Axios({
        method: "post",
        url: `${domain}/api/register/`,
        headers: header2,
        data: {
          username: username,
          password: password,
        },
      }).then((res) => {
        // console.log("Register : ", res.data);
        alert(res.data["Message"]);
        history.push("/login");
      });
    }
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center bg-light p-5">
        <div className="col-md-6">
          <h2 className="title">Register</h2>
          <hr /> <br />
          <div class="form-group mb-3">
            <label>Useername</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              class="form-control mt-2"
              placeholder="Username"
            />
          </div>
          <div class="form-group mb-3">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              class="form-control mt-2"
              placeholder="Password"
            />
          </div>
          <div class="form-group mb-3">
            <label>Confirm Password</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              class="form-control mt-2"
              placeholder="Confirm Password"
            />
          </div>
          <button onClick={registerUser} className="btn btn-primary">
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
