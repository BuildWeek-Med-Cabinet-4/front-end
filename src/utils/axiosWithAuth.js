import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  console.log("this is the token", token)

  return axios.create({
    baseURL: "https://best-med-cabinet.herokuapp.com/api",
    headers: {
      Authorization: token
    }
  });
};

export default axiosWithAuth;