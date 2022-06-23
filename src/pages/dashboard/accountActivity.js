import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../components/Widget";
import { Link } from "react-router-dom"
import s from "./Dashboard";
import { getTransactionByAccountId } from "../../controller/transactions";
import { useHistory } from 'react-router-dom';

var typeTransaction = {
    1: "Dépot",
    2: "Transfert",
    3: "Achat",
    4: "Vente",
}

const View = () => {

    const history = useHistory()
    const url2 = history.location.pathname;
    var bon = "";

    for (var i = 0; i < url2.length; i++) {

        if (url2[i] === "=")
            bon = i;

    }
    const id = parseInt(url2.slice(bon + 1));

    var transactio = getTransactionByAccountId(id);
    transactio.then((value) => {

        localStorage.setItem('accountActivity', JSON.stringify(value));
    });

    const accountActivities = JSON.parse(localStorage.getItem('accountActivity'));
    return (

        <div className={s.root}>
            <Row>
                <Col sm={12}>
                    <Widget
                        customDropDown
                        title={<p className={"fw-bold text-warning"}>Account activities</p>}
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
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "center" }} >
                                        No
                                    </th>
                                    <th style={{ textAlign: "center" }} >
                                        ID
                                    </th>
                                    <th style={{ textAlign: "center" }} >
                                        Montant
                                    </th>
                                    <th style={{ textAlign: "center" }} >
                                        Comission
                                    </th>
                                    <th style={{ textAlign: "center" }} >
                                        Libellé
                                    </th>
                                    <th style={{ textAlign: "center" }} >
                                        Envoyeur
                                    </th>
                                    <th style={{ textAlign: "center" }} >
                                        Numéro Envoyeur
                                    </th>
                                    <th style={{ textAlign: "center" }} >
                                        Bénéficiaire
                                    </th>
                                    <th style={{ textAlign: "center" }} >
                                        Numéro Bénéficiaire
                                    </th>
                                    <th style={{ textAlign: "center" }}>
                                        Date transaction
                                    </th>
                                    <th style={{ textAlign: "center" }} >
                                        Heure transaction
                                    </th>
                                    <th style={{ textAlign: "center" }} >
                                        Type transaction
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-dark" style={{ overflow: 'auto' }}>

                                {
                                    accountActivities && accountActivities.map((transac, index) => {
                                        return (
                                            <tr key={index++}>
                                                <td scope='row'>{index}</td>
                                                <td style={{ textAlign: "center" }} >{transac.id}</td>
                                                <td style={{ textAlign: "center" }} >{transac.amount}F CFA</td>
                                                <td style={{ textAlign: "center" }} >{transac.commission}F CFA</td>
                                                <td style={{ textAlign: "center" }} >{transac.description}</td>
                                                <td style={{ textAlign: "center" }} >{transac.sender_name}</td>
                                                <td style={{ textAlign: "center" }} >{transac.sender_phone}</td>
                                                <td style={{ textAlign: "center" }} >{transac.receiver_name}</td>
                                                <td style={{ textAlign: "center" }} >{transac.receiver_phone}</td>
                                                <td style={{ textAlign: "center" }} >{(transac.creation_date).slice(0, 10)}</td>
                                                <td style={{ textAlign: "center" }} >{(transac.creation_date).slice(11, 19)}</td>
                                                <td style={{ textAlign: "center" }} >{typeTransaction[transac.transaction_type_id]}</td>
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




};
export default View