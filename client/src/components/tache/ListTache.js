import { useState, useEffect } from "react";

import { TacheService } from "Service/Tache-Service";
import TacheForm from "./TacheForm";
import MUIDataTable from "mui-datatables";
//npm i @mui/styles
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import { Container } from "components/misc/Layouts.js";
import { useNavigate } from "react-router-dom";
import { MarchandiseurService } from "Service/Marchandiseur-Service";

import tw from "twin.macro";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "../headers/light.js";

const PrimaryAction = tw.button`mt-0 px-8 py-3  text-sm sm:text-base  sm:px-8 sm:py-4 bg-gray-100  text-primary-500 font-bold rounded-5xl shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:outline-none`;

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;

const ListTache = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [taches, setTaches] = useState([]);
  const [rowIndex, setRowIndex] = useState(0);
  useEffect(() => {
    GetListTaches();
    pull_data();
  }, [showRegisterForm]);
  useEffect(() => {
    SetTacheToMarchandiseur();
    console.log(rowIndex);
  }, [rowIndex]);

  let navigate = useNavigate();

  const GetListTaches = async () => {
    await TacheService.fetchTaches().then((res) => {
      setTaches(res.data);
    });
  };

  const suppTache = async (_id) => {
    try {
      await TacheService.deleteTache(_id);
      console.log(_id + " has been deleted");
    var newtaches = taches.filter((item) => {
      return item._id !== _id;
    });
    setTaches(newtaches);
    setRowIndex(rowIndex - 1);
    
    toast.success("Tache Supprimé", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      toast.error(error.response.data.message);
    }
  }
    }

  const SetTacheToMarchandiseur = async () => {
    if (rowIndex > 0) {
      if (taches[taches.length - 1] &&
        taches[taches.length - 1].marchandiseur != null &&
        taches[taches.length - 1].marchandiseur._id != null
      ) {
        const objetMarchandiseur = {
          _id: taches[taches.length - 1].marchandiseur._id,
          tache: taches[taches.length - 1]._id,
        };
        await MarchandiseurService.editTacheMarchandiseur(objetMarchandiseur)
          .then(() =>
            console.log(
              "the last task has been assinged to  " +
                taches[taches.length - 1].marchandiseur.name
            )
          )
          .catch((error) => console.log(error));
      }
    }
  };

  const columns = [
    {
      label: "Titre Tache",
      name: "TitreT",
    },
    {
      label: "Date Tache",
      name: "dateT",
    },
    {
      label: "Lieu Tache",
      name: "address",
    },
    
    {
      name: "_id",
      label: "Actions",
      options: {
        customBodyRender: (value) => (
          <div>
            <PrimaryAction
              type="button"
              onClick={() => navigate("/tache/edit/" + value)}
            >
              <EditIcon />
            </PrimaryAction>

            <PrimaryAction
              onClick={() => {
                suppTache(value);
              }}
            >
              <DeleteIcon />
            </PrimaryAction>
          </div>
        ),
      },
    },
    {
      name: "Lignes",
      label: "Lignes",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, update) => {
          let rowIndex = Number(tableMeta.rowIndex) + 1;
          setRowIndex(rowIndex);
          return <span>{rowIndex}</span>;
        },
      },
    },
  ];

  const pull_data = (data) => {
    setShowRegisterForm(data);
  };

  return (
    <Container>
      <HeaderRow>
        {" "}
        <Header />
      </HeaderRow>

      <TacheForm func={pull_data} />
      {taches.length > 0 ? (
        <ThemeProvider theme={createTheme()}>
          <MUIDataTable
            title="Liste des taches"
            data={taches}
            columns={columns}
          />
        </ThemeProvider>
      ) : null}
    </Container>
  );
};

export default ListTache;
