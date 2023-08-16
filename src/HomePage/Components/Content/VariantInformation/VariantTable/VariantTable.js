import React, { useEffect,useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {actionCreators} from '../../../../../state/index'

import { Button } from 'react-bootstrap';
import { Pen, Plus, Trash } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import VariantModal from '../VariantModal/VariantModal';

const VariantTable = () => {

  const [show, setShow] = useState(false);
  const [showID, setShowID] = useState(0);

  const [ComponentName, setComponentName] = useState("");
  const [CarBrands,setCarBrands]=useState([]);
  const [CarsBrandObj,setCarBrandObj]=useState({ID:"",Name:""});

  const [Variant, setVariant] = useState({ID:"",BrandName:"",BrandID:"",VariantName:""});

  const getDataBrandServer = () => {
    axios
      .post("http://localhost:9002/Admin/getAllbrand")
      .then((res) => {
        setCarBrands(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = () => {
    setShow(false)
  };

  const handlerBrandNameChange = (id,name) => {
    const NewObj={ID:id,Name:name};
    setCarBrandObj(NewObj);
  };
  
  const handleShow = (id,Bid,BName,VName) => {
    setShow(true);
    setVariant({ID:id,BrandName:BName,BrandID:Bid,VariantName:VName});
    handlerBrandNameChange(Bid,BName);
  }
    const VariantData =useSelector(state => state.VariantData);
    const dispatch=useDispatch();
    const {LoadVariantsData,ChangeComponent}= bindActionCreators (actionCreators,dispatch);

    const getDatafromServer = () => {
        axios
          .post("http://localhost:9002/Admin/getAllTablevarient")
          .then((res) => {
            LoadVariantsData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      
    
      useEffect(() => {
        ChangeComponent(4);
        getDatafromServer();
        getDataBrandServer();
      }, []);

      const deleteFromVariant=(id)=>{
        var VariantD = VariantData.Variant;
        VariantD = VariantD.filter(Variant => Variant.ID != id);
        LoadVariantsData(VariantD);
        setShowID(1);
      };

      const RemoveVariant = (id) => {
        swal({
          title: "Are you sure to delete?",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            axios
            .post("http://localhost:9002/Admin/DeleteVariant",{
              VariantID:id
          })
          .then((res) => {
            if (res.data.code === 200) {
              deleteFromVariant(id);
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
        <Button onClick={()=>{ChangeComponent(8);handleShow(0,0,"","");setComponentName("Add");}} style={{backgroundColor:"#1b3e6e",borderWidth:"0px",margin:"10px"}}><Plus color="white"></Plus>Add</Button>
      </div>
<Table size="sm" className='TableClass'>
      <thead>
        <tr className='headertable' style={{backgroundColor:"silver",color:"blue"}}>
          <th style={{padding:"20px",color:"#112f59",borderTopLeftRadius:"20px"}}>Sr</th>
          <th style={{padding:"20px",color:"#112f59"}}>Brand</th>
          <th style={{padding:"20px",color:"#112f59"}}>Variant</th>
          <th style={{padding:"20px",color:"#112f59",borderTopRightRadius:"20px"}}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            (VariantData.Variant).map((variant,index)=>{
                return (
                <tr>
                <td style={{padding:"20px"}}>{index+1}</td>  
                <td style={{padding:"20px"}}>{variant.Brand}</td>
                <td style={{padding:"20px"}}>{variant.Variant}</td>
                <td style={{padding:"20px"}}>
                    <Trash color='white' style={{cursor:'pointer',marginRight:"10px"}} onClick={()=>{RemoveVariant(variant.ID)}}/>
                    <Pen color='white' style={{cursor:'pointer'}} onClick={()=>{handleShow(variant.ID,variant.BrandID,variant.Brand,variant.Variant);setComponentName("Edit");}}/>
                </td>
              </tr>
                )
            })
        }
      </tbody>
    </Table>



   <VariantModal show={show} handleClose={handleClose} Variant={Variant} getDatafromServer={getDatafromServer} CarBrands={CarBrands} handlerBrandNameChange={handlerBrandNameChange} CarsBrandObj={CarsBrandObj} setVariant={setVariant} type={ComponentName}/>

    </div>
  )
}

export default VariantTable