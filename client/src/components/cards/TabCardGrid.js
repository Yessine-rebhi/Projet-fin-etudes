import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container } from "components/misc/Layouts.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as StarIcon } from "../../img/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../img/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../img/svg-decorator-blob-7.svg";
import { SectionHeading } from "components/misc/Headings.js";
import axios from "axios";
import rapportImage from "../../img/rapportImage.jpg";
import Header from "../headers/light.js";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MaterialTable from 'material-table';
import { Grid } from "antd";




const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Title = tw(SectionHeading)``;

const PrimaryAction = tw.button`mt-0 px-8 py-3  text-sm sm:text-base  sm:px-8 sm:py-4 bg-gray-100  text-primary-500 font-bold rounded-5xl shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:outline-none`;

const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;

const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.image}");`}
  ${tw` bg-center bg-cover relative rounded-t`}
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({
  heading = "Consultez les rapports :",
  tabs = {
    rapportInfo: [
      {
        presence: "",
        nombre: "",
        position: "",
        prix: "",
        etatStock: "",
        reclamation: "",
        Produit: "",
        image: ""
      }
    ],
  },
}) => {
  const [rapports, setRapports] = useState([]);
  const [rapportConcurrent, setRapportConcurrent] = useState([]);


  const tabsKeys = Object.keys(tabs);

  const fetchData = () => {
    axios
      .get(
        "http://localhost:5000/rapports/societe/" + localStorage.getItem("id")
      )
      .then((response) => {
        setRapports(response.data);

        console.log(response);

      });
  };

  const GetListRapportConccurrent = () => {
    axios
      .get(
        "http://localhost:5000/rapportConcurrent/societe/" + localStorage.getItem("id")
      )
      .then((response) => {
        setRapportConcurrent(response.data);
        console.log(response);

      });
  };


  useEffect(() => {
    GetListRapportConccurrent();
    fetchData();
  }, []);

  function createData(titreR, heure, tache, rapportInfo) {
    return {
      titreR,
      heure,
      tache,
      rapportInfo,

    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.titreR}
          </TableCell>
          <TableCell align="right">{row.tache}</TableCell>
          <TableCell align="right">{row.heure}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
               
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };






  return (
    <Container style={{ overflow: "hidden" }}>
      <HeaderRow>
        <Header />
      </HeaderRow>
      <MaterialTable
        title="Rapports"
        columns={[
          { title: 'titre', field: 'titreR' },
          { title: 'tache', field: 'tache.TitreT' },
          { title: 'marchandiseur', field: 'tache.marchandiseur' },
          { title: 'Heure', field: 'heure' },


        ]}
        data={rapports}
        detailPanel={[
          {
            tooltip: 'List Rapport',
            render: rowData => {
              return (
                <form
                  style={{
                    fontSize: 100,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#6415ffc4',

                  }}
                >
                   

                  {rowData.rapportInfo.map((rapportInfo) => (
                    <Card>
                     
                      <CardText >
                      <CardTitle name="presence"> rapport:</CardTitle>
                        <CardContent name="presence"> Presence:{rapportInfo.presence}</CardContent>
                        <CardContent name="nombre">Nombre de Produit:{rapportInfo.nombre}</CardContent>
                        <CardContent name="position">Position de Produit:{rapportInfo.position}</CardContent>
                        <CardContent name="prix" >Prix de vente{rapportInfo.prix}</CardContent>
                        <CardContent name="etatStock">Etat de Stock: {rapportInfo.etatStock}</CardContent>
                        <CardContent name="reclamation">Reclamation: {rapportInfo.reclamation}</CardContent>
                        <CardContent name="Produit" >Produit:{rapportInfo.Produit}</CardContent>
                      </CardText>
                    </Card>

                  ))}
                </form>
              )
            },
          },
          {

            icon: 'image',
            tooltip: 'List Image',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 100,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#edf2f7',
                  }}
                >
                  
                  <p>Produits :</p>

                      {rowData.rapportInfo.map((rapportInfo) => (
                       <img src={rapportInfo.image} alt="" style={{ display: "inline" ,width: "205px"}} />
                  ))}
                     <p>Produits concurrents :</p>
                      {rapportConcurrent?.map((rapportConcurrent) => (
                     <h1> {rapportConcurrent.rapportInfo.map((rapportInfo) => (
                       <img src={rapportInfo.image} alt="" style={{ display: "inline" ,width: "205px"}}/>
                      ))} </h1>
  
                    ))}
                    
                  
                  
                </div>
              )
            },
          },
          {
            icon: 'article',
            tooltip: 'List Rapport Conccurrent',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 100,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#6415ffc4',
                  }}
                >
                  {rapportConcurrent?.map((rapportConcurrent) => (
                    <h1> {rapportConcurrent.rapportInfo.map((rapportInfo) => (
                      <Card>
                      <CardText >
                      <CardTitle name="presence"> rapport Concurrent:</CardTitle>
                        <CardContent name="presence"> Presence du Produit Conccurrent:{rapportInfo.presence}</CardContent>
                        <CardContent name="nombre">repartition du Produit Conccurrent:{rapportInfo.repartition}</CardContent>
                        <CardContent name="nombre">emplacement du Produit Conccurrent:{rapportInfo.emplacement}</CardContent>
                        <CardContent name="nombre">prix du Produit Conccurrent:{rapportInfo.prix}</CardContent>
                        <CardContent name="nombre"> Produit Conccurrent :{rapportInfo.Produit}</CardContent>
                      </CardText>
                    </Card>
  
  
                    ))} </h1>
                    
                    ))}


                </div>
              )
            },
          },
        ]}
      />
    </Container>
  );
};
