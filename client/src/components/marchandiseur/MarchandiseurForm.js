import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Toolbar,
} from "@material-ui/core";

import tw from "twin.macro";
import BadgeIcon from '@mui/icons-material/Badge';
import PageHeader from "./PageHeader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const PrimaryAction = tw.button`mt-0 px-8 py-3  text-sm sm:text-base  sm:px-8 sm:py-4 bg-gray-100  text-primary-500 font-bold rounded-5xl shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:outline-none`;

const MarchandiseurForm = (props) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    tel: "",
    password: "",
    repeat_password: "",
    idSoc:""
  });

data.idSoc=localStorage.getItem("id");

  useEffect(
    () => {
      props.func(showRegisterForm)
    },
    [showRegisterForm] ,[] ); 

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleMarchandiseurSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/marchandiseurs";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);

      setShowRegisterForm(!showRegisterForm);

      setData({
        name: "",
        email: "",
        tel: "",
        password: "",
        repeat_password: "",
      });
      toast.success("Marchandiseur ajouté", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
    <div>
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
      <Toolbar style={{ marginLeft: "30%" }}>
        {/* <PageHeader
          title="Nouveau Marchandisseur"
          subTitle="créez un nouveau marchandisseur"
          icon={
            <PeopleOutlineTwoToneIcon
              fontSize="large"
              style={{ color: "#6415ff" }}
            />
          }
        /> */}
        <PageHeader
          title="Nouveau Marchandisseur"
          subTitle="créez un nouveau marchandisseur"
          icon={
            <BadgeIcon fontSize="large" style={{ color: "#6415ff" }} />
          }
        />
        <PrimaryAction
          style={{ marginLeft: "2%" }}
          onClick={() => setShowRegisterForm(!showRegisterForm)}
        >
          créez nouveau{" "}
        </PrimaryAction>
      </Toolbar>

      <Dialog
        open={showRegisterForm}
        fullWidth
        onClose={() => setShowRegisterForm(false)}
      >
        <DialogContent style={{ textAlign: "center" }}>
          <form
            method="POST"
            style={{ display: "inline-block" }}
            onSubmit={handleMarchandiseurSubmit}
          >
            <DialogTitle>Marchandiseur Form</DialogTitle>

            <div className="input-field" style={{ width: "350px" }}>
              <i className="fas fa-user"></i>

              <input
                type="text"
                name="name"
                placeholder="name"
                required
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-field" style={{ width: "350px" }}>
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
              />
            </div>

            <div className="input-field" style={{ width: "350px" }}>
              <i className="fas fa-mobile"></i>
              <input
                type="tel"
                required
                placeholder="Telephone"
                name="tel"
                onChange={handleChange}
                value={data.tel}
                maxLength="8"
                minLength="8"
              />
            </div>
            <div className="input-field" style={{ width: "350px" }}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                required
                placeholder="Mot de passe"
                name="password"
                onChange={handleChange}
                value={data.password}
              />
            </div>
            <div className="input-field" style={{ width: "350px" }}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                required
                placeholder=" Verifier mot de passe"
                name="repeat_password"
                onChange={handleChange}
                value={data.repeat_password}
              />
            </div>
            <PrimaryAction type="submit" disableElevation>
              Submit
            </PrimaryAction>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarchandiseurForm;
