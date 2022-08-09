import React, { useState } from "react";
import "./AdminLogin.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  // React States
  const [LoginData, setLoginData] = useState({ email: "", password: "" });
  

  const handleLoginChange = ({ currentTarget: input }) => {
    setLoginData({ ...LoginData, [input.name]: input.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/admin/home";
      const { data: res } = await axios.post(url, LoginData);
      localStorage.setItem("token", res.data);
      window.location = "/admin/home";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  






  const renderForm = (
    <form
      method="POST"
      className="sign-in-form"
      onSubmit={handleLoginSubmit}
    >
      <h2 className="title">Connexion</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleLoginChange}
          value={LoginData.email}
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={LoginData.password}
          onChange={handleLoginChange}
          required
        />
      </div>
      <input type="submit" value="Connexion" className="btnAdmin solid" />
    </form>
  );
  return (
    <div className="login-form-admin">
      <ToastContainer
  progressClassName="toastProgress"
  bodyClassName="toastBody"
/>
    <div className="app"> {renderForm}</div>
    </div>
  );
}
export default Login;
