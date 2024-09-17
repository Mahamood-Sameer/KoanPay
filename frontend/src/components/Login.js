import React, { useState } from "react";
import { login } from "../api/Login";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";
import "../App.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';

export default function Login() {
  let navigate = useNavigate();
  const contextuser = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    login(email, password).then((data) => {
      console.log(data, "userRegister");
      if (data.status === "ok") {
        alert("Login successful");
        window.localStorage.setItem("token", data.data);
        window.localStorage.setItem("loggedIn", true);
        console.log("The user details are : ", data.userDetails);
        contextuser[1](data.userDetails);
        if (data.userDetails.userType === 'user') {
          return navigate('/user')
        }
        else if (data.userDetails.userType === 'admin') {
          return navigate('/admin')
        }
        else if (data.userDetails.userType === 'superuser') {
          return navigate('/superuser');
        }
      }
    });
  }

  return (
    <div className="form-container">
      <form className="login-form container-new"
        onSubmit={(e) => {
          handleSubmit(e);
        }}>
        <div className="text-center mt-5">
          <img src="https://koanpay.com/assets/images/konpay-removebg-preview.png"
            style={{ width: '185px' }} alt="logo" />
          <h4 className="mt-4 mb-5 pb-1">We are The Koanpay Team</h4>
        </div>

        <p className='text-center'>Please login to your account</p>


        <MDBInput wrapperClass='mb-4' label='Email address' id='field1' type='email' onChange={(e) => setEmail(e.target.value)} />
        <MDBInput wrapperClass='mb-4' label='Password' id='field2' type='password' onChange={(e) => setPassword(e.target.value)} />


        <div className="text-center pt-1 mb-5 pb-1">
          <MDBBtn className="mb-4 w-100 btn-login">Login</MDBBtn>
          <a className="text-muted" href="#!">Forgot password?</a>
        </div>
      </form>

      {/* <div className="brief-koanpay container">
        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4"> 
       <div className="text-white px-3 py-4 p-md-5 mx-md-4">
            <h4 class="mb-4">We are more than just a company</h4>
            <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div> 
       </div>  
      </div> */}

      {/* <form 
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <MDBContainer className="superuser-login gradient-form">
      <MDBRow className="rows">
        <MDBCol col='6' className="mb-5">
        <div className="login-form">
          <div className="d-flex flex-column ms-5">

            <div className="text-center mt-5">
              <img src="https://koanpay.com/assets/images/konpay-removebg-preview.png"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-4 mb-5 pb-1">We are The Koanpay Team</h4>
            </div>

            <p className='text-center'>Please login to your account</p>


            <MDBInput wrapperClass='mb-4' label='Email address' id='field1' type='email' onChange={(e) => setEmail(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='field2' type='password' onChange={(e) => setPassword(e.target.value)}/>


            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2">Login</MDBBtn>
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>
          </div>
          </div>
        </MDBCol>
      

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">We are more than just a company</h4>
              <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
      </MDBContainer>
    </form> */}
    </div>
  );
}
