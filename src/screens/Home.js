import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Card from  '../components/Card'
import Carousal from '../components/Carousal'

function Home() {
  return (
    
    
    <>
     <div><NavBar/></div>
     <div><Carousal/></div>
    <div> <Card/>
     <Card/>
     <Card/>
     <Card/>
     </div>

    <div> <Footer/></div>
        
    </>
  )
}

export default Home;
