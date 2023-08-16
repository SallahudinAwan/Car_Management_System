import axios from 'axios';
import React, { useEffect,useState } from 'react'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import './CarsInfo.css'

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {actionCreators} from '../../../../../state/index'

import { Button } from 'react-bootstrap';
import { Pen, Plus, Trash } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import CarsModa from '../CarsModal/CarsModa';

const CarsInformation = () => {

  const [show, setShow] = useState(false);
  const [showID, setShowID] = useState(0);
  const [ComponentName, setComponentName] = useState("");
  const [CarEdit, setCarEdit] = useState({CarID:"",BrandID:"",Brand:"",Variant:"",NewName:""});
  const [CarsBrandObj,setCarBrandObj]=useState({ID:"",Name:""});
  const [CarsVarientObj,setCarVarientObj]=useState({ID:"",Name:""});
  
  const [AllCarBrands,setAllCarBrands]=useState([]);
  const [CarAllVarient,setCarAllVarient]=useState([]);
    const Cars =useSelector(state => state.CarsData);
    const dispatch=useDispatch();
    const {LoadCarsData,ChangeComponent}= bindActionCreators (actionCreators,dispatch);

    const getBrandsDatafromServer = () => {
      axios
        .post("http://localhost:9002/Admin/getAllbrand")
        .then((res) => {
          setAllCarBrands(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    const getVarientDatafromServer = (id) => {
      axios
        .post("http://localhost:9002/Admin/getAllvarient",{
          BrandID:id
        })
        .then((res) => {
          setCarAllVarient(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const handleBrandNameChange = (name,id) => {
      const NewObj={ID:id,Name:name};
      setCarBrandObj(NewObj);
      getVarientDatafromServer(id);
     };
   
     const handleVarientNameChange = (name,id) => {
      const NewObj={ID:id,Name:name};
      setCarVarientObj(NewObj);
     };

 const handleClose = () => {
    setShow(false)
  };
  const handleShow = (CID,Bid,BName,Vid,VName,CName) => {
    console.log(CID);
    setCarEdit({CarID:CID,BrandID:Bid,Brand:BName,VariantID:Vid,Variant:VName,NewName:CName,Name:CName});
    getBrandsDatafromServer();
    getVarientDatafromServer(Bid);
    handleBrandNameChange(BName,Bid);
    handleVarientNameChange(VName,Vid);
    setShow(true);
  }
    const getDatafromServer = () => {
        axios
          .post("http://localhost:9002/Admin/getAllcarsData")
          .then((res) => {
            LoadCarsData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      useEffect(() => {
        ChangeComponent(1);
        getDatafromServer();
      }, []);

      const deleteFromCar=(id)=>{
        var CarsData = Cars.CarsData;
        CarsData = CarsData.filter(Cars => Cars.CarID != id);
        LoadCarsData(CarsData);
        setShowID(1);
      };
      const RemoveCar = (id) => {
        swal({
          title: "Are you sure to delete?",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            axios
            .post("http://localhost:9002/Admin/DeleteCar",{
              CarID:id
          })
          .then((res) => {
            if (res.data.code === 200) {
              deleteFromCar(id);
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

    
  return (
    <div>
      <div style={{display:"flex",justifyContent:"right"}}>
        <Button onClick={()=>{ChangeComponent(6);setComponentName("Add");handleShow(0,0,0,0,"","")}} style={{backgroundColor:"#1b3e6e",borderWidth:"0px",margin:"10px"}}><Plus color="white"></Plus>Add</Button>
      </div>
<Table size="sm" className='TableClass'>
      <thead>
        <tr className='headertable' style={{backgroundColor:"silver",color:"blue"}}>
          <th style={{padding:"20px",color:"#112f59",borderTopLeftRadius:"20px"}}>Car Brand</th>
          <th style={{padding:"20px",color:"#112f59"}}>Car Name</th>
          <th style={{padding:"20px",color:"#112f59"}}>Car Variant</th>
          <th style={{padding:"20px",color:"#112f59",borderTopRightRadius:"20px"}}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            (Cars.CarsData).map((car)=>{
                return (
                <tr>
                <td style={{padding:"20px"}}>{car.Brand}</td>
                <td style={{padding:"20px"}}>{car.CarName}</td>
                <td style={{padding:"20px"}}>{car.Variant}</td>
                <td style={{padding:"20px"}}>
                    <Trash color='white' style={{cursor:'pointer',marginRight:"10px"}} onClick={()=>{RemoveCar(car.CarID)}}/>
                    <Pen color='white' style={{cursor:'pointer'}} onClick={()=>{;setComponentName("Edit");handleShow(car.CarID,car.BrandID,car.Brand,car.VariantID,car.Variant,car.CarName)}}/>
                </td>
              </tr>
                )
            })
        }
      </tbody>
    </Table>


   <CarsModa show={show} handleClose={handleClose} getDatafromServer={getDatafromServer} type={ComponentName} handleBrandNameChange={handleBrandNameChange} handleVarientNameChange={handleVarientNameChange}  CarAllVarient={CarAllVarient} AllCarBrands={AllCarBrands} CarsVarientObj={CarsVarientObj} CarEdit={CarEdit} CarsBrandObj={CarsBrandObj} setCarEdit={setCarEdit}/>

    </div>
  )
}

export default CarsInformation