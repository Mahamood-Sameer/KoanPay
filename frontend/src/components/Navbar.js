import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { UserContext } from "../App";
//import { useContext } from "react";
import "../App.css";
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  //MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
  MDBContainer,
}
from 'mdb-react-ui-kit';

export default function Navbar() {
    const [showNavSecond, setShowNavSecond] = useState(false);

    return (

      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          {/* <a href=""> */}
            <img src="https://koanpay.com/assets/images/konpay-removebg-preview.png"
              style={{width: '185px'}} alt="logo" className="img-padding"/>
          {/* </a> */}
          <MDBNavbarToggler
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavSecond(!showNavSecond)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavSecond}>
            <MDBNavbarNav>
              <MDBNavbarLink active aria-current='page' href='#'>
                Home
              </MDBNavbarLink>
              <MDBNavbarLink href='#'>Features</MDBNavbarLink>
              <MDBNavbarLink href='#'>Pricing</MDBNavbarLink>
              <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
                Disabled
              </MDBNavbarLink>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
 
    );
}