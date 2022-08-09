import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import tw from "twin.macro";
import { toast } from 'react-toastify';
import "components/products/EditProducts.css";
import { PickerOverlay } from "filestack-react";


const PrimaryAction = tw.button`mt-0 px-8 py-3  text-sm sm:text-base  sm:px-8 sm:py-4 bg-gray-100  text-primary-500 font-bold rounded-5xl shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:outline-none`;

export default function EditProducts() {
  const [show, setShow] = useState("");
  let navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [categorie, setCategorie] = useState("");
  const [description, setDescription] = useState("");
  const [Prix, setPrix] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/products/"+id)
      .then(res => {
        setName(res.data.name);
        setCategorie(res.data.categorie);
        setDescription(res.data.description)
        setPrix(res.data.Prix);
        setImage(res.data.image);
       

      })
      .catch((error) => {
        console.log(error);
        toast("Une erreur est parvenue", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })

  }, []);

 

  const handleSubmit = async (event) => {

    event.preventDefault();
    await axios.put("http://localhost:5000/products/" +id,
        {
          _id: id,
          name: name,
          categorie: categorie,
          description: description,
          Prix: Prix,
          image: image,
        }
      ).then((res)=>{
        toast.success("products modifié", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }).catch(error =>{
        toast(" products non modifié", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
      navigate("/home/Product")
     

  };
  const PickerOptions = {
    maxFiles: 1,
    onClose: () => setShow(false),
  };
 


  return (
    <Container className="profileContainer">
    {show ? (
        <PickerOverlay
          apikey={"AypHsZmPQ9CX29N3QySPaz"}
          onSuccess={(res) => setImage ( res.filesUploaded[0].url) }
          pickerOptions={PickerOptions}
          preload={true}
          
        />
      ) : null}
      <Row>
        <Col>
        <img className="profilepic" src={image} alt=""/>
        </Col>
        <Col>
        <form className="ProductsProfile" onSubmit={handleSubmit} >

            <div className="input-field">
            <i class="fa fa-pencil" aria-hidden="true"></i>
              <input
                type="text"
                required
                placeholder="name"
                name="name"
                value={name}
            onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-field">
            <i class="fa fa-align-center" aria-hidden="true"></i>
              <input
                type="text"
                required
                placeholder="categorie"
                name="categorie"
                value={categorie}
                onChange={e => setCategorie(e.target.value)}
              />
            </div>

            <div className="input-field">
            <i class="fa fa-money" aria-hidden="true"></i>
              <input
                type="number"
                required
                placeholder="prix"
                name="prix"
                value={Prix}
                onChange={e => setPrix(e.target.value)}
              />
            </div>

            <div className="input-field">
            <i class="fa fa-align-justify" aria-hidden="true"></i>
              <input
                type="text"
                required
                placeholder="description"
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <button type="button" className="button-papier" onClick={() => setShow(true)}>
              Modifider Photo de produit {" "}
            </button>{" "}
            <PrimaryAction type="submit" value="updateProfile">
              Modifider Produit
            </PrimaryAction>

          </form>
        </Col>
      </Row>

    </Container>
  )


}