import React from "react";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function BreadcrumbView() {
  return (
    <>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>
          <Link to={"/user"}>Home</Link>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>View</MDBBreadcrumbItem>
      </MDBBreadcrumb>
    </>
  );
}
