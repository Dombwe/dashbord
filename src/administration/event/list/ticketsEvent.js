import React  from "react";
import { Row, Col, Table } from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import Widget from "../../../components/Widget/Widget";
import s from "./Event.module.scss";
import {getTicketByEventId} from "../../../controller/ticket";
import { useHistory, Link} from 'react-router-dom';

export var nb =0;


const View = () => {

    const history = useHistory()
    const url2 = history.location.pathname;
    var bon = "";

    for (var i = 0; i < url2.length; i++) {

        if (url2[i] === "=")
            bon = i;

    }
    const id = parseInt(url2.slice(bon + 1));

    var data = getTicketByEventId(id);
    data.then((value) => {
        localStorage.setItem('event', JSON.stringify(value));
    
      });
      var ticket = JSON.parse(localStorage.getItem('event'));

   

    return (

        <div className={s.root}>
            <Row>
                <Col sm={8} style={{ textAlign: "center", marginLeft: "200px"}} >
                    <Widget
                        
                        title={<p className={"fw-bold text-warning"}>Les differents tickets disponible pour l'evènement en cours</p>}
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

                            </div>
                        </div>
                        <Table className={"table-hover table-bordered table-striped table-lg mt-lg mb-0"} borderless responsive>
                            <div style={{ height: '500px' }}>
                                <thead style={{ overflow: 'auto' }}>
                                    <tr>
                                        <th style={{ textAlign: "center" }}>
                                            No
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            ID
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Prix
                                        </th>
                                        <th kstyle={{ textAlign: "center" }}>
                                            Category
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Number
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Date Création
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Evenément
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Compte
                                        </th>
                                      
                                    </tr>
                                </thead>
                                <tbody className="text-dark" style={{ overflow: 'auto' }}>

                                    {
                                        // reponse && reponse.map((account, index) => {
                                            ticket && ticket.map((tic, index) => {
                                                if(!tic.is_buy){
                                            return (
                                                <tr key={index++}>
                                                    <td scope='row'>{index}</td>
                                                    <td style={{ textAlign: "center" }}>{(tic.id)}</td>
                                                    <td style={{ textAlign: "center" }}>{tic.price}</td>
                                                    <td style={{ textAlign: "center" }}>{tic.category}</td>
                                                    <td style={{ textAlign: "center" }}>{tic.number}</td>
                                                    <td style={{ textAlign: "center" }}>
                                                        {(tic.creation_date).slice(0,10)}
                                                        <br/>
                                                        {(tic.creation_date).slice(11, 16)}
                                                    </td>
                                                    <td style={{ textAlign: "center" }}>{tic.event_id}</td>
                                                    <td style={{ textAlign: "center" }}>{tic.account_id}</td>       
                                                </tr>
                                            );
                                        }
                                        })
                                    }
                                </tbody>
                            </div>
                        </Table>
                          
                    </Widget>
                </Col>
                <Col sm={8} style={{ textAlign: "center", marginLeft: "200px"}}>
                    <Widget
                        
                        title={<p className={"fw-bold text-warning"}>Les tickets déjá payés pour l'evènement en cours  </p>}
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

                            </div>
                        </div>
                        <Table className={"table-hover table-bordered table-striped table-lg mt-lg mb-0"} borderless responsive>
                            <div style={{ height: '500px' }}>
                                <thead style={{ overflow: 'auto' }}>
                                    <tr>
                                        <th style={{ textAlign: "center" }}>
                                            No
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            ID
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Prix
                                        </th>
                                        <th kstyle={{ textAlign: "center" }}>
                                            Category
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Number
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Date Création
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Evenément
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Compte
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Utilisé ?
                                        </th> 
                                    </tr>
                                </thead>
                                <tbody className="text-dark" style={{ overflow: 'auto' }}>

                                    {
                                        // reponse && reponse.map((account, index) => {
                                            ticket && ticket.map((tic, index) => {
                                                if(tic.is_buy){
                                                    nb++;

                                            return (
                                                <tr key={index++}>
                                                    <td scope='row'>{index}</td>
                                                    <td style={{ textAlign: "center" }}>{(tic.id)}</td>
                                                    <td style={{ textAlign: "center" }}>{tic.price}</td>
                                                    <td style={{ textAlign: "center" }}>{tic.category}</td>
                                                    <td style={{ textAlign: "center" }}>{tic.number}</td>
                                                    <td style={{ textAlign: "center" }}>
                                                        {(tic.creation_date).slice(0,10)}
                                                        <br/>
                                                        {(tic.creation_date).slice(11, 16)}
                                                    </td>
                                                    <td style={{ textAlign: "center" }}>{tic.event_id}</td>
                                                    <td style={{ textAlign: "center" }}>{tic.account_id}</td>
                                                    <td style={{ textAlign: "center" }}>{(tic.used)?"Yes":"No"}</td> 
                                                   
                                                </tr>
                                            );
                                        }
                                        })
                                    }
                                </tbody>
                            </div>
                            <div> <p style={{ textAlign: "center", marginLeft:"200px" }}>Nombre total de tickets vendu<br/> <strong><em>{nb}</em></strong></p>  </div>

                        </Table>
                          
                    </Widget>
                </Col>
            </Row>
        </div>
    );




};
export default View