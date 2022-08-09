import tw from "twin.macro";
import  {Container} from "components/misc/Layouts.js";
import Header from "../components/headers/light";
import ProcductsCard from 'components/cards/ProcductsCard';


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;

export default function Product(props) {
  
  
 
   
  return   (
    

    <Container >
       
       <HeaderRow> <Header/></HeaderRow>
        <ProcductsCard/>
        

    </Container>
  )
}
