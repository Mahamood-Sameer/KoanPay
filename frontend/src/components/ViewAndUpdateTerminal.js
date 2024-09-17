import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { getTerminalDetails } from "../api/getTerminalDetails";
import { useParams } from "react-router-dom";
import { addentry } from "../api/addentries";
import { updateentry } from "../api/updateentries";

// For Tabs
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

// For accordians
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";

// Tabulate Formation
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

// Edit Icon
import { MDBIcon } from "mdb-react-ui-kit";

// For Paginaiton
import ReactPaginate from "react-paginate";

// For popup
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

function ViewAndUpdateTerminal() {
  const contextuser = useContext(UserContext);
  const { tid } = useParams();
  const [terminaldetails, setterminaldetails] = useState(null);
  const [currparameter, setCurrentparameter] = useState(null);
  const [currentry, setcurrententry] = useState(null);
  const [currentry_id, setCurrEntryID] = useState(null);
  const [currvariable_id, setCurrVariableID] = useState(null);
  const [minMaxCheck, setMinMaxCheck] = useState(true);

  // Tabs StateVariables
  const [basicActive, setBasicActive] = useState(null);

  const handleBasicClick = (param) => {
    if (param.par_name === basicActive) {
      return;
    }
    setCurrentparameter(param);
    setBasicActive(param.par_name);
  };
  // ----------------End of Tabs----------

  // Pages
  const [page, setPage] = useState(1);
  // For next page
  const NextPage = (e) => {
    setPage(e.selected + 1);
  };

  // PopUp
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = (entry, var_id, entry_id) => {
    setcurrententry(entry);
    setBasicModal(!basicModal);
    setCurrEntryID(entry_id);
    setCurrVariableID(var_id);
    setMinMaxCheck(true);
  };

  // UseEffect
  useEffect(() => {
    console.log("The terminal id is: ", tid);
    getTerminalDetails(tid, contextuser[0]?.BankName).then((data) => {
      setterminaldetails(data);
      setCurrentparameter(data.tparameters[0]);
      setBasicActive(data.tparameters[0].par_name);
    });
  }, []);

  // Adding an Entry
  const AddTheEntry = (pos) => {
    addentry(contextuser[0].BankName, tid, currparameter.par_name).then(
      (data) => {
        setterminaldetails(data.updatedterminal);
        var entrieslength =
          data.updatedterminal.tparameters[pos].entries.length;
        console.log(
          "entries is: ",
          data.updatedterminal.tparameters[pos].entries
        );
        setPage(Math.ceil(entrieslength / 5));
        console.log(data);
      }
    );
  };
  // Editing an Entry
  const editEntry = () => {
    console.log(currentry);
    if (
      currentry?.value.length >= currentry?.min_size &&
      currentry?.value.length <= currentry?.max_size
    ) {
      updateentry(
        contextuser[0].BankName,
        tid,
        currparameter.par_name,
        currvariable_id,
        currentry_id,
        currentry.value,
        contextuser[0].email
      ).then((data) => {
        console.log("The data is: ", data);
        setterminaldetails(data);
        setBasicModal(false);
        setcurrententry(null);
        setCurrEntryID(null);
        setCurrVariableID(null);
      });
    } else setMinMaxCheck(false);
  };
  return (
    <div className="viewandupdateterminal_container">
      <div className="params_container">
        <h4>View TID {tid}</h4>
        <br />
        {/* Tabs Heading --> Displaying Parameters */}

        <MDBTabs>
          {terminaldetails?.tparameters.map((parameter) => {
            return (
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleBasicClick(parameter)}
                  active={basicActive === parameter.par_name}
                >
                  <p className="param-tabs">{parameter.par_name}</p>
                  {/* {parameter.par_name} */}
                </MDBTabsLink>
              </MDBTabsItem>
            );
          })}
        </MDBTabs>
        <MDBTabsContent className="tabs_content">
          {terminaldetails?.tparameters.map((parameter, param_index) => {
            return (
              // <>{parameter.par_name}</>
              <MDBTabsPane
                show={basicActive === parameter.par_name}
                className="text-center"
              >
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th>#</th>
                      {parameter.variables?.map((vari) => {
                        return <th scope="col">{vari.var_name}</th>;
                      })}
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {parameter.entries.map((entry, index) => {
                      console.log(entry);
                      return (
                        <>
                          <tr>
                            {index >= (page - 1) * 5 &&
                            index <= page * 5 - 1 ? (
                              <>
                                <td>{index + 1}</td>
                                {entry?.map((entry_item, entry_item_index) => {
                                  return (
                                    <>
                                      <td
                                        onDoubleClick={() => {
                                          toggleShow(
                                            entry_item,
                                            entry_item_index,
                                            index
                                          );
                                        }}
                                      >
                                        {entry_item.value}
                                      </td>
                                    </>
                                  );
                                })}
                              </>
                            ) : (
                              <></>
                            )}
                          </tr>
                        </>
                      );
                    })}
                  </MDBTableBody>
                </MDBTable>
                <div className="add_entry_pagination">
                  {parameter.par_name.toUpperCase() !== "GLOBALS" ? (
                    <>
                      <MDBBtn
                        className="mb-3"
                        onClick={() => {
                          AddTheEntry(param_index);
                        }}
                      >
                        Add Entry
                      </MDBBtn>
                      <ReactPaginate
                        nextLabel="next >"
                        onPageChange={(e) => {
                          NextPage(e);
                        }}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        pageCount={Math.ceil(parameter.entries.length / 5)}
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
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </MDBTabsPane>
            );
          })}
        </MDBTabsContent>
      </div>

      {/* For PopUp */}
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                Edit the value of {currentry?.var_name}
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
              <MDBInput
                type="text"
                value={currentry?.value}
                onChange={(e) => {
                  setcurrententry({ ...currentry, value: e.target.value });
                }}
              ></MDBInput>
              {!minMaxCheck && (
                <p className="error-msg mt-2">
                  Value of {currentry?.var_name} should be between{" "}
                  {currentry?.min_size} and {currentry?.max_size} characters
                </p>
              )}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => {
                  setBasicModal(false);
                }}
              >
                Close
              </MDBBtn>
              <MDBBtn
                onClick={() => {
                  editEntry();
                }}
              >
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default ViewAndUpdateTerminal;
