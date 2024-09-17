import React, { useEffect, useState } from "react";
import { getdetails } from "../api/getbankdetails";
import { useContext } from "react";
import { UserContext } from "../App";
// import { LogContext } from "../App";
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

function UserLogs() {
  const contextuser = useContext(UserContext);
  // const contextlog = useContext(LogContext);

  const [page, setPage] = useState(1);
  const [logdetails, setLogDetails] = useState(null);

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
    <div className="userlog-container">
      <div className="struct_container text-center userlog-subcontainer">
        <div className="terminals_container">
          <>
            {/* dispaly User Logs */}
            <h2 className="my-4">User Logs</h2>
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
                          {/* <th scope="row"><Link to={`/${terminal.tid}`}>{terminal.tid}</Link></th> */}
                          {/* <th scope="row"><Link to={`/user/${terminal.tid}`}
                                                        onClick={() => {
                                                            contextterminal[1](terminal);
                                                            console.log("the terminal is:", contextterminal[0]);
                                                        }}
                                                    >{terminal.tid}</Link></th> */}

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
    </div>
  );
}

export default UserLogs;
