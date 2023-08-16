import React from 'react'
import Content from './Components/Content/Content'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import './Home.css'
const Home = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Content/>
    </div>
  )
}

export default Home