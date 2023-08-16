import React, { useEffect, useState } from "react";
import "./Login.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {actionCreators} from '../state/index'
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  const Login =useSelector(state => state.login);
  const dispatch=useDispatch();
  const {ChangeUsername,ChangePassword,LoginSuccess}= bindActionCreators (actionCreators,dispatch);
 
  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    if (value.length < 20) {
      ChangeUsername(value);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (value.length < 20) {
      ChangePassword(value);
    }
  };

  const loginNow = () => {
    const { username, password } = Login;
    console.log(Login)
    if (!username && !password) {
      swal("Empty Fields", "Kindly Enter the Username and Password Both", "error");
    } else if (!username) {
      swal("Empty Field", "Kindly Enter the Username", "error");
    } else if (!password) {
      swal("Empty Field", "Kindly Enter the Password", "error");
    }  else {
        axios
          .post("http://localhost:9002/Admin/login", {
            username: username,
            password: password,
          })
          .then((res) => {
            console.log(res.data)
            if (res.data.code === 200) {
              //swal("Login Succcessfully", "", "success");
                  localStorage.setItem("token",res.data.token)
                  LoginSuccess(true);
                  props.redirection(true); 
                  ChangeUsername("");
                  ChangePassword("");
                 navigate("/home/RegisterUser");
            }else if (res.data.code === 100) {
                swal("Password Not Correct", "", "error");
            } 
            else{
                swal("User not exist", "", "error");
            } 
          })
          .catch((err) => {
            console.log(err);
          });
      }
  };
  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        loginNow();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [Login]);

 

  return (
    <div class="Bodylogin">
        <Card style={{ width: '28rem',backgroundColor:"silver",color:"#112f59",borderRadius:"20px",padding:"20px",position:"absolute",margin:"20px" }}>
      <Card.Body>
      <Card.Img variant="top" src="https://managevehicle.com/wp-content/uploads/2018/12/logo-with-name-png.png" />
        <div  style={{marginTop:"30px"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" autoFocus placeholder="Enter Username" value={Login.username} onChange={handleUsernameChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={Login.password} onChange={handlePasswordChange}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={loginNow} style={{backgroundColor:"#112f59",width:"100%"}}>
        Login
      </Button>
    </div>
      </Card.Body>
    </Card>
      </div>
  );
};

export default Login;
