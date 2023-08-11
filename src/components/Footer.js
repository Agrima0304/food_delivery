import React from 'react'
import { alignPropType } from 'react-bootstrap/esm/types'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center text-center" style={{position:"absolute",
  bottom: "0"}}>
      <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
      </Link>
      <span className="text-center" style={{zIndex:"12",bottom: "0",float:"bottom",color:"white"}} >               © 2022 Go Food, Inc</span>
    </div>


  </footer>
    </div>
  )
}
