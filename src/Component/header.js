import React,{useState,useEffect} from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import {ServerURL, postDataAndImage,getData,postData} from "./FetchNodeServices";
//////////////////////////////////////////////

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow:1,
   
    top:0,
    left:0,
    right:0,
    zIndex:999,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
     
      position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: "whitesmoke",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '450px',
      backgroundColor:"whitesmoke"
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
     
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  //////////////Second App bar design///////////////////////////////////////////////////////////////
  root: {
    flexGrow: 2,
    marginTop:57,
    right:0
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
    display:"flex",
    alignItems:"left",
    justifyContent:"left",
    flexDirection:"row",
    flexWrap:"wrap"

  
    
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  //////////////////////////////////////////////////////////////////////
  const[category,setCategory] = useState([])
  const[Subcategory,setsubCategory] = useState([])
  const [anchorMEl, setAnchorMEl] = React.useState(null);
  const[search ,setSearch] = useState("")
///////////////////////////////////////////////////////////////////////
const FetchAllCategory=async()=>{
  var result = await getData("categories/displayall")
 
   setCategory(result)
  
  }
  useEffect(function(){
      FetchAllCategory()
      
  },[])
  //////////////////////////////////////////////////////////////////////////////////////////////////
  

  const handleClose = () => {
    setAnchorMEl(null);
  };

/////////////////////////////////////////////////////////////////////////////////////////////////////
const FetchSubCategory=async(cid)=>{
  var body ={categoryid:cid}
  var result = await postData("subcategory/displaysubcategoryintocategory",body)
 console.log("e",result)
   setsubCategory(result)
  
  }
  const handleSubcategory=async(event)=>{
   //alert(event.currentTarget.value)
   
    setAnchorMEl(event.currentTarget);
    FetchSubCategory(event.currentTarget.value)

  }

  const SubCategory=()=>{
    return Subcategory.map((item)=>{ 
        return(<>
        <h4>{item.subcategoryname}</h4>
        </>)
      })
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const MenuCategory=()=>{
  return category.map((item)=>{ 
      return(<>
      <Button   value={item.categoryid} onClick={(event)=>handleSubcategory(event)}  value={item.categoryid} style={{marginRight:"30px"}}><h4>{item.categoryname}</h4></Button>
      </>)
    })
  }
////////////////////////////////////////////////////////////////////////
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
      <>
       <Grid container spacing={1}>
            <Grid item xs={12} > 
    <div className={classes.grow}>
      <AppBar style={{position:"fixed",top:0,left:0,right:0,zIndex:999,backgroundColor:"#fff"}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon  style={{color:"black"}}/>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
          <img  src="./final.png" width="120px"/>
          </Typography>
          <div style={{ width:"900px",maxWidth:"900px" ,display:"flex",alignItems:"center" ,justifyContent:"center"}}>
          <div className={classes.search} > 
            <div className={classes.searchIcon}>
              <SearchIcon  style={{color:"black"}}/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              style={{color:"black"}}
              onChange={(event)=>setSearch(event.target.value)}
            />
          </div>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon   style={{color:"black"}}/>
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon  style={{color:"black"}}/>
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle  style={{color:"black"}}/>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon  style={{color:"black"}} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
    </Grid></Grid>
     <div className={classes.root}>
     <AppBar position="static" style={{backgroundColor:"#81ecec"}}>
       <Toolbar>
         <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
           
         </IconButton>
         <Typography variant="h4" className={classes.title} style={{color:"black"}}>
          {MenuCategory()}
          <Menu
        id="simple-menu"
        anchorEl={anchorMEl}
        keepMounted
        open={Boolean(anchorMEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem onClick={handleClose}>{SubCategory()}</MenuItem>
      
      </Menu>
         </Typography>
       
       </Toolbar>
     </AppBar>
   </div>
  
   </>
  );
}