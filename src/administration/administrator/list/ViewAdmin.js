import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget";
import s from "./Administrator.module.scss";
import { getSingleAdministrator } from "../../../controller/administrator";
import { useHistory, Link } from 'react-router-dom';


var Actif = {
    true: "Actif",
    false: "Bloqué"
  }


const ViewAdmin = () => {

    const history = useHistory()
    const url2 = history.location.pathname;
    var bon = "";

    for (var i = 0; i < url2.length; i++) {

        if (url2[i] === "=")
            bon = i;

    }
    const id = parseInt(url2.slice(bon + 1));
    console.log("***********************id******************");
    console.log(id);
    var data = getSingleAdministrator(id);
    console.log("***********************data******************");
    console.log(data);
    data.then((value) => {
        localStorage.setItem('Administrator', JSON.stringify(value));

    });
    var admin = JSON.parse(localStorage.getItem('Administrator'));

    console.log("***********************Administrators******************");
    console.log(admin);
    return (
        <div style={{marginTop: "100px", marginLeft: "50px", textAlign:"center"}} >
        <div className="card">
            <div className="card-header">
                <p>Admin Contact Detail</p>
            </div>
            <div className="container" style={{marginTop: "60px", marginLeft: "50px", textAlign:"center"}} >
                <strong>ID: </strong>
                <span>{id} </span>
                <br />
                <br />
                <strong>Name: </strong>
                <span>{admin && admin.name} </span>
                <br />
                <br />
                <strong>Username: </strong>
                <span>{admin  && admin.username} </span>
                <br />
                <br />
                <strong>Status: </strong>
                <span>{admin && admin.is_active? "Actif":"Bloqué" }</span>
                <br />
                <br />
                <strong>Contact: </strong>
                <span>{admin && admin.contact} </span>
                <br />
                <br />
                <strong>LEVEL: </strong>
                <span>{admin && admin.level} </span>
                <br />
                <br />
                <br />
                <br />
                <Link to="/app/administration/administrator/list">
                    <Button className="btn btn.edit">Go Back</Button>
                </Link>
            </div>
        </div>
    </div>
       
    );




};
export default ViewAdmin;