import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React, { useState } from 'react';
import tw from "twin.macro";
import add from "../../img/add.png";
import { PickerOverlay } from "filestack-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./Products.css" ;



const PrimaryAction = tw.button`mt-0 px-8 py-3  text-sm sm:text-base  sm:px-8 sm:py-4 bg-gray-100  text-primary-500 font-bold rounded-5xl shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:outline-none`;



const AddProducts = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [show, setShow] = useState("");

  const [data, setData] = useState({
    name: "",
    description: "",
    categorie: "",
    Prix: "",
    image: "",
    idSoc:""

  });
 
  data.idSoc=localStorage.getItem('id')
  

  const PickerOptions = {
    maxFiles: 1,
    onClose: () => setShow(false),
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleProduitSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/products";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/home/Product";
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
    <>
      {show ? (
        <PickerOverlay
          apikey={"AypHsZmPQ9CX29N3QySPaz"}
          onSuccess={(res) => (data.image = res.filesUploaded[0].url)}
          onUploadDone={() =>
            toast.success("Your files has been ulpoaded succesfuly")
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


      <PrimaryAction onClick={() => setShowRegisterForm(!showRegisterForm)}>
        Ajouter Produit
      </PrimaryAction>
      <Dialog
        open={showRegisterForm}
        fullWidth
        onClose={() => setShowRegisterForm(false)}
      >
       
        <DialogContent>
        <form 
              method="POST"
              onSubmit={handleProduitSubmit}
             
            >
               <DialogTitle  style={{'paddingLeft':"35%"}}>Ajouter Produit</DialogTitle>

               <button type="button" style={{'left': "27%"}} className="button-papier" onClick={() => setShow(true)}>
                Ajouter image produit !{" "}
                <img
                  src={add}
                  style={{ display: "inline-block" }}
                  alt="papier"
                />{" "}
              </button>{" "}

              <div className="input-field" style={{'left': "10%"}} >
              <i class="fa fa-pencil" aria-hidden="true"></i>

                <input
                   label="Name"
                   type="text"
                   name="name"
                   placeholder="name"
                   required
                   value={data.name}
                   onChange={handleChange}
                  
                />
              </div>
              <div className="input-field"  style={{'left': "10%"}} >
              <i class="fa fa-align-center" aria-hidden="true"></i>


                <input
                   label="Description"
                   type="text"
                   name="description"
                   placeholder="description"

                   value={data.description}
                   onChange={handleChange}
                />
              </div>
              <div className="input-field"  style={{'left': "10%"}} >
              <i class="fa fa-money" aria-hidden="true"></i>


                <input
                    label="Prix"
                    type="number"
                    required
                    name="Prix"
                    placeholder="Prix"

                    value={data.Prix}
                    onChange={handleChange}
                />
              </div>
              <div className="input-field"  style={{'left': "10%"}} >
              <i class="fa fa-align-justify" aria-hidden="true"></i>

                <input
                    label="categorie"
                    type="String"
                    required
                    name="categorie"
                    placeholder="categorie"

                    value={data.categorie}
                    onChange={handleChange}
                />
              </div>
             
             
             
                <PrimaryAction
                   style={{'left': "38%"}}
                  type='submit'
                  disableElevation
                >
                  Ajouter
                </PrimaryAction>
            </form>
        </DialogContent>
      </Dialog>

    </>
  );
};
export default AddProducts;