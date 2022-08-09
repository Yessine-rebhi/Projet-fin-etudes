import React, { useState } from "react";
import "./LoginRegister.css";
import login from "../../../img/login.svg";
import add from "../../../img/add.png";
import register from "../../../img/register.svg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import tw from "twin.macro";
import { PickerOverlay } from "filestack-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";




const PrimaryAction = tw.button`mt-0 px-8 py-3  text-sm sm:text-base  sm:px-8 sm:py-4 bg-gray-100  text-primary-500 font-bold rounded-5xl shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:outline-none`;

const LoginRegister = (props) => {
  // React States
  const [addclass, setaddclass] = useState("sign-in-mode");
  const [show, setShow] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [LoginData, setLoginData] = useState({ email: "", password: "" });
  const [data, setData] = useState({
    username: "",
    adress: "",
    email: "",
    password: "",
    repeat_password: "",
    tel: "",
    domaine: "",
    papier: "",
    etat:false
  });
  data.domaine = selectedOption.value;

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleLoginChange = ({ currentTarget: input }) => {
    setLoginData({ ...LoginData, [input.name]: input.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/responsables/login";
      const { data: res } = await axios.post(url, LoginData);
      localStorage.setItem("token", res.data);
      localStorage.setItem("user", LoginData.email);
      localStorage.setItem("id", res.id);
      if(!res.etat){
        toast.error("veuillez attendre l'activation de votre compte par l'admininstrateur");
      } else
      window.location = "/Connect";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/responsables";
      await axios.post(url, data);
      setaddclass("sign-in-mode");
      toast.success("You have registred successfuly please login");
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

  //Select options and styles
  const options = [
    { value: "Santé", label: "Santé" },
    { value: "Alimentaire", label: "Alimentaire" },
    { value: "cosmétique", label: "cosmétique" },
  ];
  const animatedComponents = makeAnimated();
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#f0f0f0",
      borderRadius: 55,
    }),
  };
  // Picker options
  const PickerOptions = {
    maxFiles: 1,
    onClose: () => setShow(false),
  };

  //form

  const renderForm = (
    <div>
      {show ? (
        <PickerOverlay
          apikey={"AIfTXb0rjRLKmPqE1Hv7dz"}
          onSuccess={(res) => (data.papier = res.filesUploaded[0].url)}
          onUploadDone={() =>
            toast.success("Your file has been ulpoaded succesfuly")
          }
          pickerOptions={PickerOptions}
          preload={true}
        />
      ) : null}
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
      <div className={`loginContainer ${addclass}`} id="loginContainer">
        <div className="forms-loginContainer">
          <div className="signin-signup">
            <form
              method="POST"
              className="sign-in-form"
              onSubmit={handleLoginSubmit}
            >
              <h2 className="title">connexion</h2>
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
                />
              </div>
              <Link to="/forget-password" >
                <p id="forgetpass">Forgot Password ?</p>
              </Link>
              <PrimaryAction type="submit" value="connexion">
                connexion
              </PrimaryAction>
              
            </form>

            <form
              method="POST"
              className="sign-up-form"
              onSubmit={handleSubmit}
            >
              <h2 className="title">inscription</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  required
                  placeholder="Nom"
                  name="username"
                  onChange={handleChange}
                  value={data.username}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  required
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-address-card"></i>
                <input
                  type="text"
                  required
                  placeholder="Adresse"
                  name="adress"
                  onChange={handleChange}
                  value={data.adress}
                />
              </div>
              <div className="input-field">
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
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  required
                  placeholder="Mot de passe (Exemple1*)"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                />
              </div>
              <div className="input-field">
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
              <Select
                styles={customStyles}
                className="select"
                components={animatedComponents}
                options={options}
                placeholder="domaine"
                name="domaine"
                value={selectedOption.domaine}
                onChange={setSelectedOption}
              />
              <button type="button" className="button-papier" onClick={() => setShow(true)}>
                papier verification societe !{" "}
                <img
                  src={add}
                  style={{ display: "inline-block" }}
                  alt="papier"
                />{" "}
              </button>{" "}
              <PrimaryAction type="submit" value="inscription">
                inscription
              </PrimaryAction>
            </form>
          </div>
        </div>

        <div className="panels-loginContainer">
          <div className="panel left-panel">
            <div className="content mob">
              <h3>S'inscrire ! </h3>

              <p id="mobile">
                Inscrivez-vous pour profiter d'un gestion de suivi merchandising
                riche des controle des performances et statisituqe commercial et
                financiéres dans un point de ventes <br />
              </p>
              <p>
                <PrimaryAction
                  id="sign-up-btn"
                  onClick={() => setaddclass("sign-up-mode")}
                  value="inscrire"
                >
                  S'inscrire
                </PrimaryAction>
              </p>
            </div>
            <img src={login} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content ">
              <h3>déjà vous êtes inscrit!</h3>
              <p id="mobile">
                tapez votre nom et mot de passe dans la page connexion et
                profitez notre service
              </p>
              <PrimaryAction
                id="sign-in-btn"
                onClick={() => setaddclass("sign-in-mode")}
              >
                CONNEXION
              </PrimaryAction>
            </div>
            <img src={register} className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
  return <div className="app"> {renderForm}</div>;
};

export default LoginRegister;
