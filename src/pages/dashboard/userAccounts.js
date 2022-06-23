import React  from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../components/Widget";
import {Link} from "react-router-dom"
import s from "./Dashboard";
import { getAccountByUserId } from "../../controller/accounts";
import { useHistory} from 'react-router-dom';
import { BlockedAccount,UnBlockedAccount } from "../../controller/accounts";

var IfBlockedAccount = {
    true: "Compte bloqué",
    false: "Compte non bloqué"
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

    var accounts = getAccountByUserId(id);
        accounts.then((value) => {
     
        localStorage.setItem('accounts', JSON.stringify(value));
      });
  
       const response = JSON.parse(localStorage.getItem('accounts'));

    console.log('****************event true*******************');
    console.log(response); 
    

    return (

        <div className={s.root}>
            <Row>
                <Col sm={12}>
                    <Widget
                        customDropDown
                        title={<p className={"fw-bold text-warning"}>User Accounts</p>}
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
                                        <th style={{ textAlign: "center" }}>
                                            ID
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
                                        <th key={12} scope="col" className={"text-center pl-0"}>
                                        Historique
                                        </th>
                                </tr>
                                </thead>
                                <tbody className="text-dark" style={{ overflow: 'auto' }}>

                                {
                      response && response.map((account) => {
                        // this.getNameByUserId(account.user_id);
                        return (
                          <tr >
                           
                            <td style={{ textAlign: "center" }}>{(account.id)}</td>
                            <td style={{ textAlign: "center" }}>{account.amount}F CFA</td>
                            <td style={{ textAlign: "center" }}>{account.commission}F CFA</td>
                            <td style={{ textAlign: "center" }}>{account.bonus}F CFA</td>
                            <td style={{ textAlign: "center" }}>{(account.creation_date).slice(0, 10)}</td>
                            <td style={{ textAlign: "center" }}>{(account.creation_date).slice(11, 19)}</td>
                            <td style={{ textAlign: "center" }}>{(account.last_update).slice(0, 10)}</td>
                            <td style={{ textAlign: "center" }}>{(account.creation_date).slice(11, 19)}</td>
                            <td style={{ textAlign: "center" }}>{account.stop_amount}F CFA</td>
                            <td style={{ textAlign: "center" }}>{account.account_type_name}</td>
                            <td style={{ textAlign: "center" }}>{IfBlockedAccount[account.is_locked]}</td>
                            <td className={"pl-0 fw-normal"}>
                            {
                              account.is_locked ?
                                <Button if={!account.is_locked} onClick={() => 
                                  UnBlockedAccount(account.id)} style={{fontSize:"20px", marginRight:"15px"}}><i class="text-success fa fa-check-circle"></i></Button>
                              : 
                                <Button onClick={() => 
                                  BlockedAccount(account.id)} style={{fontSize:"20px"}}><i class="text-danger fa fa-times-circle"></i></Button>
                            }
                            </td>  
                            <td>
                            <Link 
                            to={`/App/pages/dashboard/accountActivity/id=${account.id}`} 
                            style={{fontSize:"20px", marginRight:"15px"}}><i class="text-success fa fa-plus-square"></i> <em>Activity</em> 
                            </Link>
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




};
export default View