import React from 'react'

import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

import { Button } from 'react-bootstrap';

const CarsModa = (props) => {
    const UpdateOrAddCar = () => {
        if(!props.CarEdit.NewName && !props.CarsBrandObj.ID && !props.CarsVarientObj.ID){
            swal("Varient Name and Brand Empty", "", "error");
        }
        else if(!props.CarEdit.NewName){
            swal("Please Add Car Name", "", "error");
        }
        else if(!props.CarsBrandObj.ID){
            swal("Select Brand", "", "error");
        }
        else if(!props.CarsVarientObj.ID){
            swal("Select Variant", "", "error");
        }
        else{

        axios
          .post((props.type==="Add"? "http://localhost:9002/Admin/AddCar":"http://localhost:9002/Admin/EditCar"),{
          CarID:props.CarEdit.CarID,  
          CarName:props.CarEdit.NewName,
            VariantID:props.CarsVarientObj.ID
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
                swal("Car Name Already Exist", "", "error");
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
          <Modal.Title>{props.type==="Add"? "Add Car":"Car Editing"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{width:"100%"}}>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width:"100%",backgroundColor:"white",color:"#112f59",textAlign:"left"}}>
        {props.CarsBrandObj.Name ?  props.CarsBrandObj.Name:"Car Brand"}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{width:"100%",overflowY:"scroll",maxHeight:"100px",textAlign:"left"}}>
      {
      props.AllCarBrands.map((car)=>{
       return(
        <Dropdown.Item style={{color:"black"}} className="dropItem" onClick={()=>{props.handleBrandNameChange(car.Name,car.ID)}}>{car.Name}</Dropdown.Item>
        )
      })
      }
      </Dropdown.Menu>
    </Dropdown>


      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail" style={{width:"100%"}}>
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width:"100%",backgroundColor:"white",color:"#112f59",textAlign:"left"}}>
      {props.CarsVarientObj.Name ?  props.CarsVarientObj.Name:"Car Varient"}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{width:"100%",overflowY:"scroll",maxHeight:"100px",textAlign:"left"}}>
      {
      props.CarAllVarient.map((car)=>{
       return(
        <Dropdown.Item style={{color:"black"}} className="dropItem" name={car.ID} onClick={()=>{props.handleVarientNameChange(car.Name,car.ID)}}>{car.Name}</Dropdown.Item>
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
            <Form.Label>Car Name</Form.Label>
              <Form.Control type="text"
              autoFocus
                value={props.CarEdit.NewName} 
                placeholder={"Car Name"}
                onChange={(event)=>{
                  const {value}=event.target;
                  props.setCarEdit({
                    ...props.CarEdit,
                    NewName:value
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
          <Button variant="primary" onClick={UpdateOrAddCar}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CarsModa