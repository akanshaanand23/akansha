
import React  ,{useState,useEffect,createRef}from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Grid from '@material-ui/core/Grid';
import "./home.css"
import {ServerURL, postDataAndImage,getData,postData} from "./FetchNodeServices";
import { SpaRounded } from "@material-ui/icons";
import Paper from '@material-ui/core/Paper';
import { fade, makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from "@material-ui/core/IconButton"
import {withRouter} from "react-router-dom"
import Header from "./header"
import Footer from "./footer"

const useStyles = makeStyles((theme) => ({
   
    paperStyle:{
      justifyContent:'flex-start',
      display:'flex',
      padding:10,
      height:310,
      width:215,
      margin:10,
      borderRadius:10,
      flexDirection:'column'

    }, 
    imageView:{
      width:120,
      
      justifyContent:'center',
      alignItems:"center",
      padding:10,
      margin:2,
      cursor:'pointer',
      "&:hover":{
        transform:'scale(1.25)',
        transition:"all 0.5s ease 0s",
      }
  
    },
}))
function Home(props){
    const classes = useStyles();
    const[productImage,setProductImage] =useState([])
    const[category,setCategory] = useState([])
    var consoleSlider = createRef()

    var settings = {
        dots:true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
      };
      const FetchAllCategory=async()=>{
        var result = await getData("categories/displayall")
       
         setCategory(result)
        
        }
  
        const adSlider=()=>{
            return category.map((item)=>{ 
                return(<>
              <img src ={`${ServerURL}/images/${item.ad}`}  width="100%" />
                </>)
              })
            }

      const Fetchproduct=async()=>{
        var result = await getData("product/prodqty")
        setProductImage(result)
         
        }

        useEffect(function(){
            Fetchproduct()
            FetchAllCategory()
            
        },[])
        const handleNext=()=>{
          consoleSlider.current.slickNext();
        }
        const handleBack=()=>{
         consoleSlider.current.slickPrev();
       }
       
   
const productImg=()=>{
    return productImage.map((item)=>{console.log("b",item.img1)
         return(
           
            <Paper elevation={3} className={classes.paperStyle}>
                <div  className={classes.imageView}>
            <img src ={`${ServerURL}/images/${item.img1}`} width="120px" height="150px" style={{display:"flex",alignItems:"center",justifyContent:"center",padding:10}}  onClick={()=>props.history.push({'pathname':'/productview'},{"product":item})}/>
            </div>
            
            <div style={{fontSize:15,fontWeight:'bold',padding:10}}>
           {item.productname.length<=20?item.productname.toUpperCase():item.productname.toUpperCase().substring(0,18)+"..."}
         </div>
         <div style={{fontSize:16,padding:10}}>
                  Day Price: <b>&#8377; {item.productprice}</b>
                </div>
                <div style={{fontSize:16,padding:10}}>
                {item.productdescription.length<=20?item.productdescription.toUpperCase():item.productdescription.toUpperCase().substring(0,18)+"..."}
                </div>
               
               </Paper>
            
    
                )
            })
        }






    return(
        <>
         <Header/>
          
        <Grid   item xs={12} style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
        <IconButton className={classes.arrowStyle} style={{background:"whitesmoke", position:'absolute',zIndex:1 ,left:5, opacity:0.8,}}>
             <ArrowBackIosIcon style={{color:"black",fontSize:'large'}} onClick={()=>handleBack()}/>
           </IconButton> 
         <Grid   item xs={12} style={{width:"100%",right:0  }} >
       
         <Slider {...settings}   ref={consoleSlider}>{adSlider()}</Slider> 
             </Grid>  
             <IconButton className={classes.arrowStyle} style={{background:"whitesmoke", position:'absolute',zIndex:1 ,right:5, opacity:0.8,marginLeft:"96%"}}>
        <ArrowForwardIosIcon style={{color:"black",fontSize:'large'}} onClick={()=>handleNext()}/>
           </IconButton> 
        </Grid>
        <Grid   item xs={12}  style={{display:"flex" ,alignItems:"left",justifyContent:"left" ,marginLeft:"10px"}}>
            <div>
            <h2 className="homeHeading">DEALS FOR YOU</h2>
            </div>
        
        </Grid>
        <Grid item xs={12}>
        <div style={{justifyContent:'center', alignItems:"center",display:'flex', flexDirection:'row', flexWrap:"wrap"}}>
        {productImg()} 
         </div>
         </Grid>
        
  
   <Grid   item xs={12}  style={{display:"flex" ,alignItems:"left",justifyContent:"left" ,marginLeft:"10px"}}>
       <div>
       <h2 className="homeHeading">RECOMMENDED SHOPS</h2>
       </div>
   
   </Grid>
   <Grid item xs={12}>
   <div style={{justifyContent:'center', alignItems:"center",display:'flex', flexDirection:'row', flexWrap:"wrap"}}>
   {productImg()} 
    </div>
    </Grid>
    <Footer/>
        </>
    )
}
export default withRouter(Home);