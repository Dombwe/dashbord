import React, { useState, useRef, useEffect } from 'react';
import {
  Row, Col, Table
} from 'reactstrap';
import { Link } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import { getPartners } from '../../../controller/Partners';
import Widget from "../../../components/Widget/Widget";
import 'react-toastify/dist/ReactToastify.css';
import s from './Partners.module.scss';
import { deletePartner } from '../../../controller/Partners';
import TextField from "@mui/material/TextField";
import { PDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { useHistory } from 'react-router'



function ListPartners() {



  const history = useHistory();

  useEffect(() => {
    getPartners();
  }, []);

  const promise = getPartners();
  const [searchTerm, setSearchTerm] = useState('');
  const pdfExportComponent = useRef(null);
  // const contentArea = useRef(null);
  const _exporter = useRef(null);

  const reloading = () => {
    setTimeout(() => {
      getPartners();
      history.push('/app/administration/Partners/list');
      window.location.reload();

    }, 1000);
  }

  const onDeletePartner = async (id) => {
    deletePartner(id);
    getPartners();
    reloading();
  };

  const inputHandler = (e) => {

    var term = e.target.value;
    setSearchTerm(term);
  };

  promise.then((Partners) => {
    localStorage.setItem('Partners', JSON.stringify(Partners.data));
  });
  const Partners = JSON.parse(localStorage.getItem('Partners'));

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();

  }

  const exportExcel = (event) => {
    _exporter.current.save();

  }


  return (
    <div className={s.root}>
      {/* <meta http-equiv="refresh" content="2"></meta> */}
      <Row>
        <Col sm={10} className="text-align:right"></Col>
        <Col sm={2} className="text-align:right">
          <Link to="/app/administration/Partners/addPartners" refresh="true">
            <Button className="text-warning"
              // o
              style={{ fontSize: "20px", marginBottom: "10px", background: "black" }}> Créer <i class="fa fa-plus-circle"></i></Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Widget
            title={<p className={"fw-bold text-warning"}>Les Partenaires d'intercash</p>}
          >
            <div className='button-area'>
              <Button style={{ backgroundColor: 'gray' }} onClick={exportExcel}>Excel Export</Button>

              <Button primary={true} style={{ backgroundColor: 'gray' }} onClick={handleExportWithComponent}>PDF Export</Button>
            </div>
            <div className="main" style={{
              display: "flex",
              height: "100 vh",
              width: "100%",
              alignItems: "center",
              flexDirection: "column",
              rowGap: "100px",
            }}>
              <div className="search" style={{
                width: "30%",
              }}>

                <div className='searchInputs'>
                  <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    value={searchTerm}
                    fullWidth
                    label="Search partner"
                  />
                  <div className='searchIcon'>
                    <searchIcon />
                  </div>
                </div>
              </div>
            </div>
            <PDFExport ref={pdfExportComponent} paperSize='auto'>
              <ExcelExport ref={_exporter}
                data={Partners}
                fileName="Partenaires.xlsx"
              >
                <ExcelExportColumn
                  field="id"
                  title="ID"
                  locked={true}
                  width={200}
                />
                <ExcelExportColumn
                  field="name"
                  title="Nom"
                  width={350}
                />
                <ExcelExportColumn
                  field="logo"
                  title="Logo"
                  width={350}
                />
                <ExcelExportColumn field="UnitsOnOrder" title="Units on Order" />
                <ExcelExportColumn field="UnitsInStock" title="Units in Stock" />
                <Table className={"table-hover table-bordered table-striped table-lg mt-lg mb-0"} borderless responsive>
                  <thead>
                    <tr>
                      <th key={0} scope="col" className={"text-center pl-0"}>
                        #
                      </th>
                      <th key={1} scope="col" className={"text-center pl-0"}>
                        id
                      </th>
                      <th key={2} scope="col" className={"text-center pl-0"}>
                        Name
                      </th>
                      <th key={3} scope="col" className={"text-center pl-0"}>
                        logo
                      </th>
                      <th key={3} scope="col" className={"text-center pl-0"}>
                        Commandes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-dark">
                    {
                      Partners.filter(Partners => searchTerm === "" || Partners.name.toLowerCase() === searchTerm.toLowerCase() || Partners.name.toLowerCase().includes(searchTerm.toLowerCase())).map((Partner, index) => {
                        return (
                          <tr key={index++}>

                            <td scope='row'>{index}</td>
                            <td className={"pl-0 fw-normal text-center"}>{Partner.id}</td>
                            <td className={"pl-0 fw-normal text-center"}>{Partner.name}</td>
                            <td className={"pl-0 fw-normal text-center"}>{Partner.logo}</td>
                            <td className={"pl-0 fw-normal text-center"}>
                              <button onClick={() => onDeletePartner(Partner.id)} style={{ fontSize: "20px" }}><i class="text-danger fa fa-trash-o"></i> Supprimer</button>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              </ExcelExport>
            </PDFExport>
          </Widget>
        </Col>
      </Row>

    </div>

  );

}

export default ListPartners;
