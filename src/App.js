import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./LoginPages/Login";
import Home from "./HomePage/Home";

import RegisterUser from './HomePage/Components/Content/RegisterUser/RegisterUser'
import CarsInformation from "./HomePage/Components/Content/CarsInformation/CarTable/CarsInformation";
import Registration from "./HomePage/Components/Content/Registration/Registration";
import BrandTable from "./HomePage/Components/Content/BrandInformation/BrandTable/BrandTable";
import VariantTable from "./HomePage/Components/Content/VariantInformation/VariantTable/VariantTable";
import axios from "axios";

const App = () => {  
  const [redirect,setRedirect]= useState(false)//this State will check that User Login or just try to access Home Page
  useEffect(()=>{
    console.log(localStorage.getItem("token"))
    axios
    .post("http://localhost:9002/Admin/isUserAuth", { hello: 'world' }, {
      headers: {
        'content-type': 'text/json',
        "x-access-token":localStorage.getItem("token")
      }
    })
    .then((res) => {
      if(res.data.code===200){
      setRedirect(true);
      }else{
        setRedirect(false);    
      }
    })

  },[])
  return (
    <>
    <Routes>
      <Route path="/" element={<Login redirection={setRedirect}/>} />
      <Route path="/home" element={redirect? <Home />:<Login redirection={setRedirect}/>} >
        <Route path="RegisterUser" element={<RegisterUser/>} />
        <Route path="CarsInformation" element={<CarsInformation/>} />
        <Route path="Registration" element={<Registration/>} />
        <Route path="BrandTable" element={<BrandTable/>} />
        <Route path="VariantTable" element={<VariantTable/>} />
      </Route> 
      
      </Routes>
      </>
  );
};

export default App;
