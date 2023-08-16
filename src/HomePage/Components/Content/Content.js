import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

const Content = () => {
    return (
    <div style={{marginLeft:"15%",marginTop:"10px",padding:"20px",overflowY:"scroll",height:"500px"}}>
       <Outlet/>
    </div>
  )
}

export default Content