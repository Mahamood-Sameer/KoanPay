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
  MDBFooter,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';

export default function Footer() {

    return (

      <MDBFooter bgColor='dark' className='text-white text-center text-lg-left footer_custom'>
        <MDBContainer className='p-4'>
          <MDBRow>
            <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Footer Content</h5>

              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
                Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est
                atque cumque eum delectus sint!
              </p>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase mb-0'>Links</h5>

              <ul className='list-unstyled'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a className='text-white' href='https://www.koanpay.com/'>
            KoanPay.com
          </a>
        </div>
      </MDBFooter>
 
    );
}