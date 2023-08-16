import React from 'react'
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import { Button } from 'react-bootstrap';

const BrandMode = (props) => {
    const UpdateOrAddBrand = () => {
        if(props.Brand.BrandName===""){
            swal("Kindly Enter BrandName", "", "error");
        }else{
        axios
          .post( (props.type==="Add"? "http://localhost:9002/Admin/AddBrand": "http://localhost:9002/Admin/EditBrand"),{
            BrandID:props.Brand.ID,
            BrandName:props.Brand.BrandName
          })
          .then((res) => {
            if (res.data.code === 200) {
              swal("Saved Succcessfully", "", "success").then((willLogin) => {
                if (willLogin) {
                  props.getDatafromServer();
                  props.handleClose();
                }
              });
            }else if(res.data.code === 300){
                swal("Brand Name Already Exist", "", "error");
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
          <Modal.Title>{props.type==="Add"? "Add New Brand":"Brand Editing"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Brand Name</Form.Label>
              <Form.Control type="text"
              autoFocus
                value={props.Brand.BrandName} 
                placeholder={"Brand Name"}
                onChange={(event)=>{
                  const {value}=event.target;
                  if(value.length<20){
                  props.setBrand({
                    ...props.Brand,
                    BrandName:value
                  })
                }
                }}
                />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleClose} >
            Close
          </Button>
          <Button variant="primary" onClick={UpdateOrAddBrand} style={{backgroundColor:"#1b3e6e",borderWidth:"0px",margin:"10px"}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default BrandMode