import React, { useState, useEffect } from "react";
import { UserContext } from "../App";
import { useContext } from "react";
import { adduser } from "../api/Adduser";
import { useNavigate } from "react-router-dom";
import "../App.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getdetails } from "../api/getbankdetails";

function AdminDashboard() {
  let navigate = useNavigate();
  // const [bankdetails, setBankdetails] = useState(null);
  // useEffect(() => {
  //   getdetails().then((data) => {
  //     console.log(data)
  //     setBankdetails(data);
  //   });
  // }, []);

  // pop up form:
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const contextuser = useContext(UserContext);
  console.log(contextuser);

  const [userfname, setUserfname] = useState("");
  const [userlname, setUserlname] = useState("");
  const [useremail, setUseremail] = useState("");
  const [bankdetails, setBankDetails] = useState(null);
  const AddUser = () => {
    let combineduser = {
      fname: userfname,
      lname: userlname,
      email: useremail,
    };
    adduser(contextuser[0]?.BankName, combineduser).then((data) => {
      console.log("The status is, ", data);
    });
  };
  useEffect(() => {
    getdetails(contextuser[0]?.BankName).then((data) => {
      setBankDetails(data?.details);
      console.log("this is the data", bankdetails);
    });
  }, [contextuser]);
  /*
    api-folder
      ->addparameter.js -> Adding Parameter or Updating the structure 
      ->getbandetails.js -> Can get the bank details to show the structure -> use this in UseEffect
  */
  return (
    <div className="admin_container">
      <div className="admin_subcontainer text-center">
        <h1 className="pt-5">Hello, {contextuser[0]?.fname}</h1>
        <div className="gap-5 mx-auto row-width">
          <MDBCard>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image hover-overlay"
            >
              <MDBCardImage
                className="admin-images"
                src="adduser.png"
                fluid
                alt="..."
              />
              <a>
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </a>
            </MDBRipple>
            <MDBCardBody>
              <MDBBtn
                className="btn-util my-5 col"
                onClick={() => {
                  handleShow();
                }}
              >
                Add user
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>

          <MDBCard>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image hover-overlay"
            >
              <MDBCardImage
                className="admin-images"
                src="str.png"
                fluid
                alt="..."
              />
              <a>
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </a>
            </MDBRipple>
            <MDBCardBody>
              {/* { */}
              {/* bankdetails.parameters.length?( */}
              <MDBBtn
                className="btn-util my-5 col"
                onClick={() => {
                  return navigate("/define_struct");
                }}
              >
                Define Structure
              </MDBBtn>
              {/* ): */}
              {/* <MDBBtn className="btn-util my-5 col" onClick={() => { return navigate('/define_struct') }}>Edit Existing Structure</MDBBtn>
              } */}
            </MDBCardBody>
          </MDBCard>
          {/* 
          <MDBCard>
            <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
              <MDBCardImage className="admin-images" src='str.png' fluid alt='...' />
              <a>
                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
              </a>
            </MDBRipple>
            <MDBCardBody> */}
          {/* <MDBBtn className="btn-util my-5 col" onClick={() => { }}>Edit existing structure</MDBBtn>
            </MDBCardBody>
          </MDBCard> */}

          <MDBCard>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image hover-overlay"
            >
              <MDBCardImage
                className="admin-images"
                src="userlogs.png"
                fluid
                alt="..."
              />
              <a>
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </a>
            </MDBRipple>
            <MDBCardBody>
              <MDBBtn
                className="btn-util my-5 col"
                onClick={() => {
                  return navigate("/admin/user_logs");
                }}
              >
                View user logs
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>

          {/* 
          <MDBBtn className="btn-util my-5 col" onClick={() => { handleShow() }}>Add user</MDBBtn>
          <MDBBtn className="btn-util my-5 col" onClick={() => { return navigate('/define_struct') }}>Define Structure</MDBBtn>
          <MDBBtn className="btn-util my-5 col" onClick={() => { }}>Edit existing structure</MDBBtn>
          <MDBBtn className="btn-util my-5 col" onClick={() => { return navigate('/admin/user_logs') }}>View user logs</MDBBtn> */}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Please enter the details of the user</h4>

              <MDBInput
                wrapperClass="mb-4"
                label="User First Name"
                id="field2"
                type="text"
                onChange={(e) => setUserfname(e.target.value)}
                required={true}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="User Last Name"
                id="field3"
                type="text"
                onChange={(e) => setUserlname(e.target.value)}
                required={true}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email Address"
                id="field4"
                type="email"
                onChange={(e) => setUseremail(e.target.value)}
                required={true}
              />
              <MDBBtn
                className="btn-util my-5 col"
                onClick={() => {
                  AddUser();
                }}
              >
                Add user
              </MDBBtn>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
