import React, { useState, useEffect } from 'react'
import tw from 'twin.macro';
import { MarchandiseurService } from 'Service/Marchandiseur-Service';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import PageHeader from "./PageHeader"
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
const PrimaryAction = tw.button`mt-0 px-8 py-3  text-sm sm:text-base  sm:px-8 sm:py-4 bg-gray-100  text-primary-500 font-bold rounded-5xl shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:outline-none`;

export default function EditMarchandiseur() {

  let navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    MarchandiseurService.fetchMarchandiseurById(id)
      .then(res => {
        setName(res.data.name);
        setEmail(res.data.email);
        setTel(res.data.tel)
        setPassword(res.data.password);

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



    const objetMarchandiseur = {
      _id: id,
      name: name,
      email: email,
      tel: tel,
      password: password,
     
    };

    await MarchandiseurService.editMarchandiseur(objetMarchandiseur).then((res) => {

      toast.success("Marchandiseur modifié", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      
    }).catch(error => {
      toast(" Marchandiseur non modifié", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    navigate("/home/ListMarchandiseur")



  }

  return (
    <div style={{textAlign: "center"}}> <PageHeader
      title="Modifier Marchandiseur"
      subTitle="Modifier les donnees du Marchandiseur"
      icon={<PeopleOutlineTwoToneIcon fontSize="large" style={{ color: '#6415ff' }} />}
    />

      <form onSubmit={handleSubmit} style={{ display: "inline-block"}}>
        <PrimaryAction  type= "submit " style={{padding:15,margin:20,width:150}}>
          <SaveIcon /> Update
        </PrimaryAction>
        <PrimaryAction type='button' onClick={()=>navigate("/home/ListMarchandiseur")} style={{padding:15,margin:2,width:150}}>
          <CancelIcon />
          Annuler
        </PrimaryAction>
        <div className="input-field" style={{width:"350px"}}>

          <i className="fas fa-user"></i>

          <input
             variant="outlined"
            type="text"
            name="name"
            placeholder="name"
            required
            value={name}
            onChange={e => setName(e.target.value)}

          />
        </div>
        <div className="input-field" style={{width:"350px"}}>
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-field" style={{width:"350px"}}>
          <i className="fas fa-mobile"></i>
          <input
            type="tel"
            required
            placeholder="Telephone"
            name="tel"
            value={tel}
            onChange={e => setTel(e.target.value)}
            maxLength="8"
            minLength="8"
          />
        </div>
        <div className="input-field" style={{width:"350px"}}>
          <i className="fas fa-lock"></i>
          <input
            type="password"
            required
            placeholder="Mot de passe"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </form>


    </div>
  )
}
