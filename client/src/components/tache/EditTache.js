import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { TacheService } from "Service/Tache-Service";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeader from "../marchandiseur/PageHeader";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { MarchandiseurService } from "Service/Marchandiseur-Service";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const PrimaryAction = tw.button`mt-0 px-8 py-3  text-sm sm:text-base  sm:px-8 sm:py-4 bg-gray-100  text-primary-500 font-bold rounded-5xl shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:outline-none`;

export default function EditTache() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [TitreT, setTitreT] = useState("");
  const [dateT, setDateT] = useState("");
  const [LieuT, setLieuT] = useState("");
  const [description, setDescription] = useState("");
  const [marchandiseurs, setMarchandiseurs] = useState([]);
  const [marchandiseur, setMarchandiseur] = useState("");
  const [previousMarchandiseur, setPreviousMarchandiseur] = useState("");

  useEffect(() => {
    TacheService.fetchTacheById(id)
      .then((res) => {
        setTitreT(res.data.TitreT);
        setDateT(res.data.dateT);
        setLieuT(res.data.address);
        setDescription(res.data.description);
        if (res.data.marchandiseur !== null) {
          setMarchandiseur(res.data.marchandiseur._id);
        } else setMarchandiseur(null);
        if(res.data.marchandiseur !== undefined && res.data.marchandiseur !== null ) {
          setPreviousMarchandiseur(res.data.marchandiseur);

        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    MarchandiseurService.fetchMarchandiseurs().then((res) => {
      setMarchandiseurs(res.data);
    });
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const objetTache = {
      _id: id,
      TitreT: TitreT,
      dateT: dateT,
      LieuT: LieuT,
      description: description,
      marchandiseur: marchandiseur,
    };

    await TacheService.editTache(objetTache)
      .then((res) => {
        toast.success("Tache modifié", {
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
        toast.error(" Tache non modifié", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    if (
      marchandiseur !== "" &&
      marchandiseur !== undefined &&
      marchandiseur !== null
    ) {
      const objetMarchandisuer = {
        _id: marchandiseur,
        tache: id,
      };
      await MarchandiseurService.editTacheMarchandiseur(objetMarchandisuer)
        .then((res) => {
          console.log("The task has been assigned to " + res.data.name);
        })
        .catch((error) => console.log(error));
    }

     if ( previousMarchandiseur !=="" && previousMarchandiseur !==null && previousMarchandiseur._id !== marchandiseur ) {
      const objetpreviousMarchandisuer = {
        _id: previousMarchandiseur._id,
        tache:id
        
      };
      console.log(id)
      await MarchandiseurService.editTachePreviousMerchandiser(objetpreviousMarchandisuer)
      .then((res) => console.log(res) ).catch((error) => console.log(error));
    } 

    navigate("/home/tache");
    console.log(previousMarchandiseur)

  };
  return (
    <div style={{ textAlign: "center" }}>
      <PageHeader
        title="Modifier Tache"
        subTitle="Modifier les données du Tache"
        icon={<AssignmentIcon fontSize="large" style={{ color: "#6415ff" }} />}
      />
      <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
        <PrimaryAction
          type="submit "
          style={{ padding: 15, margin: 20, width: 150 }}
        >
          <SaveIcon /> Update
        </PrimaryAction>
        <PrimaryAction
          type="button"
          onClick={() => navigate("/home/tache")}
          style={{ padding: 15, margin: 2, width: 150 }}
        >
          <CancelIcon />
          Annuler
        </PrimaryAction>
        <div className="input-field" style={{ width: "350px" }}>
          <i className="fas fa-list"></i>

          <input
            type="text"
            name="TitreT"
            placeholder="Titre Tache"
            required
            value={TitreT}
            onChange={(e) => setTitreT(e.target.value)}
          />
        </div>
        <div className="input-field" style={{ width: "350px" }}>
          <i className="fas fa-calendar-check"></i>
          <input
            type="date"
            name="dateT"
            value={dateT}
            min="2022-04-23"
            max="2030-04-23"
            onChange={(e) => setDateT(e.target.value)}
            required
          />
        </div>
        <div className="input-field" style={{ width: "350px" }}>
          <i className="fas fa-store"></i>
          <input
            type="text"
            required
            placeholder="Lieu Tache"
            name="LieuT"
            value={LieuT}
            onChange={(e) => setLieuT(e.target.value)}
          />
        </div>
        <div className="input-field" style={{ width: "350px" }}>
          <i className="fas fa-battery-half"></i>
          <input
            type="text"
            required
            placeholder="Etat Tache"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <TextField
          style={{ width: "350px" }}
          select
          label="Marchandiseur"
          variant="outlined"
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
      </form>
    </div>
  );
}
