import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Toolbar,
  TextField,
  MenuItem,
} from "@material-ui/core";
import tw from "twin.macro";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { MarchandiseurService } from "Service/Marchandiseur-Service";
import pfe from "Axios/pfe.js";
import PageHeader from "../marchandiseur/PageHeader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const PrimaryAction = tw.button`mt-0 px-8 py-3  text-sm sm:text-base  sm:px-8 sm:py-4 bg-gray-100  text-primary-500 font-bold rounded-5xl shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:outline-none`;

const TacheForm = (props) => {

  let { addressT } = useParams();
  let navigate = useNavigate();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [marchandiseurs, setMarchandiseurs] = useState([]);
  const [marchandiseur, setMarchandiseur] = useState(null);
  const [data, setData] = useState({
    TitreT: "",
    dateT: "",
    address:"",
    description: "",
  });
  
  
  useEffect(() => {
    GetListMarchandiseurs();
    if(addressT != undefined){
      setData({address:addressT})
    }
  }, []);

  const GetListMarchandiseurs = async () => {
    await MarchandiseurService.fetchMarchandiseurs().then((res) => {
      setMarchandiseurs(res.data);
    });
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const refreshPage =  () => {
    window.location.reload(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const objetTache = {
      TitreT: data.TitreT,
      dateT: data.dateT,
      address:data.address,
      description: data.description,

      marchandiseur: marchandiseur,
      idSoc: localStorage.getItem("id"),
    };

    await pfe
      .post("/tache", objetTache)
      .then(() => {
        setShowRegisterForm(false);
        refreshPage();
        toast.success("Tache ajouté", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
      })
      .catch((error) => {
        toast.error(" Tache non ajouté", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
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
        <PageHeader
          title="Nouvelle tâche"
          subTitle="créez une nouvelle tache"
          icon={
            <AssignmentIcon fontSize="large" style={{ color: "#6415ff" }} />
          }
        />
        <PrimaryAction
          style={{ marginLeft: "2%" }}
          onClick={() => setShowRegisterForm(!showRegisterForm)}
        >
          créez nouvelle{" "}
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
            onSubmit={handleSubmit}
          >
            <DialogTitle>Tache Form</DialogTitle>
            <div>
             <PrimaryAction type='button'  style={{ width: "350px" }}  onClick={() => navigate("/home/tache/MapTache")} > <i className="fas fa-store"></i>  </PrimaryAction>
           </div>
            <div className="input-field" style={{ width: "350px" }}>
              <i className="fas fa-list"></i>

              <input
                type="text"
                name="TitreT"
                placeholder="Titre Tache"
                required
                value={data.TitreT}
                onChange={handleChange}
              />
            </div>
            <div className="input-field" style={{ width: "350px" }}>
              <i className="fas fa-calendar-check"></i>
              <input
                type="date"
                name="dateT"
                value={data.dateT}
                min="2022-04-23"
                max="2030-04-23"
                onChange={handleChange}
                required
              />
              
            </div>
             <div className="input-field" style={{ width: "350px" }}>
              <i className="fas fa-address-card"></i>
              <input
                type="text"
                required
                placeholder="adresse Tache"
                name="address"
                value={addressT}
                disabled
              />
            </div>
           
            <div className="input-field" style={{ width: "350px" }}>
              <i className="fas fa-align-justify"></i>
              <input
                type="text"
                required
                placeholder="description Tache"
                name="description"
                value={data.description}
                onChange={handleChange}
              />
            </div>

            <TextField
              fullWidth
              select
              label="Marchandiseur"
              variant="outlined"
              helperText="Sélectionner une Marchandiseur"
              value={marchandiseur}
              onChange={(event) => {
                setMarchandiseur(event.target.value);
              }}
            >
              {marchandiseurs
                ? marchandiseurs.map((index) => (
                    <MenuItem key={index._id} value={index._id}>
                      {index.name}
                    </MenuItem>
                  ))
                : null}
            </TextField>
            <div></div>
            <PrimaryAction type="submit" disableElevation>
              Submit
            </PrimaryAction>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TacheForm;