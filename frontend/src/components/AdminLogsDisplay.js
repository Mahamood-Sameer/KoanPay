import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { getdetails } from "../api/getbankdetails";
import { useContext } from "react";
import { UserContext } from "../App";

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
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
} from "mdb-react-ui-kit";

import ReactPaginate from "react-paginate";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

function AdminLogsDisplay() {
    const contextuser = useContext(UserContext);
    const [bankdetails, setBankDetails] = useState(null);
    const [page, setPage] = useState(1);
    const [adminlogs, setAdminLogs] = useState(null);
    const [userlogs, setUserLogs] = useState(null);
    // For next page
    const NextPage = (e) => {
        setPage(e.selected + 1);
    };

    // Tabs StateVariables
    const [basicActive, setBasicActive] = useState("Admin Logs");

    const handleBasicClick = (logType) => {
        setBasicActive(logType);
        setPage(1);
    };
    // ----------------End of Tabs----------

    var { bank } = useParams();
    useEffect(() => {
        getdetails(bank).then((data) => {
            setBankDetails(data.details);
            var temp_adminlogs = data.details.adminlogs;
            temp_adminlogs.reverse();
            setAdminLogs(temp_adminlogs);
            var temp_userlogs = data.details.logs;
            temp_userlogs.reverse();
            setUserLogs(temp_userlogs);
            console.log("The bank details are:", data);
        });
    }, [contextuser]);
    return (
        <div className="viewandupdateterminal_container">
            <div className="params_container">
                <h2>The bank is {bank}</h2>

                {/* Tabs Heading --> Displaying Logs */}
                <MDBTabs>
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleBasicClick("Admin Logs")}
                            active={basicActive === "Admin logs"}
                        >
                            <p className="log-tabs">Admin Logs</p>
                        </MDBTabsLink>
                    </MDBTabsItem>

                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleBasicClick("User Logs")}
                            active={basicActive === "User logs"}
                        >
                            <p className="log-tabs">User Logs</p>
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent className="tabs_content">
                    <MDBTabsPane show={basicActive === "Admin Logs"}>
                        <MDBTable>
                            <MDBTableHead>
                                <tr>
                                    <th>Admin Logs</th>
                                    <th>Time Stamp</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {adminlogs?.map((entry, index) => {
                                    console.log(entry);
                                    return (
                                        <>
                                            <tr>
                                                {index >= (page - 1) * 5 &&
                                                    index <= page * 5 - 1 ? (
                                                    <>
                                                        <td>
                                                            {entry.type}
                                                        </td>
                                                        <td>
                                                            {entry.timestamp}
                                                        </td>
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
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={(e) => {
                                    NextPage(e);
                                }}
                                pageRangeDisplayed={5}
                                marginPagesDisplayed={2}
                                pageCount={Math.ceil(adminlogs?.length / 5)}
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


                    </MDBTabsPane>
                    <MDBTabsPane show={basicActive === "User Logs"}>
                        <MDBTable>
                            <MDBTableHead>
                                <tr>
                                    <th>User</th>
                                    <th>TID</th>
                                    <th>Parameter</th>
                                    <th>Variable</th>
                                    <th>Previous value</th>
                                    <th>New value</th>
                                    <th>Time Stamp</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {userlogs?.map((entry, index) => {
                                    console.log(entry);
                                    return (
                                        <>
                                            <tr>
                                                {index >= (page - 1) * 5 &&
                                                    index <= page * 5 - 1 ? (
                                                    <>
                                                        <td>{entry.user}</td>
                                                        <td>{entry.tid}</td>
                                                        <td>{entry.parameter}</td>
                                                        <td>{entry.variable}</td>
                                                        <td>{entry.prev_val}</td>
                                                        <td>{entry.new_val}</td>
                                                        <td>{entry.timestamp}</td>
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
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={(e) => {
                                    NextPage(e);
                                }}
                                pageRangeDisplayed={5}
                                marginPagesDisplayed={2}
                                pageCount={Math.ceil(userlogs?.length / 5)}
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

                    </MDBTabsPane>
                </MDBTabsContent>


            </div>
        </div>
    )
}

export default AdminLogsDisplay
