import React, { useEffect,useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {actionCreators} from '../../../../../state/index'

import { Button } from 'react-bootstrap';
import { Pen, Plus, Trash } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import BrandMode from '../BrandModel/BrandMode';

const BrandTable = () => {
  const [show, setShow] = useState(false);
  const [showID, setShowID] = useState(0);
  const [ComponentName, setComponentName] = useState("");
  
  const [Brand, setBrand] = useState({ID:"",BrandName:""});

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = (id,Name) => {
    setBrand({ID:id,BrandName:Name});
    setShow(true);
  }
    const BrandData =useSelector(state => state.BrandData);
    const dispatch=useDispatch();
    const {LoadBrandsData,ChangeComponent}= bindActionCreators (actionCreators,dispatch);

    const getDatafromServer = () => {
        axios
          .post("http://localhost:9002/Admin/getAllbrand")
          .then((res) => {
            console.log(res.data)
            LoadBrandsData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };

     const deleteFromBrand=(id)=>{
        var BrandD = BrandData.Brand;
        BrandD = BrandD.filter(Brand => Brand.ID != id);
        LoadBrandsData(BrandD);
        setShowID(1);
      };

     
      const RemoveBrand = (id) => {
        swal({
          title: "Are you sure to delete?",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
             console.log(id)
            axios
            .post("http://localhost:9002/Admin/DeleteBrand",{
            BrandID:id
          })
          .then((res) => {
            if (res.data.code === 200) {
              deleteFromBrand(id);
              setBrand({ID:"",BrandName:""});
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
      useEffect(() => {
        ChangeComponent(3);
        getDatafromServer();
      }, []);

    

  return (
    <div>
      <div style={{display:"flex",justifyContent:"right"}}>
        <Button onClick={()=>{ChangeComponent(7);setComponentName("Add");handleShow(0,"")}} style={{backgroundColor:"#1b3e6e",borderWidth:"0px",margin:"10px"}}><Plus color="white"></Plus>Add</Button>
      </div>
<Table size="sm" className='TableClass'>
      <thead>
        <tr className='headertable' style={{backgroundColor:"silver",color:"blue"}}>
          <th style={{padding:"20px",color:"#112f59",borderTopLeftRadius:"20px"}}>Brand ID</th>
          <th style={{padding:"20px",color:"#112f59"}}>Brand Name</th>
          <th style={{padding:"20px",color:"#112f59",borderTopRightRadius:"20px"}}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            (BrandData.Brand).map((brand,index)=>{
                return (
                <tr>
                <td style={{padding:"20px"}}>{index+1}</td>
                <td style={{padding:"20px"}}>{brand.Name}</td>
                <td style={{padding:"20px"}}>
                    <Trash color='white' style={{cursor:'pointer',marginRight:"10px"}} onClick={()=>{RemoveBrand(brand.ID)}}/>
                    <Pen color='white' style={{cursor:'pointer'}} onClick={()=>{handleShow(brand.ID,brand.Name);setComponentName("Edit")}}/>
                </td>
              </tr>
                )
            })
        }
      </tbody>


    </Table>

   <BrandMode show={show} handleClose={handleClose} Brand={Brand} getDatafromServer={getDatafromServer} setBrand={setBrand} type={ComponentName}/>

    </div>
  )
}

export default BrandTable