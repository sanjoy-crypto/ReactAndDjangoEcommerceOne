import React from "react";
import { useGlobalState } from "../state/provider";
import { domain, header } from "../env";
import { useState } from "react";
import Axios from "axios";

const ProfilePage = () => {
  const [{ profile }, dispatch] = useGlobalState();
  // console.log("From Profile Profile Data : ",profile)

  const [email, setEmail] = useState(profile?.prouser?.email);
  const [firstName, setFirstName] = useState(profile?.prouser?.first_name);
  const [lastName, setLastName] = useState(profile?.prouser?.last_name);
  const [image, setImage] = useState(null);

  const updateUser = async () => {
    await Axios({
      method: "post",
      url: `${domain}/api/userdataupdate/`,
      headers: header,
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
      },
    }).then((res) => {
      // console.log(res.data)
      dispatch({
        type: "PAGE_RELOAD",
        pagerelod: res.data,
      });
    });
  };

  const updateProfileImage = async () => {
    const formdata = new FormData();
    formdata.append("image", image);
    await Axios({
      method: "post",
      url: `${domain}/api/profileimageupdate/`,
      headers: header,
      data: formdata,
    }).then((res) => {
      // console.log('image data :' ,res.data);
      dispatch({
        type: "PAGE_RELOAD",
        pagerelod: res.data,
      });
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="userProfile text-center">
            <img src={`${domain}${profile?.image}`} className="proflleImg" />
            <div className="userProfile_info">
              <h3>
                {profile?.prouser?.first_name} {profile?.prouser?.last_name}
              </h3>
              <p>Username : {profile?.prouser?.username}</p>
              <p>Email : {profile?.prouser?.email}</p>
            </div>
          </div>
          <div className="userUpdate">
            <h3 className="mb-4 text-center">Update User Information</h3>

            <div className="row">
              <div className="col-md-6">
                <div class="mb-3">
                  <label class="form-label">First Name</label>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    class="form-control"
                    value={firstName}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Last Name</label>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    class="form-control"
                    value={lastName}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    class="form-control"
                    value={email}
                  />
                </div>

                <button onClick={updateUser} class="btn btn-primary">
                  Update
                </button>
              </div>
              <div className="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Profile Image</label>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    class="form-control"
                  />
                  <button
                    onClick={updateProfileImage}
                    type="submit"
                    class="btn btn-primary my-3 "
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
