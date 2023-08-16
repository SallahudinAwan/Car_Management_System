import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';


const NewNavbar = () => {
  
  const navigate = useNavigate();

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
        navigate("/")
      }})
  }

  return (
    <Navbar style={{backgroundColor:"#112f59",color:"white",height:"60px"}} expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          />
           
          <Form style={{marginRight:"80px"}}>
          <NavDropdown title="Admin" id="collasible-nav-dropdown" style={{padding:"0px",margin:"0px"}}>
              <NavDropdown.Item  onClick={()=>{Logout();}}>Logout</NavDropdown.Item>
                </NavDropdown>
          </Form>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NewNavbar