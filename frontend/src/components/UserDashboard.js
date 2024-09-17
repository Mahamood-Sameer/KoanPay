import React, { useEffect, useState } from "react";
import { getdetails } from "../api/getbankdetails";
import { useContext } from "react";
import { UserContext } from "../App";
import { TerminalContext } from "../App";
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
import { addtermi } from "../api/addterminal";
import ReactPaginate from "react-paginate";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { copyterminal } from "../api/copyterminal";
import { verifytid } from "../utils/verifycurrtid";

function AddTerminal() {
  const contextuser = useContext(UserContext);
  const contextterminal = useContext(TerminalContext);

  const [bankDetails, setBankDetails] = useState(null);
  const [parameters, setParameters] = useState(null);
  const [terminals, setTerminals] = useState(null);
  const [currterminal, setCurrTerminal] = useState(null);
  const [currtid, setCurrTid] = useState("");
  const [existingtid, setexistingtid] = useState("");
  const [currmid, setCurrMid] = useState("");
  const [currname, setCurrName] = useState("");
  const [curradd1, setCurrAdd1] = useState("");
  const [curradd2, setCurrAdd2] = useState("");
  const [currpostal, setCurrPostal] = useState("");
  const [createdby, setCreatedBy] = useState("");
  const [tparameters, setTParameters] = useState(null);
  const [page, setPage] = useState(1);
  const [Tid, setTid] = useState("");
  const [Mid, setMid] = useState("");
  const [MName, setMName] = useState("");
  // const [reqTermiCount, setReqTermiCount] = useState(0);

  //   popUp for adding Terminal
  const [basicModalTermi, setBasicModalTermi] = useState(false);

  const toggleShowPopupTermi = () => {
    setBasicModalTermi(!basicModalTermi);
  };

  // PopUp for Copy Terminal
  const [basicModalCopy, setBasicModalCopy] = useState(false);

  const toggleShowPopupCopy = () => {
    setBasicModalCopy(!basicModalCopy);
  };

  useEffect(() => {
    getdetails(contextuser[0]?.BankName).then((data) => {
      setBankDetails(data?.details);
      setTerminals(data?.details.terminals);
      var prev_params = data?.details.parameters;
      data?.details.parameters.map((param, index) => {
        var temp = param;
        temp["entries"] = [];
        temp["entries"].push(param.variables);
        prev_params[index] = temp;
        return;
      });
      console.log("The Params are : ", prev_params);
      setParameters(prev_params);
    });
    setCreatedBy(contextuser[0]?.email);
  }, [contextuser]);

  //  Creating a New Terminal
  const AddCurrTerminal = () => {
    console.log("the parameters:", parameters);
    verifytid(currtid, terminals).then((data) => {
      if (data.status === "ok") {
        var combined_curr_termi = {
          tid: currtid,
          mid: currmid,
          name: currname,
          createdby: createdby,
          add1: curradd1,
          add2: curradd2,
          postal: currpostal,
          tparameters: parameters,
        };

        // Pushing new terminal
        setCurrTerminal(combined_curr_termi);
        console.log("The Curr termi name is : ", currtid);
        var prev_termis = terminals;
        prev_termis.push(combined_curr_termi);
        setTerminals(prev_termis);
        console.log("The prev_termis: ", prev_termis);
        addtermi(contextuser[0]?.BankName, prev_termis).then((res) => {
          console.log("The response is: ", res);
          setBasicModalTermi(!basicModalTermi);
          setCurrTerminal(null);
          setCurrTid("");
        });
      } else {
        alert(data.message);
      }
    });
  };

  // For next page
  const NextPage = (e) => {
    setPage(e.selected + 1);
  };

  var index = 0,
    reqTermiCount = 0;

  const handleSearch = () => {
    setTid(document.getElementById("tid").value);
    setMid(document.getElementById("mid").value);
    setMName(document.getElementById("m-name").value);
  };

  // Copy Terminal
  const CopyCurrTerminal = () => {
    verifytid(currtid, terminals).then((data) => {
      if (data.status === "ok") {
        copyterminal(contextuser[0]?.BankName, currtid, existingtid).then(
          (res) => {
            if (res.status === "error") {
              alert(res.message);
            } else {
              console.log("The resposne is : ", res);
              setTerminals(res.terminals);
              setCurrTid("");
              setexistingtid("");
              setBasicModalCopy(false);
              setTid("");
            }
          }
        );
      } else {
        alert(data.message);
      }
    });
  };

  return (
    <div className="struct_container text-center">
      <div className="struct_subcontainer">
        <h2>Search Terminal</h2>
        <form
          className="search-bar my-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
            console.log("The value of tid is: ", Tid);
          }}
        >
          <MDBInput
            label="TID"
            id="tid"
            type="text"
            className="search-bar-ele"
          />
          <MDBInput
            label="MID"
            id="mid"
            type="text"
            className="search-bar-ele"
          />
          <MDBInput
            label="Merchant Name"
            id="m-name"
            type="text"
            className="search-bar-ele"
          />
          <MDBBtn rippleColor="dark" className="search-bar-ele" type="submit">
            <MDBIcon icon="search" />
          </MDBBtn>
        </form>

        <div className="terminals_container">
          {terminals ? (
            <>
              {/* dispaly termianls */}

              <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th scope="col">TID</th>
                    <th scope="col">MID</th>
                    <th scope="col">Name</th>
                    <th scope="col">add1</th>
                    <th scope="col">add2</th>
                    <th scope="col">postal</th>
                    <th scope="col">created by</th>
                    <th scope="col">updated by</th>
                    <th scope="col">creation date</th>
                    <th scope="col">updation date</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {terminals.map((terminal) => {
                    if (
                      terminal.tid === Tid ||
                      terminal.mid === Mid ||
                      terminal.name === MName
                    ) {
                      index++;
                      // var temp = reqTermiCount;
                      // setReqTermiCount(temp + 1);
                      reqTermiCount++;
                      return (
                        <>
                          {index - 1 >= (page - 1) * 5 &&
                          index - 1 <= page * 5 - 1 ? (
                            <tr>
                              {/* <th scope="row"><Link to={`/${terminal.tid}`}>{terminal.tid}</Link></th> */}
                              <th scope="row">
                                <Link
                                  to={`/user/${terminal.tid}`}
                                  onClick={() => {
                                    contextterminal[1](terminal);
                                    console.log(
                                      "the terminal is:",
                                      contextterminal[0]
                                    );
                                  }}
                                >
                                  {terminal.tid}
                                </Link>
                              </th>
                              <td>{terminal.mid}</td>
                              <td>{terminal.name}</td>
                              <td>{terminal.add1}</td>
                              <td>{terminal.add2}</td>
                              <td>{terminal.postal}</td>
                              <td>{terminal.createdby}</td>
                              <td>{terminal.updatedby}</td>
                              <td>{terminal.creationdate}</td>
                              <td>{terminal.updationdate}</td>
                            </tr>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                    }
                  })}
                </MDBTableBody>
              </MDBTable>
              <div className="create-termi-paginate">
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={(e) => {
                    NextPage(e);
                  }}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={2}
                  pageCount={Math.ceil(reqTermiCount / 5)}
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

              <br />
              <div className="btn_container">
                <MDBBtn
                  className="mb-3"
                  onClick={() => {
                    toggleShowPopupTermi();
                  }}
                >
                  Create New Terminal
                </MDBBtn>
                <MDBBtn
                  className="mb-3"
                  onClick={() => {
                    toggleShowPopupCopy();
                  }}
                >
                  Copy Existing Terminal
                </MDBBtn>
              </div>
            </>
          ) : (
            <h3>No existing terminals</h3>
          )}
        </div>

        {/* PopUp for Creating an Extra Terminal  */}
        <MDBModal
          show={basicModalTermi}
          setShow={setBasicModalTermi}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add Terminal</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShowPopupTermi}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  label="Terminal ID"
                  id="TerminalId"
                  type="text"
                  value={currtid}
                  onChange={(e) => setCurrTid(e.target.value)}
                />
                <br />
                <MDBInput
                  label="Merchant ID"
                  id="MerchantId"
                  type="text"
                  value={currmid}
                  onChange={(e) => setCurrMid(e.target.value)}
                />
                <br />
                <MDBInput
                  label="Merchant Name"
                  id="MerchantName"
                  type="text"
                  value={currname}
                  onChange={(e) => setCurrName(e.target.value)}
                />
                <br />
                <MDBInput
                  label="Address Line 1"
                  id="AddressLine1"
                  type="text"
                  value={curradd1}
                  onChange={(e) => setCurrAdd1(e.target.value)}
                />
                <br />
                <MDBInput
                  label="Address Line 2"
                  id="AddressLine2"
                  type="text"
                  value={curradd2}
                  onChange={(e) => setCurrAdd2(e.target.value)}
                />
                <br />
                <MDBInput
                  label="Postal Code"
                  id="PostalCode"
                  type="text"
                  value={currpostal}
                  onChange={(e) => setCurrPostal(e.target.value)}
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleShowPopupTermi}>
                  Close
                </MDBBtn>
                <MDBBtn
                  onClick={() => {
                    AddCurrTerminal();
                  }}
                >
                  Save changes
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        {/* Popup for Copy terminal */}
        <MDBModal
          show={basicModalCopy}
          setShow={setBasicModalCopy}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Copy Existing Terminal</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShowPopupCopy}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  label="New Terminal ID"
                  id="NTerminalId"
                  type="text"
                  value={currtid}
                  onChange={(e) => setCurrTid(e.target.value)}
                />
                <br />
                <MDBInput
                  label="Existing Terminal ID"
                  id="ETerminalId"
                  type="text"
                  value={existingtid}
                  onChange={(e) => setexistingtid(e.target.value)}
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleShowPopupTermi}>
                  Close
                </MDBBtn>
                <MDBBtn
                  onClick={() => {
                    CopyCurrTerminal();
                  }}
                >
                  Save changes
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    </div>
  );
}

export default AddTerminal;
