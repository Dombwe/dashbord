import React, { useState, useRef, useEffect } from 'react';
import {
    Row, Col, Table
} from 'reactstrap';
import { Link } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import Widget from "../../components/Widget/Widget";
import 'react-toastify/dist/ReactToastify.css';
import s from './Etats.module.scss';
import TextField from "@mui/material/TextField";
import { PDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { useHistory } from 'react-router';
import { getTransactions, getFullTransactions } from "../../controller/transactions";
import { getFullAccounts, BlockedAccount, UnBlockedAccount } from "../../controller/accounts";
import { getUsers, resetCodePin, resetPassword } from "../../controller/users";

var IfBlockedAccount = {
    true: "Compte bloqué",
    false: "Compte non bloqué"
}

var typeTransaction = {
    1: "Dépot",
    2: "Transfert",
    3: "Achat",
    4: "Vente"
}
export const user = {
    'token': localStorage.getItem('token'),
    'name': localStorage.getItem('name'),
    'username': localStorage.getItem('username'),
    'contact': localStorage.getItem('contact'),
    'level': localStorage.getItem('level'),
    'authenticated': localStorage.getItem('authenticated'),
  };


function ListPartners() {



    const history = useHistory();
    const trans = getFullTransactions();
    const accounts = getFullAccounts();
    const users = getUsers();

    const [searchTerme, setSearchTerme] = useState('');
    const [accountSearchTerm, setAccountSearchTerm] = useState('');
    const [transSearchTerm, setTransSearchTerm] = useState('');
    const access = user.level.toLowerCase();

    console.log("***************user access*************************")
                                                    console.log(access)
                                                    console.log("***************user 2 access*************************")
                                                    console.log(access)
    

    const inputHandUsers = (e) => {

        var valeur = e.target.value;
        setSearchTerme(valeur);
    };

    const inputHandTrans = (e) => {

        var val = e.target.value;
        setTransSearchTerm(val);
    };

    const inputHandAccounts = (e) => {

        var vale = e.target.value;
        setAccountSearchTerm(vale);
    };
    trans.then((value) => {
        localStorage.setItem('transaction', JSON.stringify(value));

    });
    const res = JSON.parse(localStorage.getItem('transaction'));

    users.then((value) => {
        localStorage.setItem('users', JSON.stringify(value));
    });
    const respons = JSON.parse(localStorage.getItem('users'));

    accounts.then((value) => {

        localStorage.setItem('accounts', JSON.stringify(value));
    });

    const reponse = JSON.parse(localStorage.getItem('accounts'));
    

    const reloading = () => {
        setTimeout(() => {
            history.push('/app/administration/Partners/list');
            window.location.reload();

        }, 1000);
    }


    return (
        <div className={s.root}>
            {/* <meta http-equiv="refresh" content="2"></meta> */}
            <Row>
                <Col sm={12}>
                    <Widget
                        customDropDown
                        title={<p className={"fw-bold"}>Utilisateurs Intercash</p>}
                    >
                        <TextField id="filled-search" onChange={inputHandUsers} value={searchTerme} label="User Search" type="search" variant="filled" />

                        <Table className={"table-hover table-bordered table-striped table-lg mt-lg mb-0"} borderless responsive>
                            <div style={{ height: '500px', overflow: 'scroll' }}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center" }} >
                                            No
                                        </th>
                                        <th style={{ textAlign: "center" }} >
                                            Nom
                                        </th>
                                        <th style={{ textAlign: "center" }} >
                                            Prénom (s)
                                        </th>
                                        <th style={{ textAlign: "center" }} >
                                            Numéro
                                        </th>
                                        <th style={{ textAlign: "center" }} >
                                            Pays
                                        </th>
                                        <th style={{ textAlign: "center" }} >
                                            Points de fidélités
                                        </th>
                                        <th style={{ textAlign: "center" }} >
                                            Authenticated
                                        </th>
                                        <th style={{ textAlign: "center" }} >
                                            Compte(s)
                                        </th>
                                        <th style={{ textAlign: "center" }} >
                                            Commandes
                                        </th>
                                    </tr>
                                </thead>


                                <tbody className="text-dark">
                                    {
                                        // respons && respons.map((user, index) => {
                                        respons.filter(respons => searchTerme === "" || respons.last_name.toLowerCase().includes(searchTerme.toLowerCase()) || respons.first_name.toLowerCase().includes(searchTerme.toLowerCase()) || respons.country.toLowerCase().includes(searchTerme.toLowerCase())).map((user, index) => {

                                            return (
                                                <tr key={index++}>
                                                    <td scope='row'>{index}</td>
                                                    <td style={{ textAlign: "center" }} >{user.last_name}</td>
                                                    <td style={{ textAlign: "center" }} >{user.first_name}</td>
                                                    <td style={{ textAlign: "center" }} >{user.phone}</td>
                                                    <td style={{ textAlign: "center" }} >{user.country}</td>
                                                    <td style={{ textAlign: "center" }} >{user.fidelity_points}</td>
                                                    <td style={{ textAlign: "center" }} >{user.is_verified ? "Yes" : "No"}</td>
                                                    <td style={{ textAlign: "center" }} >{(user.has_classical_account && user.has_professional_account) ? " classique & Professionel" : (user.has_classical_account) ? "Compte classique" : "Compte Professionel"}</td>
                                                    <td className={"pl-0 fw-normal"}>
                                                    
                                                    {  
                                                    
                                                    access !== ("High").toLowerCase() ? 
                                                      <Link
                                                            to={`/App/pages/dashboard/userAccounts/id=${user.id}`}
                                                            style={{ fontSize: "20px", marginRight: "15px" }}><i class="text-success fa fa-plus-square"></i> <em>Accounts</em>
                                                      </Link>
                                                        :  
                                                        <div>
                                                        <Link
                                                            to={`/App/pages/dashboard/userAccounts/id=${user.id}`}
                                                            style={{ fontSize: "20px", marginRight: "15px" }}><i class="text-success fa fa-plus-square"></i> <em>Accounts</em>
                                                        </Link>
                                                        <Button onClick={() => resetPassword(user.id)} style={{ fontSize: "20px", marginRight: "15px" }}><i class="text-success fa fa-refresh"></i> <em>password</em> </Button>
                                                        <Button onClick={() => resetCodePin(user.id)} style={{ fontSize: "20px", marginRight: "15px" }}><i class="text-success fa fa-refresh"></i> <em>code pin</em> </Button>
                                                        </div>
                                                    }
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </div>

                        </Table>
                    </Widget>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <Widget
                        title={<p className={"fw-bold text-warning"}>Les comptes d'intercash</p>}
                    >
                        <TextField id="filled-search" label="Search Account"onChange={inputHandAccounts} value={accountSearchTerm} type=" Account search " variant="filled" />
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
                                            Utilisateur
                                        </th>
                                        <th kstyle={{ textAlign: "center" }}>
                                            Solde
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Commission
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Bonus
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Date Création
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Heure création
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Dernière opération
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Heure derniere opération
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Limite de transaction
                                        </th>

                                        <th style={{ textAlign: "center" }}>
                                            Type de compte
                                        </th>
                                        <th key={12} scope="col" className={"text-center pl-0"}>
                                            Statut
                                        </th>
                                        <th key={12} scope="col" className={"text-center pl-0"}>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-dark" style={{ overflow: 'auto' }}>

                                    {
                                        // reponse && reponse.map((account, index) => {
                                            reponse.filter(reponse => accountSearchTerm === "" || reponse.account_type_name.toLowerCase().includes(accountSearchTerm.toLowerCase())).map((account, index) => {
                                            return (
                                                <tr key={index++}>
                                                    <td scope='row'>{index}</td>
                                                    <td style={{ textAlign: "center" }}>{(account.id)}</td>
                                                    <td style={{ textAlign: "center" }}>{localStorage.getItem('name' + account.user_id) || 'Unknow'}</td>
                                                    <td style={{ textAlign: "center" }}>{account.amount}F CFA</td>
                                                    <td style={{ textAlign: "center" }}>{account.commission}F CFA</td>
                                                    <td style={{ textAlign: "center" }}>{account.bonus}F CFA</td>
                                                    <td style={{ textAlign: "center" }}>{(account.creation_date).slice(0, 10)}</td>
                                                    <td style={{ textAlign: "center" }}>{(account.creation_date).slice(11, 18)}</td>
                                                    <td style={{ textAlign: "center" }}>{(account.last_update).slice(0, 10)}</td>
                                                    <td style={{ textAlign: "center" }}>{(account.creation_date).slice(11, 18)}</td>
                                                    <td style={{ textAlign: "center" }}>{account.stop_amount}F CFA</td>
                                                    <td style={{ textAlign: "center" }}>{account.account_type_name}</td>
                                                    <td style={{ textAlign: "center" }}>{IfBlockedAccount[account.is_locked]}</td>
                                                    <td className={"pl-0 fw-normal"}>
                                                        {
                                                            account.is_locked ?
                                                                <Button if={!account.is_locked} onClick={() =>
                                                                    UnBlockedAccount(account.id)} style={{ fontSize: "20px", marginRight: "15px" }}><i class="text-success fa fa-check-circle"></i></Button>
                                                                :
                                                                <Button onClick={() =>
                                                                    BlockedAccount(account.id)} style={{ fontSize: "20px" }}><i class="text-danger fa fa-times-circle"></i></Button>
                                                        }

                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </div>
                        </Table>
                    </Widget>
                </Col>  
            </Row>
            <Row>
                <Col sm={12}>
                    <Widget
                        customDropDown
                        title={<p className={"fw-bold"}>Transactions</p>}
                    >
                        <TextField id="filled-search" label="Search transaction" onChange={inputHandTrans} value={transSearchTerm} type="search" variant="filled" />
                        <Table className={"table-hover table-bordered table-striped table-lg mt-lg mb-0"} borderless responsive>
                            <div style={{ height: '500px', overflow: 'scroll' }}>
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



                                <tbody className="text-dark">

                                    {
                                            res.filter(res => transSearchTerm === "").map((transac, index) =>{
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
                            </div>

                        </Table>
                    </Widget>
                </Col>
            </Row>
        </div>

    );

}

export default ListPartners;
