import React, {useState, useEffect } from "react";
import { userdetails } from "../api/UserDetails";
import { createbank } from "../api/CreateBank";
import { useNavigate } from "react-router-dom";
import "../App.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';

export default function CreateBank() {
  let navigate = useNavigate();
  const [bank, setBank] = useState("");
  const [email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    userdetails().then((data) => {
      setUserData(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let user_combined = {
      fname:FirstName,
      lname:LastName,
      email:email
    }
    createbank(bank,user_combined).then((data)=>{
      console.log("The data from backend --> ", data);
      if(data.status === 'ok'){
        alert("Bank created successfully")
        return navigate('/superuser')
      }
      else alert("An error occured")
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <MDBContainer className="bank-signup mx-auto gradient-form">

        <MDBRow>

          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">

              <div className="text-center mt-5">
                <img src="https://koanpay.com/assets/images/konpay-removebg-preview.png"
                  style={{width: '185px'}} alt="logo" />
                <h4 className="mt-5 mb-4">We are The Koanpay Team</h4>
              </div>

              <p className='text-center'>Hello, {userData?.fname} <br></br>Please add the bank details</p>

              <MDBInput wrapperClass='mb-4' label='Bank Name' id='field1' type='text' onChange={(e) => setBank(e.target.value)}
                required={true}/>
              <MDBInput wrapperClass='mb-4' label='Admin First Name' id='field2' type='text' onChange={(e) => setFirstName(e.target.value)}
                required={true}/>
              <MDBInput wrapperClass='mb-4' label='Admin Last Name' id='field3' type='text' onChange={(e) => setLastName(e.target.value)}
                required={true}/>
              <MDBInput wrapperClass='mb-4' label='Email Address' id='field4' type='email' onChange={(e) => setEmail(e.target.value)}
                required={true}/>


              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2">Create Bank</MDBBtn>
                {/* <a className="text-muted" href="#!">Forgot password?</a> */}
              </div>

              {/* <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Don't have an account?</p>
                <MDBBtn outline className='mx-2' color='danger'>
                  Sign Up
                </MDBBtn>
              </div> */}

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
      </form>
    </div>
  );
}
