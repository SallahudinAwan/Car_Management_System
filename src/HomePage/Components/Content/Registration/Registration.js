import React, { useEffect,useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import PhoneInput from 'react-phone-number-input'
import './Registration.css'

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {actionCreators} from '../../../../state/index'
import axios from 'axios';
import swal from 'sweetalert';

const Registration = () => {
  var validator = require("email-validator");
  const Cars =useSelector(state => state.CarsData);
  const FormInformation =useSelector(state => state.FormData);
  const dispatch=useDispatch();
  const {LoadCarsData,ChangeFirstname,ChangeLastname,ChangeEmail,ChangePhone,ChangeCarName,ChangeComponent}= bindActionCreators (actionCreators,dispatch);
  
  const [error,setError]=useState(false);
  const getDatafromServer = () => {
    axios
      .post("http://localhost:9002/Admin/getAllcarsData")
      .then((res) => {
        LoadCarsData(res.data);
        console.log(Cars.CarsData)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ChangeComponent(2);
    ChangeFirstname("");
    ChangeCarName("");
    ChangeEmail("");
    ChangeLastname("");
    ChangePhone("");
    getDatafromServer();
  }, []);
  const handleFirstnameChange = (e) => {
    const { name, value } = e.target;
    if (value.length < 20) {
      ChangeFirstname(value);
    }
  };

  
  const handleLastnameChange = (e) => {
    const { name, value } = e.target;
    if (value.length < 20) {
      ChangeLastname(value);
    }
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    if (value.length < 40) {
      ChangeEmail(value);
    }
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    if (value.length < 12) {
      ChangePhone(value);
    }
  };

  const AddRegistration = () => {
    console.log(FormInformation)
    if(!FormInformation.firstname || !FormInformation.lastname || !FormInformation.email  || !FormInformation.phone || !FormInformation.CarName){
        swal("Fill All the Details", "", "error");
        setError(true);
    }
    else if (!validator.validate(FormInformation.email)) {
      swal("Email Format is Not Correct", "", "error");
      setError(true);
    }
    else if ((FormInformation.phone).length < 11) {
      console.log((FormInformation.phone).length)
      swal("Enter Correct Phone Number", "", "error");
      setError(true);
    }
    else{
    axios
      .post("http://localhost:9002/Admin/Registration", {
        CarName: FormInformation.CarName,
        firstname:FormInformation.firstname,
        lastname:FormInformation.lastname,
        email:FormInformation.email,
        phone:FormInformation.phone
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          ChangeFirstname("");
          ChangeCarName("");
          ChangeEmail("");
          ChangeLastname("");
          ChangePhone("");
          swal("Added Succcessfully", "", "success");
        }else {
            swal("Some Error in Addition!!! Try Again", "", "error");
        } 
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };


  return (
          <Card style={{ width: '100%',backgroundColor:"silver",color:"#112f59",borderRadius:"20px",padding:"20px"}}>
      <Card.Body>
        <Card.Title style={{textAlign:"center",fotnSize:"40px"}}>Registration</Card.Title>
        <div style={{marginTop:"30px"}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail" style={{width:"100%"}}>
      <Form.Label>Car Name{error && !FormInformation.CarName ? "*":""}</Form.Label>
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width:"100%",borderColor:error && !FormInformation.CarName ? "red":"",borderWidth:error && !FormInformation.CarName ? "2px":"",backgroundColor:"white",color:"#112f59",textAlign:"left"}}>
        {FormInformation.CarName?FormInformation.CarName: "Car Name"}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{width:"100%",overflowY:"scroll",maxHeight:"100px",textAlign:"left"}}>
      {
      (Cars.CarsData).map((car)=>{
        return(
         <Dropdown.Item style={{color:"black"}} className="dropItem" onClick={()=>{ChangeCarName(car.CarName)}} >{car.CarName}</Dropdown.Item>
         )
       })
      }
      </Dropdown.Menu>
    </Dropdown>
      </Form.Group>



      <Form.Group className="mb-3" controlId="formBasicPassword"  style={{width:"100%",marginLeft:"40px"}}>
        <Form.Label>First Name{error && !FormInformation.firstname ? "*":""}</Form.Label>
        <Form.Control autoFocus type="Text" placeholder="First Name" value={FormInformation.firstname} onChange={handleFirstnameChange} style={{borderColor:error && !FormInformation.firstname ? "red":"",borderWidth:error && !FormInformation.firstname ? "2px":""}}/>
      </Form.Group>
      </div>

      <div style={{display:"flex",justifyContent:"space-between"}}>
      <Form.Group className="mb-3" controlId="formBasicPassword" style={{width:"100%"}}>
        <Form.Label>Last Name{error && !FormInformation.lastname ? "*":""}</Form.Label>
        <Form.Control type="Text" placeholder="Last Name" value={FormInformation.lastname} onChange={handleLastnameChange} style={{borderColor:error && !FormInformation.lastname ? "red":"",borderWidth:error && !FormInformation.lastname ? "2px":""}}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" style={{width:"100%",marginLeft:"40px"}}>
        <Form.Label>Email Address{error && !FormInformation.email ? "*":""}</Form.Label>
        <Form.Control type="Text" placeholder="Email Address" value={FormInformation.email} onChange={handleEmailChange} style={{borderColor:error && !FormInformation.email ? "red":"",borderWidth:error && !FormInformation.email ? "2px":""}}/>
      </Form.Group>
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <Form.Group className="mb-3" controlId="formBasicPassword" style={{width:"48%"}}>
        <Form.Label>Phone Number{error && !FormInformation.phone ? "*":""}</Form.Label>
        <Form.Control type="number" placeholder="Phone Number" value={FormInformation.phone} onChange={handlePhoneChange} style={{borderColor:error && !FormInformation.phone ? "red":"",borderWidth:error && !FormInformation.phone ? "2px":""}}/>
      </Form.Group>
      </div>    
      <div style={{display:"flex",justifyContent:"right"}}>
      <Button variant="primary" type="submit" onClick={AddRegistration} style={{backgroundColor:"#112f59",width:"20%"}}>
        Register
      </Button>
      </div>
    </div>
      </Card.Body>
    </Card>
  )
}

export default Registration