import { useState } from "react";
import axios from "axios";
import styles from "./ForgetPassword.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tw from "twin.macro";

const PrimaryAction = tw.button`mt-0 px-8 py-3  text-sm sm:text-base  sm:px-8 sm:py-4 bg-gray-100  text-primary-500 font-bold rounded-5xl shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:outline-none`;

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5000/api/password-reset`;
      const { data } = await axios.post(url, { email });
	  toast.success(data.message)
      
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

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className={styles.input}
        />

        <PrimaryAction type="submit" value="Submit">
          Submit
        </PrimaryAction>
      </form>
    </div>
  );
};

export default ForgetPassword;
