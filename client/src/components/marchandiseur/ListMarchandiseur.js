import { useState, useEffect } from "react";
import { MarchandiseurService } from "Service/Marchandiseur-Service";
import MarchandiseurForm from "./MarchandiseurForm";

import MUIDataTable from "mui-datatables";
//npm i @mui/styles
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import { Container } from "components/misc/Layouts.js";
import { useNavigate } from "react-router-dom";

import tw from "twin.macro";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "../headers/light.js";

const PrimaryAction = tw.button`mt-0 px-8 py-3  text-sm sm:text-base  sm:px-8 sm:py-4 bg-gray-100  text-primary-500 font-bold rounded-5xl shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:outline-none`;

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;


const ListMarchandiseur = (props) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [marchandiseurs, setMarchandiseurs] = useState([]);
  const [rowIndex, setRowIndex] = useState("");
  useEffect(() => {
    GetListMarchandiseurs();
    pull_data();
  }, [showRegisterForm]);
  useEffect(() => {}, [rowIndex]);
  let navigate = useNavigate();

  const GetListMarchandiseurs = async () => {
    await MarchandiseurService.fetchMarchandiseurs().then((res) => {
      setMarchandiseurs(res.data);
    });
  };

  const suppMarchandiseur = async (_id) => {
    await MarchandiseurService.deleteMarchandiseur(_id);

    var newmarchandiseurs = marchandiseurs.filter((item) => {
      console.log(item);
      return item._id !== _id;
    });
    setMarchandiseurs(newmarchandiseurs);

    toast.success("Marchandiseur Supprimé", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const columns = [
    {
      label: "Marchandiseur",
      name: "name",
    },
    {
      label: "Email",
      name: "email",
    },
    {
      label: "Telephone",
      name: "tel",
    },
    {
      label: "Password",
      name: "password",
    },
    
    {
      name: "_id",
      label: "Actions",
      options: {
        customBodyRender: (value) => (
          <div>
            <PrimaryAction
              type="button"
              onClick={() => navigate("/ListMarchandiseur/edit/" + value)}
            >
              <EditIcon />
            </PrimaryAction>

            <PrimaryAction
              onClick={() => {
                suppMarchandiseur(value);
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

      <MarchandiseurForm func={pull_data} />
      {marchandiseurs.length > 0 ? (
        <ThemeProvider theme={createTheme()}>
          <MUIDataTable
            title="Liste des Marchandiseurs"
            data={marchandiseurs}
            columns={columns}
          />
        </ThemeProvider>
      ) : null}
    </Container>
  );
};

export default ListMarchandiseur;
