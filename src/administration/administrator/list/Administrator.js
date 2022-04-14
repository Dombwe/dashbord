import React from 'react';
import {
  Row, Col, Button, Table,
} from 'reactstrap';
import { Link, Route } from "react-router-dom";
import Widget from "../../../components/Widget";
import 'react-toastify/dist/ReactToastify.css';
import { useParams} from "react-router-dom";
import s from './Administrator.module.scss';
import {deleteAdministrator} from "../../../controller/administrator";


import { getAdministrators } from "../../../controller/administrator";

function ListAdministrator () {


  
  const onDeleteUser = async (id) => {
        deleteAdministrator(id);
        
};


 const promise = getAdministrators();
  

    promise.then((administrators) => {
      localStorage.setItem('administrators',JSON.stringify(administrators.data));
    });
    const administrators = JSON.parse(localStorage.getItem('administrators'));

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
                // customDropDown
                title={<p className={"fw-bold text-warning"}>Les administrateurs du dashboard</p>}
              >
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
                      administrators && administrators.map((administrator, index) => { 
                        return ( 
                          <tr key={index++}>

                            <td scope='row'>{index}</td>
                            <td className={"pl-0 fw-normal text-center"}>{administrator.name}</td>
                            <td className={"pl-0 fw-normal text-center"}>{administrator.username}</td>
                            <td className={"pl-0 fw-normal text-center"}>{administrator.contact}</td>
                            <td className={"pl-0 fw-normal text-center"}>{administrator.level}</td>
                            <td className={"pl-0 fw-normal text-center"}>
                            <Link to={`add?id=${administrator.id}`} style={{fontSize:"20px", marginRight:"15px"}}><i class="text-success fa fa-edit"></i></Link>
                              <button href="#" style={{fontSize:"20px", marginRight:"15px"}}><i class="text-warning fa fa-times-circle"></i></button>
                              <button onClick={() => onDeleteUser(administrator.id)} refresh="true" style={{fontSize:"20px"}}><i class="text-danger fa fa-trash-o"></i></button>
                             
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
