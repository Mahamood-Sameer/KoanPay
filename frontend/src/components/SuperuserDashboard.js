import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { MDBBtn } from "mdb-react-ui-kit";
import { getallbanks } from "../api/getAllbankdetails";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import ReactPaginate from "react-paginate";

function Superuser() {
  const [page, setPage] = useState(1);

  let navigate = useNavigate();
  const [allbanks, setAllbanks] = useState(null);
  useEffect(() => {
    getallbanks().then((data) => {
      setAllbanks(data);
    });
  }, []);

  const NextPage = (e) => {
    setPage(e.selected + 1);
  };

  return (
    <div className="superuser_container">
      <div className="superuser_subcontainer text-center">
        <div className="superuser_table pt-5">
          {allbanks ? (
            <>
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
                          <tr>
                            {/* <th scope="row"><Link to={`/${terminal.tid}`}>{terminal.tid}</Link></th> */}
                            {/* <th scope="row"><Link to={`/user/${terminal.tid}`}
                                                  onClick={() => {
                                                      contextterminal[1](terminal);
                                                      console.log("the terminal is:", contextterminal[0]);
                                                  }}
                                              >{terminal.tid}</Link></th> */}

                            <td>{bank.bank}</td>
                            <td>{bank.admin}</td>
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

        {/* <button onClick={()=>{return navigate('/createbank')}} >Create New Bank</button> */}
        <div className="rows gap-5">
          <MDBBtn
            className="w-10 btn-util my-5"
            onClick={() => {
              return navigate("/create_bank");
            }}
          >
            Create New Bank
          </MDBBtn>
          <MDBBtn
            className="w-10 btn-util my-5"
            onClick={() => {
              return navigate("/superuser/logs");
            }}
          >
            View logs
          </MDBBtn>
          </div>
        </div>
      </div>
      );
}

      export default Superuser;
