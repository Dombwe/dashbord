import React, {useState} from 'react';
import {
  Row, Col, Button, Table,
} from 'reactstrap';
import { Link} from "react-router-dom";
import Widget from "../../../components/Widget";
import 'react-toastify/dist/ReactToastify.css';
import s from './Administrator.module.scss';
import {deleteAdministrator} from "../../../controller/administrator";
import TextField from "@mui/material/TextField";


import { getAdministrators } from "../../../controller/administrator";

function ListAdministrator () {


  
  const onDeleteUser = async (id) => {
        deleteAdministrator(id);
        
};


 const promise = getAdministrators();
 const [searchTerm, setSearchTerm] = useState('');

 const inputHandler = (e) => {

   var term = e.target.value;
   setSearchTerm(term);
 };

    promise.then((value) => {
      localStorage.setItem('administrators',JSON.stringify(value));
    });
    var administrators = JSON.parse(localStorage.getItem('administrators'));

    return (
        <div className={s.root}>
          <Row>
            <Col sm={10} className="text-align:right"></Col>
            <Col sm={2} className="text-align:right">
            <Link to="./add">
            <Button  className="text-warning"  style={{fontSize:"20px", marginBottom:"10px", background:"black"}}> Créer <i class="fa fa-plus-circle"></i></Button>
            </Link>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Widget
                title={<p className={"fw-bold text-warning"}>Les administrateurs du dashboard</p>}
              >
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
                    label="Search Admin"
                  />
                  <div className='searchIcon'>
                    <searchIcon />
                  </div>
                </div>

              </div>
              </div>
                <Table className={"table-hover table-bordered table-striped table-lg mt-lg mb-0"} borderless responsive>
                  <thead>
                    <tr>
                      <th key={0} scope="col" className={"text-center pl-0"}>
                        #
                      </th>
                      <th key={1} scope="col" className={"text-center pl-0"}>
                        Nom
                      </th>
                      <th key={2} scope="col" className={"text-center pl-0"}>
                        Username
                      </th>
                      <th key={3} scope="col" className={"text-center pl-0"}>
                        Contact
                      </th>
                      <th key={4} scope="col" className={"text-center pl-0"}>
                        Level
                      </th>
                      <th key={12} scope="col" className={"text-center pl-0"}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-dark">
                    {
                      administrators.filter(administrators => searchTerm === "" || administrators.name.toLowerCase() === searchTerm.toLowerCase() || administrators.username.toLowerCase().includes(searchTerm.toLowerCase()) || administrators.name.toLowerCase().includes(searchTerm.toLowerCase())).map((administrator, index) => { 
                        return (  
                          <tr key={index++}>

                            <td scope='row'>{index}</td>
                            <td className={"pl-0 fw-normal text-center"}>{administrator.name}</td>
                            <td className={"pl-0 fw-normal text-center"}>{administrator.username}</td>
                            <td className={"pl-0 fw-normal text-center"}>{administrator.contact}</td>
                            <td className={"pl-0 fw-normal text-center"}>{administrator.level}</td>
                            <td className={"pl-0 fw-normal text-center"}>
                            <Link to={`./add/Event/id=${administrator.id}`} style={{fontSize:"20px", marginRight:"15px"}}><i class="text-success fa fa-edit"></i></Link>
                            <Link to={`/app/administration/administrator/list/ViewAdmin/id=${administrator.id}`} style={{fontSize:"20px", marginRight:"15px"}}><i class="text-success 	fa fa-plus-square"></i></Link>
                            <Link onClick={() => onDeleteUser(administrator.id)} refresh="true" style={{fontSize:"20px"}}><i class="text-danger fa fa-trash-o"></i></Link>
                             
                            </td>                          
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              </Widget>
            </Col>
          </Row>
      
        </div>
    );
  
}

export default ListAdministrator;
