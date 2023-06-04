import React, { useEffect, useState } from "react";
import { getdetails } from "../api/getbankdetails";
import { useContext } from "react";
import { UserContext } from "../App";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBAccordion,
  MDBAccordionItem,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import { addparam } from "../api/addparameter";

function DefineStruct() {
  const contextuser = useContext(UserContext);

  const [bankDetails, setBankDetails] = useState(null);
  const [parameters, setParameters] = useState(null);
  const [currparameter, setCurrParameter] = useState(null);
  const [currparameter_name, setCurrParameter_name] = useState("");
  const [variable, setVariable] = useState({
    var_name: "",
    max_size: "",
    min_size: "",
    value: "",
    // entries:[]
  });

  // popUp for adding Variable
  const [basicModalVariable, setBasicModalVariable] = useState(false);

  const toggleShowPopupVariable = (curr_par) => {
    setCurrParameter(curr_par);
    setBasicModalVariable(!basicModalVariable);
  };
  //   popUp for adding Parameter
  const [basicModalParam, setBasicModalParam] = useState(false);

  const toggleShowPopupParam = () => {
    setBasicModalParam(!basicModalParam);
  };

  useEffect(() => {
    getdetails(contextuser[0]?.BankName).then((data) => {
      setBankDetails(data?.details);
      setParameters(data?.details.parameters);
    });
  }, [contextuser]);

  //Pushing varibale to the repective paramater
  const pushvarible = () => {
    let prev_variables = currparameter?.variables;
    prev_variables?.push(variable);
    setCurrParameter({ ...currparameter, variable: prev_variables });
    var temp_parameters = parameters;
    var index1;
    console.log("The prev Parameters are: ", temp_parameters);
    temp_parameters.map((temp_param, index) => {
      if (temp_param?.par_name === currparameter?.par_name) {
        index1 = index;
        return;
      }
    });
    temp_parameters[index1] = currparameter;
    setParameters(temp_parameters);
    addparam(contextuser[0]?.BankName, parameters).then((res) => {
      console.log("The response is: ", res);
      setBasicModalVariable(!basicModalVariable);
      setVariable({
        var_name: "",
        max_size: "",
        min_size: "",
        value: "",
        // entries:[]
      });
    });
  };

  // Creating a New Parameter
  const AddCurrParameter = () => {
    var combined_curr_param = {
      par_name: currparameter_name,
      variables: [],
      entries:[],
    };
    setCurrParameter(combined_curr_param);
    console.log("The Curr param name is : ", currparameter_name);
    var prev_params = parameters;
    prev_params.push(combined_curr_param);
    setParameters(prev_params);
    console.log("The prev_params: ", prev_params);
    addparam(contextuser[0]?.BankName, prev_params).then((res) => {
      console.log("The response is: ", res);
      setBasicModalParam(!basicModalParam);
      setCurrParameter(null);
      setCurrParameter_name("");
    });
  };

  return (
    <div className="define-struct-container">
      <div className="define-struct-subcontainer">
        <h1 className="text-center title-padding">Create the structure of {contextuser[0]?.BankName}</h1>
        {parameters ? (
          <>
            <MDBAccordion className="accordion-gap">
              {parameters.map((par, index) => {
                return (
                  <MDBAccordionItem
                    collapseId={index + 1}
                    headerTitle={par?.par_name} 
                  >
                    <MDBTable hover responsive>
                      <MDBTableHead>
                        <tr>
                          <th scope="col">Variable</th>
                          <th scope="col">Minimum Size</th>
                          <th scope="col">Maximum Size</th>
                          <th scope="col">Value</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {par?.variables.map((vari) => {
                          return (
                            <tr>
                              <th scope="row">{vari.var_name}</th>
                              <td>{vari.min_size}</td>
                              <td>{vari.max_size}</td>
                              <td>{vari.value}</td>
                            </tr>
                          );
                        })}
                      </MDBTableBody>
                    </MDBTable>
                    <MDBBtn onClick={() => toggleShowPopupVariable(par)}>
                      Add Variable
                    </MDBBtn>
                  </MDBAccordionItem>
                );
              })}
            </MDBAccordion>
            <div className="text-center">
              <MDBBtn
                onClick={() => {
                  toggleShowPopupParam();
                }}
              >
                Add Paramater
              </MDBBtn>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* PopUp for Creating an Extra Variable */}
        <MDBModal
          show={basicModalVariable}
          setShow={setBasicModalVariable}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add Variable</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShowPopupVariable}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  label="Variable Name"
                  id="VariableName"
                  type="text"
                  value={variable.var_name}
                  onChange={(e) =>
                    setVariable({ ...variable, var_name: e.target.value })
                  }
                />
                <br />
                <MDBInput
                  label="Minimum Size"
                  id="MinimumSize"
                  type="text"
                  value={variable.min_size}
                  onChange={(e) =>
                    setVariable({ ...variable, min_size: e.target.value })
                  }
                />
                <br />
                <MDBInput
                  label="Maximum Size"
                  id="MaximumSize"
                  type="text"
                  value={variable.max_size}
                  onChange={(e) =>
                    setVariable({ ...variable, max_size: e.target.value })
                  }
                />
                <br />
                <MDBInput
                  label="Default value"
                  id="Defaultvalue"
                  type="text"
                  value={variable.value}
                  onChange={(e) =>
                    setVariable({ ...variable, value: e.target.value })
                  }
                  />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleShowPopupVariable}>
                  Close
                </MDBBtn>
                <MDBBtn
                  onClick={() => {
                    pushvarible();
                  }}
                >
                  Save changes
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
        {/* PopUp for Creating an Extra Parameter */}
        <MDBModal
          show={basicModalParam}
          setShow={setBasicModalParam}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add Paramater</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShowPopupParam}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  label="Parameter Name"
                  id="ParameterName"
                  type="text"
                  value={currparameter_name}
                  onChange={(e) => {
                    setCurrParameter_name(e.target.value);
                  }}
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleShowPopupParam}>
                  Close
                </MDBBtn>
                <MDBBtn
                  onClick={() => {
                    AddCurrParameter();
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

export default DefineStruct;
