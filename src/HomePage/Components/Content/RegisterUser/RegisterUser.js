import axios from 'axios';
import React, { useEffect,useState } from 'react'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {actionCreators} from '../../../../state/index'

import { Button } from 'react-bootstrap';
import { Pen, Plus, Trash } from 'react-bootstrap-icons';
import swal from 'sweetalert';


const RegisterUser = () => {

  var validator = require("email-validator");
  const [show, setShow] = useState(false);
  const [showID, setShowID] = useState(0);

  const [error,setError]=useState(false);
  const Cars =useSelector(state => state.CarsData);
  const FormInformation =useSelector(state => state.FormData);
  const dispatch=useDispatch();
  const {ChangeComponent,LoadRegisterData,LoadCarsData,ChangeRID,ChangeFirstname,ChangeLastname,ChangeEmail,ChangePhone,ChangeCarName}= bindActionCreators (actionCreators,dispatch);
  const RegistrationData =useSelector(state => state.RegistrationData);
  
  const getCarDatafromServer = () => {
    axios
      .post("http://localhost:9002/Admin/getAllcarsData")
      .then((res) => {
        LoadCarsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  const handleClose = () => {
    setShow(false)
  };
  const handleShow = (RID,CarName,firstname,lastname,email,phone) => {
    ChangeCarName(CarName);
    ChangeFirstname(firstname);
    ChangeLastname(lastname);
    ChangeEmail(email);
    ChangePhone(phone);
    ChangeRID(RID);
    setShow(true);
  }
    const getDatafromServer = () => {
        axios
          .post("http://localhost:9002/Admin/getAllRegistrationData")
          .then((res) => {
            console.log(res.data)
            LoadRegisterData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      const deleteFromRegister=(id)=>{
        var RegisterD = RegistrationData.RegisterData;
        RegisterD = RegisterD.filter(Register => Register.ID != id);
        LoadRegisterData(RegisterD);
      };

      const RemoveRegisteration = (id) => {
        swal({
          title: "Are you sure to delete?",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            axios
            .post("http://localhost:9002/Admin/DeleteRegistration",{
            RID:id
          })
          .then((res) => {
            if (res.data.code === 200) {
              deleteFromRegister(id);
              setShowID(1);
              swal("Deleted Succcessfully", "", "success");
            }else {
                swal("Server Error", "", "error");
            } 
          })
          .catch((err) => {
            console.log(err);
          });
          }
        });
      };
      
      const EditRegistration = () => {
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
          .post("http://localhost:9002/Admin/EditRegistration", {
            CarID:FormInformation.RID,
            CarName: FormInformation.CarName,
            firstname:FormInformation.firstname,
            lastname:FormInformation.lastname,
            email:FormInformation.email,
            phone:FormInformation.phone
          })
          .then((res) => {
            if (res.data.code === 200) {
              ChangeFirstname("");
              ChangeCarName("");
              ChangeEmail("");
              ChangeLastname("");
              ChangePhone("");
              getDatafromServer();
              setShow(false);
              swal("Edited Succcessfully", "", "success");
            }else {
                swal("Some Error in Editing!!! Try Again", "", "error");
            } 
          })
          .catch((err) => {
            console.log(err);
          });
        }
      };
    
      useEffect(() => {
        ChangeComponent(0);
        getCarDatafromServer();
        getDatafromServer();
      }, []);
    
  return (
    <div>
     
<Table size="sm" className='TableClass'>
      <thead>
        <tr className='headertable' style={{backgroundColor:"silver",color:"blue"}}>
          <th style={{padding:"20px",color:"#112f59",borderTopLeftRadius:"20px"}}>Car Brand</th>
          <th style={{padding:"20px",color:"#112f59"}}>Car Variant</th>
          <th style={{padding:"20px",color:"#112f59"}}>Car Name</th>
          <th style={{padding:"20px",color:"#112f59"}}>User Name</th>
          <th style={{padding:"20px",color:"#112f59"}}>Phone Number</th>
          <th style={{padding:"20px",color:"#112f59"}}>Email</th>
          <th style={{padding:"20px",color:"#112f59",borderTopRightRadius:"20px"}}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            (RegistrationData.RegisterData).map((User)=>{
                return (
                <tr>
                <td style={{padding:"20px"}}>{User.Brand}</td>
                <td style={{padding:"20px"}}>{User.Variant}</td>
                <td style={{padding:"20px"}}>{User.CarName}</td>
                <td style={{padding:"20px"}}>{User.firstname} {User.lastname}</td>
                <td style={{padding:"20px"}}>{User.phone}</td>
                <td style={{padding:"20px"}}>{User.email}</td>
                <td style={{padding:"20px"}}>
                    <Trash color='white' style={{cursor:'pointer',marginRight:"10px"}} onClick={()=>{RemoveRegisteration(User.RID)}}/>
                    <Pen color='white' style={{cursor:'pointer'}} onClick={()=>{handleShow(User.RID,User.CarName,User.firstname,User.lastname,User.email,User.phone)}}/>
                </td>
              </tr>
                )
            })
        }
      </tbody>
    </Table>


    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Editing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <div style={{marginTop:"30px"}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail" style={{width:"100%"}}>
      <Form.Label>Car Name</Form.Label>
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width:"100%",borderColor:error && !FormInformation.CarName ? "red":"#ced4da",borderWidth:error && !FormInformation.CarName ? "2px":"",backgroundColor:"white",color:"#112f59",textAlign:"left"}}>
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
        <Form.Label>First Name</Form.Label>
        <Form.Control type="Text" autoFocus placeholder="First Name" value={FormInformation.firstname} onChange={handleFirstnameChange} style={{borderColor:error && !FormInformation.firstname ? "red":"",borderWidth:error && !FormInformation.firstname ? "2px":""}}/>
      </Form.Group>
      </div>

      <div style={{display:"flex",justifyContent:"space-between"}}>
      <Form.Group className="mb-3" controlId="formBasicPassword" style={{width:"100%"}}>
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="Text" placeholder="Last Name" value={FormInformation.lastname} onChange={handleLastnameChange} style={{borderColor:error && !FormInformation.lastname ? "red":"",borderWidth:error && !FormInformation.lastname ? "2px":""}}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" style={{width:"100%",marginLeft:"40px"}}>
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="Text" placeholder="Email Address" value={FormInformation.email} onChange={handleEmailChange} style={{borderColor:error && !FormInformation.email ? "red":"",borderWidth:error && !FormInformation.email ? "2px":""}}/>
      </Form.Group>
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <Form.Group className="mb-3" controlId="formBasicPassword" style={{width:"48%"}}>
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" placeholder="Phone Number" value={FormInformation.phone} onChange={handlePhoneChange} style={{borderColor:error && !FormInformation.phone ? "red":"",borderWidth:error && !FormInformation.phone ? "2px":""}}/>
      </Form.Group>
      </div>    
    </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose} >
            Close
          </Button>
          <Button variant="primary" onClick={EditRegistration} style={{backgroundColor:"#1b3e6e",borderWidth:"0px",margin:"10px"}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default RegisterUser