import Cookies from "js-cookie";

export const domain = "";
export const userToken = window.localStorage.getItem("token")
export const header = {
  Authorization: `token ${userToken}`,
};

const csrftoken = Cookies.get("csrftoken");
export const header2 = {
  "X-CSRFToken": csrftoken,
};


// export const domain = "";

/*
    window.localStorage.setItem('myCat', 'Tom');
    window.localStorage.removeItem('myCat');
    window.localStorage.clear();
    window.localStorage.getItem("token");
*/


