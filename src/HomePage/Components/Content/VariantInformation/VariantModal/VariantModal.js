import React from 'react'

import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

import { Button } from 'react-bootstrap';

const VariantModal = (props) => {
    const UpdateOrAddVariant = () => {
        if(!props.Variant.VariantName && ! props.CarsBrandObj.ID ){
            swal("Varient Name and Brand Empty", "", "error");
        }
        else if(!props.Variant.VariantName){
            swal("Please Add Varient Name", "", "error");
        }
        else if(!props.CarsBrandObj.ID){
            swal("Select Brand", "", "error");
        }
        else{
        axios
          .post((props.type==="Add"? "http://localhost:9002/Admin/AddVarient":"http://localhost:9002/Admin/EditVariant"),{
            VariantID:props.Variant.ID,
            VariantName:props.Variant.VariantName,
            BrandID:props.CarsBrandObj.ID
          })
          .then((res) => {
            if (res.data.code === 200) {
              swal("Saved Succcessfully", "", "success").then((willLogin) => {
                if (willLogin) {
                  props.getDatafromServer();
                  props.handleClose();
                }
              });
            }else if (res.data.code === 300){
                swal("Variant Already Exist", "", "error");
            }
            else {
                swal("Server Error", "", "error");
            } 
           
          })
          .catch((err) => {
            console.log(err);
          });
        }
      };
  return (
    <div>
         <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.type==="Add"? "Add New Variant":"Brand Variant"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{width:"100%"}}>
        <Form.Label>Car Brand</Form.Label>
        
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width:"100%",backgroundColor:"white",color:"#112f59",textAlign:"left"}}>
        {props.CarsBrandObj.Name ? props.CarsBrandObj.Name:"Car Brand"}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{width:"100%",overflowY:"scroll",maxHeight:"100px",textAlign:"left"}}>
      {
      props.CarBrands.map((car)=>{
       return(
        <Dropdown.Item style={{color:"black"}} className="dropItem" name={car.ID} onClick={()=>{props.handlerBrandNameChange(car.ID,car.Name)}}>{car.Name}</Dropdown.Item>
        )
      })
      }
      </Dropdown.Menu>
    </Dropdown>
    
    </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
            <Form.Label>Variant Name</Form.Label>
              <Form.Control type="text"
                autoFocus
                value={props.Variant.VariantName} 
                placeholder={"Variant Name"}
                onChange={(event)=>{
                  const {value}=event.target;
                  props.setVariant({
                    ...props.Variant,
                    VariantName:value
                  })
                }}
                />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={UpdateOrAddVariant} style={{backgroundColor:"#1b3e6e",borderWidth:"0px",margin:"10px"}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default VariantModal