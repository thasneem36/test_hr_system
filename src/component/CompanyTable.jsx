import React, { Component } from "react";
import "./AdminCompanyTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Updated path
import "ag-grid-community/styles/ag-theme-balham.css"; // Updated path

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class AdminCompanyTable extends Component {
  state = {
    companyData: [],
    loading: true,
    columnDefs: [
      {
        headerName: "Company Name",
        field: "CompanyName",
        sortable: true,
        width: 150,
      },
      {
        headerName: "Address",
        field: "Address",
        sortable: true,
      },
      {
        headerName: "Country",
        field: "CountryName",
        sortable: true,
      },
      {
        headerName: "State",
        field: "StateName",
        sortable: true,
      },
      {
        headerName: "City",
        field: "CityName",
        sortable: true,
      },
      {
        headerName: "Postal Code",
        field: "PostalCode",
        sortable: true,
        width: 120,
      },
      {
        headerName: "Website",
        field: "Website",
        sortable: true,
      },
      {
        headerName: "Email",
        field: "Email",
        sortable: true,
        width: 150,
      },
      {
        headerName: "Contact Person",
        field: "ContactPerson",
        sortable: true,
        width: 140,
      },
      {
        headerName: "Contact No",
        field: "ContactNo",
        sortable: true,
        width: 120,
      },
      {
        headerName: "Fax No",
        field: "FaxNo",
        sortable: true,
      },
      {
        headerName: "Pan No",
        field: "PanNo",
        sortable: true,
      },
      {
        headerName: "GST No",
        field: "GSTNo",
        sortable: true,
      },
      {
        headerName: "CIN No",
        field: "CINNo",
        sortable: true,
      },
      {
        headerName: "",
        field: "edit",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderEditButton.bind(this),
      },
      {
        headerName: "",
        field: "delete",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderButton.bind(this),
      },
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 110,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };

  companyObj = [];
  rowDataT = [];

  loadCompanyData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/company", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.companyObj = response.data;
        console.log("response", response.data);
        this.setState({ companyData: response.data, loading: false });
        this.rowDataT = [];

        this.companyObj.map((data) => {
          let temp = {
            data,
            CompanyName: data["CompanyName"],
            Address: data["Address"],
            CountryName: data["city"][0]["state"][0]["country"][0]["CountryName"],
            StateName: data["city"][0]["state"][0]["StateName"],
            CityName: data["city"][0]["CityName"],
            PostalCode: data["PostalCode"],
            Website: data["Website"],
            Email: data["Email"],
            ContactPerson: data["ContactPerson"],
            ContactNo: data["ContactNo"],
            FaxNo: data["FaxNo"],
            PanNo: data["PanNo"],
            GSTNo: data["GSTNo"],
            CINNo: data["CINNo"],
          };
          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onCompanyDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record?") === true) {
      axios
        .delete(process.env.REACT_APP_API_URL + "/api/company/" + e, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          this.componentDidMount();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  componentDidMount() {
    this.loadCompanyData();
  }

  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onCompanyDelete(params.data.data["_id"])}
      />
    );
  }

  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditCompany(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Company Details</h2>
        <Button variant="primary" id="add-button" onClick={this.props.onAddCompany}>
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button>
        <div id="clear-both" />

        {!this.state.loading ? (
          <div id="table-div" className="ag-theme-balham">
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              rowData={this.state.rowData}
              pagination={true}
              paginationPageSize={10}
              getRowHeight={this.state.getRowHeight}
            />
          </div>
        ) : (
          <div id="loading-bar">
            <RingLoader
              css={override}
              sizeUnit={"px"}
              size={50}
              color={"#0000ff"}
              loading={true}
            />
          </div>
        )}
      </div>
    );
  }
}

export default AdminCompanyTable;