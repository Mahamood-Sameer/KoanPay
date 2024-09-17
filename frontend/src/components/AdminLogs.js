import React, { useEffect, useState } from "react";
import { getdetails } from "../api/getbankdetails";
import { useContext } from "react";
import { UserContext } from "../App";
import { getallbanks } from "../api/getAllbankdetails";
import { useNavigate } from "react-router-dom";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBInputGroup,
  MDBIcon,
} from "mdb-react-ui-kit";
import ReactPaginate from "react-paginate";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";


function Logs() {
  const contextuser = useContext(UserContext);

  // PopUp
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = (bank, index, bankName) => {
    setBasicModal(!basicModal);
  };


  const [page, setPage] = useState(1);
  const [logdetails, setLogDetails] = useState(null);
  let navigate = useNavigate();
  const [allbanks, setAllbanks] = useState(null);
  useEffect(() => {
    getallbanks().then((data) => {
      setAllbanks(data);
    });
  }, []);


  useEffect(() => {
    getdetails(contextuser[0]?.BankName).then(async (data) => {
      var logs = data?.details.logs;
      await logs.reverse();
      setLogDetails(logs);
      console.log("the logs", logdetails);
    });
  }, [contextuser, logdetails]);


  // For next page
  const NextPage = (e) => {
    setPage(e.selected + 1);
  };

  return (
    <div className="superuser_container">
      <div className="superuser_subcontainer text-center">
        <div className="superuser_table pt-5">
          {allbanks ? (
            <>
              {/* dispaly User Logs */}
              <h2 className="my-4">Click on the Bank for Admin-User Logs</h2>
              <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th scope="col"><h6>Bank Name</h6></th>
                    <th scope="col"><h6>Admin</h6></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {allbanks?.map((bank, index) => {
                    return (
                      <>
                        {index >= (page - 1) * 5 && index <= page * 5 - 1 ? (
                          <tr
                          onClick={() => {
                            return navigate(`/superuser/logs/${bank.bank}`);
                          }}>
                            <>
                              <td>
                                {bank.bank}
                              </td>
                            </>
                            <td>
                              {bank.admin}
                            </td>
                          </tr>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </MDBTableBody>
              </MDBTable>

              <br />
              <div className="create-termi-paginate">
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={(e) => {
                    NextPage(e);
                  }}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={2}
                  pageCount={Math.ceil(allbanks?.length / 5)}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
            </>
          ) : (
            <>No Existing Banks</>
          )}
        </div>

      </div>

      {/* For PopUp */}
      <MDBModal tabIndex='-1' show={basicModal} setShow={setBasicModal}>
        <MDBModalDialog size='fullscreen'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Logs for the bank:</MDBModalTitle>
              <MDBBtn
                type='button'
                className='btn-close'
                color='none'
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {/* dispaly Admin Logs */}
              <h4 className="my-4 text-center">Admin Logs</h4>

              {/* dispaly User Logs */}
              <h4 className="my-4 text-center">User Logs</h4>
              <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">TID</th>
                    <th scope="col">Parameter</th>
                    <th scope="col">Variable</th>
                    <th scope="col">Previous Value</th>
                    <th scope="col">New Value</th>
                    <th scope="col">Timestamp</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {logdetails?.map((log, index) => {
                    return (
                      <>
                        {index >= (page - 1) * 5 && index <= page * 5 - 1 ? (
                          <tr>
                            <td>{log.user}</td>
                            <td>{log.tid}</td>
                            <td>{log.parameter}</td>
                            <td>{log.variable}</td>
                            <td>{log.prev_val}</td>
                            <td>{log.new_val}</td>
                            <td>{log.timestamp ? log.timestamp : "-"}</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </MDBTableBody>
              </MDBTable>

            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn type='button' color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      {/* 
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                Logs for the bank:
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => {
                  setBasicModal(false);
                }}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>

            </MDBModalBody>
           
            <h4 className="my-4 text-center">Admin Logs</h4>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">TimeStamp</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {logdetails?.map((log, index) => {
                  return (
                    <>
                      {index >= (page - 1) * 5 && index <= page * 5 - 1 ? (
                        <tr>
                          <td>{log.user}</td>
                          <td>{log.tid}</td>
                          <td>{log.parameter}</td>
                          <td>{log.variable}</td>
                          <td>{log.prev_val}</td>
                          <td>{log.new_val}</td>
                          <td>{log.timestamp ? log.timestamp : "-"}</td>
                        </tr>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </MDBTableBody>
            </MDBTable>

            <h4 className="my-4 text-center">User Logs</h4>

            <MDBModalFooter>
              <MDBBtn
                onClick={() => {
                  setBasicModal(false);
                }}
              >
                Done
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal> */}
      {/* 

    
            <h2 className="my-4">Logs</h2>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">TID</th>
                  <th scope="col">Parameter</th>
                  <th scope="col">Variable</th>
                  <th scope="col">Previous Value</th>
                  <th scope="col">New Value</th>
                  <th scope="col">Timestamp</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {logdetails?.map((log, index) => {
                  return (
                    <>
                      {index >= (page - 1) * 5 && index <= page * 5 - 1 ? (
                        <tr>
                          <td>{log.user}</td>
                          <td>{log.tid}</td>
                          <td>{log.parameter}</td>
                          <td>{log.variable}</td>
                          <td>{log.prev_val}</td>
                          <td>{log.new_val}</td>
                          <td>{log.timestamp ? log.timestamp : "-"}</td>
                        </tr>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </MDBTableBody>
            </MDBTable>

            <br />
            <div className="create-termi-paginate">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={(e) => {
                  NextPage(e);
                }}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                pageCount={Math.ceil(logdetails?.length / 5)}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          </>
        </div>
      </div>
    </div> */}
    </div>
  );
}

export default Logs;
