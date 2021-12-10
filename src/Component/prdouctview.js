import React ,{useState,useEffect ,createRef} from 'react'
import Header from "./header"
import Footer from "./footer"
import {ServerURL, postDataAndImage,getData,postData} from "./FetchNodeServices";
import Grid from "@material-ui/core/Grid"
import TodayIcon from "@material-ui/icons/Today";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import QtySpinner from "./QtySpinner"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {useDispatch , useSelector} from "react-redux"
import {withRouter} from "react-router-dom"
///////////////////////////////////////////////////////////////
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
const useStyles = makeStyles((theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    }));   
export default function Productview(props){
    
    const classes = useStyles(); 
    var item= props.history.location.state.product
    console.log("h",item)
    const [alignment, setAlignment] = React.useState('left');

    const handleAlignment = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

//////////////////////handle qty spinner///////////////////////////////////////////////////
const detail=()=>{
 return(  <Grid container spacing = {1}  >
     
 <Grid xs={12} style={{ marginTop:10,padding:10,fontSize:18,fontWeight:"bold" ,letterSpacing:1,}}>
    {item.productname.toUpperCase()}
</Grid>
 <Grid xs={12} style={{fontSize:16,padding:10,}}>
 Price:<b>{item.productprice}</b>
 </Grid>
 <Grid xs={12} style={{padding:10,fontWeight:"bold",justifyContent:'flex-start',
 display:'flex',
 
 }}>
    <div>Description</div>
        </Grid>
        <Grid  xs={12} style={{padding:10,display:"flex", flexDirection:"row", }}>
            {item.productdescription}
        </Grid>
        <Grid  xs={12} style={{padding:10,}}>
    <QtySpinner/>
</Grid>

 </Grid>)
}

////////////////////////end///////////////////////////////////////////////////////////////


/////////////////////date managment///////////////////////////////////////////////////////////////////////////////////////////




////////////////////end///////////////////////////////////////////////////////////////////////
/////////////////////console multiple picture///////////////////////////////////////////////////

///////////////////////end/////////////////////////////////////////////////////////////////////
/////////////////product detail//////////////////////////////////////////////////////////

////////////////////////end////////////////////////////////////////////////////////////////

    return(<>
         <Header history={props.history}/>
        
        <Grid container spacing ={1}>
            <Grid item xs={6}>
                <div style={{padding:30,display:'flex',justifyContent:"center",alignItems:"center"}}>
             <img src={`${ServerURL}/images/${item.img1}`}  Width="300" height="300" /> 
            </div>
            
         
</Grid>
<Grid item xs={6}style={{flexDirection:"row"}}>
        {detail()}
            </Grid>
        </Grid>
      
    <Grid>
     
    </Grid>
        
       
 <Footer/>
 </>
    )
}