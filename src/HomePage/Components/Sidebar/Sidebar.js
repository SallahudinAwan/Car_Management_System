import React from 'react'
import { Button } from 'react-bootstrap'
import './Sidebar.css'

import swal from "sweetalert";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {actionCreators} from '../../../state/index'

import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const SideBtn =useSelector(state => state.Sidebar);
    const dispatch=useDispatch();
    const {ChangeComponent}= bindActionCreators (actionCreators,dispatch);
    const Logout=()=>{
      swal({
        title: "Are you sure to Logout?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willLogOut) => {
        if (willLogOut) {
          localStorage.setItem("token",0);
          navigate("/");
        }})
    }
  return (
    <div class="sidebar">
        <img className='SideImg' src="https://managevehicle.com/wp-content/uploads/2018/12/logo-with-name-png.png" width={100} height={50}/>
  <Link to={"/home/RegisterUser"} onClick={()=>{ChangeComponent(0)}}  className="SideBtn" style={{backgroundColor:SideBtn.name==0? "#1b3e6e":""}}>Users</Link>
  <Link to={"/home/CarsInformation"} onClick={()=>{ChangeComponent(1)}} className="SideBtn" style={{backgroundColor:SideBtn.name==1 || SideBtn.name==6 ? "#1b3e6e":""}}>Cars</Link>
  <Link to={"/home/Registration"} className="SideBtn" onClick={()=>{ChangeComponent(2)}} style={{backgroundColor:SideBtn.name==2? "#1b3e6e":""}}>Registration</Link>
  <Link to={"/home/BrandTable"} className="SideBtn" onClick={()=>{ChangeComponent(3)}} style={{backgroundColor:SideBtn.name==3 || SideBtn.name==7? "#1b3e6e":""}}>Brand</Link>
  <Link to={"/home/VariantTable"} className="SideBtn" onClick={()=>{ChangeComponent(4)}} style={{backgroundColor:SideBtn.name==4 || SideBtn.name==8? "#1b3e6e":""}}>Varient</Link>
  <Link onClick={()=>{Logout();}} className="SideBtn" style={{backgroundColor:SideBtn.name==5? "#1b3e6e":""}}>Logout</Link>
</div>

)
}

export default Sidebar