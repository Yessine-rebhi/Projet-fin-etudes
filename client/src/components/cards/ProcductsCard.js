import React, { useState ,useEffect } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as StarIcon } from "../../img/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../img/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../img/svg-decorator-blob-7.svg";
import AddProducts from "components/products/AddProducts";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Title = tw(SectionHeading)``;



const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.image}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
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
  heading = "Consultez les Produits :",
   tabs = {
  Produits: [
    { name: "",
    categorie: "",
    description: "",
    Prix: "",
    image: "",},
    
  ], 
 
}
}) => { 
  const [products, setproducts] = useState([])
  let navigate = useNavigate();

  

  
  
const tabsKeys = Object.keys(tabs);
 
  const fetchData = () => {
    axios.get("http://localhost:5000/products/societe/"+ localStorage.getItem('id'))
      .then(response => {
        setproducts(response.data)
        console.log(response);
      });
      
  }

  useEffect(() => {
    fetchData()
  }, [])

  const supproducts = async (_id) => {
    await axios.delete("http://localhost:5000/products/"+_id)

    var newproduct = products.filter((item) => {
      console.log(item)
      return item._id !== _id
    })
    setproducts(newproduct);

    toast.success("product Supprimé", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

 

 

  return (
    <Container  className='Prod' >
      <ContentWithPaddingXl >
        <HeaderRow>
        <Title>{heading}</Title>
        <AddProducts />
         </HeaderRow>
        
       
        {tabsKeys.map((tabKey, index) => (
        <TabContent  
        key={index}
            variants={{
              current: {
                opacity: 1,
                scale:1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale:0.8,
                display: "none",
              }
            }}
            transition={{ duration: 0.4 }}
        >
        
          {products.map((products, index) => (
              <CardContainer key={index}>
                <Card className="group"  initial="rest" whileHover="hover" animate="rest">
                  <CardImageContainer >
                  <img key={index} src={products.image} alt=""/>
                    <CardRatingContainer>
                      <CardRating>
                        <StarIcon />
                        
                      </CardRating>
                     
                    </CardRatingContainer>
                    <CardHoverOverlay
                      variants={{
                        hover: {
                          opacity: 1,
                          height: "auto"
                        },
                        rest: {
                          opacity: 0,
                          height: 0
                        }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardButton onClick={()=>navigate("/EditProducts/edit/"+products._id)} > <EditIcon  /></CardButton> <br/>
                      <CardButton style={{ marginLeft: "15%" }}   onClick={() => { supproducts(products._id) }}><DeleteIcon /></CardButton>
                    </CardHoverOverlay>
                  </CardImageContainer>
                  <CardText >
                    <CardTitle name="name">{products.name}</CardTitle>
                    <CardContent name="description">{products.description}</CardContent>
                    <CardPrice  name="categorie">{products.categorie}</CardPrice>
                    <CardPrice name="Prix" >{products.Prix} TND</CardPrice>
                  </CardText>
                </Card>
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};