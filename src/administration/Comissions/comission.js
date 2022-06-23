import React, { useRef, useState } from 'react';
import {
    Row, Col, Table,
} from 'reactstrap';
import stocksImg from "../../images/stocks.svg";
import { Link } from "react-router-dom";
import Widget from "../../components/Widget/Widget";
import 'react-toastify/dist/ReactToastify.css';
import s from './comission.module.scss';
import { mainAccount } from "../../controller/accounts";
import { Button } from "@progress/kendo-react-buttons";
import { getFullTransactions } from "../../controller/transactions";
import { getTransactions } from "../../controller/transactions";
import { conditionallyUpdateScrollbar } from 'reactstrap/lib/utils';
import { tabUnstyledClasses } from '@mui/base';
import { resetMooveMoneyAmount, resetOrangeMoneyAmount } from "../../controller/accounts";

const initialState = {
    choix: "all",
};
export var comis;
let commissionJour = 0, commissionMois = 0, commissionSemaine = 0, commissionAn = 0, depotOrangeMoney = 0, depotMoovMoney = 0, retraitOrangeMoney = 0, retraitMoovMoney = 0;



const isToday = (date) => {
    const aggg = new Date(date);
    const now = new Date();
    return aggg.getDate() === now.getDate() && aggg.getMonth() === now.getMonth() && aggg.getFullYear() === now.getFullYear()
}

const isWeek = (date) => {

    var todayDate = new Date(), weekDate = new Date();
    weekDate.setTime(todayDate.getTime() - (7 * 24 * 3600000));
    if (parseInt(new Date(date).getDate()) === parseInt(weekDate.getDate()) && parseInt(new Date(date).getMonth()) === parseInt(weekDate.getMonth()) && parseInt(new Date(weekDate).getFullYear()) === parseInt(new Date(date).getFullYear())) {
        return true
    } else { return false }

}
const  comprisDate = (startingDate, endingDate) =>{

    var status = new Boolean(false);
  
    const now = Date.now();
    var startingDate = new Date(startingDate);
    var endingDate = new Date(endingDate);
  
    // if((_startingDate!.compareTo(now) < 0 && _endingDate!.compareTo(now) > 0) || (_startingDate.isToday || _endingDate!.isToday)) 
    // {
    //   status = true;     
    // }
    return status;
  }

  const user = {
    'token': localStorage.getItem('token'),
    'name': localStorage.getItem('name'),
    'username': localStorage.getItem('username'),
    'contact': localStorage.getItem('contact'),
    'level': localStorage.getItem('level'),
    'authenticated': localStorage.getItem('authenticated'),
  };
  

function Comission() {
    const [state, setState] = useState(initialState);
    const promise = mainAccount();
    const promis = getTransactions();
    const { choix } = state;
    const handleInputChange = (e) => {

        let { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    }

     
      
    promise.then((value) => {
        localStorage.setItem('commissions', JSON.stringify(value));

    });
    const comme = JSON.parse(localStorage.getItem('commissions'));

    promis.then((value) => {
        localStorage.setItem('transactions', JSON.stringify(value));
    })
    const transactio = JSON.parse(localStorage.getItem('transactions'));

    // depotMoovMoney = 0.0;
    // depotOrangeMoney = 0.0;
    // retraitMoovMoney = 0.0;
    // retraitOrangeMoney = 0.0;

    transactio && transactio.map((trans) => {

        if (trans.is_orange_deposit) {
            depotOrangeMoney = parseFloat(depotOrangeMoney) + parseFloat(trans.amount);
        } else if (trans.is_moov_deposit) {
            depotMoovMoney = parseFloat(depotMoovMoney) + parseFloat(trans.amount);
        } else if (trans.is_orange_withdrawal) {
            retraitOrangeMoney = parseFloat(retraitOrangeMoney) + parseFloat(trans.amount);
        } else if (trans.is_moov_withdrawal) {
            retraitMoovMoney = parseFloat(retraitMoovMoney) + parseFloat(trans.amount);
        }
        console.log("*******************les statistiques********************");
        console.log(depotMoovMoney);
        console.log(depotOrangeMoney);
        console.log(retraitMoovMoney);
        console.log(retraitOrangeMoney);

    })

    promis.then((value) => {
        localStorage.setItem('transactions', JSON.stringify(value));
    })
    const transaction = JSON.parse(localStorage.getItem('transactions'));

    comis = 0;
    commissionJour = 0;
    commissionSemaine = 0.0
    commissionMois = 0.0;
    commissionAn = 0.0;
    // depotMoovMoney = 0.0;
    // depotOrangeMoney = 0.0;
    // retraitMoovMoney = 0.0;
    // retraitOrangeMoney = 0.0;



    transaction && transaction.map((trans, index) => {
        // eslint-disable-next-line default-case
        switch (choix) {
            case "jour":

                if (isToday(trans.creation_date)) {
                    commissionJour += trans.commission;
                }

                break;

            case "semaine":
                var todayDate = new Date(), weekDate = new Date();
                weekDate.setTime(todayDate.getTime() - (7 * 24 * 3600000));
                if (parseInt(new Date(trans.creation_date).getDate()) === parseInt(weekDate.getDate()) && parseInt(new Date(trans.creation_date).getMonth()) === parseInt(weekDate.getMonth()) && parseInt(new Date(trans.creation_date).getFullYear()) === parseInt(new Date(trans.creation_date).getFullYear())) { commissionSemaine += trans.commission; }
                break;

            case "mois":
                var nowMonth = new Date().getMonth();
                var nowYear = new Date().getFullYear();
                var transMonth = new Date(trans.creation_date).getMonth();
                var transYear = new Date(trans.creation_date).getFullYear()
                if (nowMonth === transMonth && nowYear === transYear) { commissionMois += trans.commission; }

                break;

            case "an":
                var transYear = new Date(trans.creation_date).getFullYear();
                var todayYear = new Date().getFullYear();
                if (parseInt(transYear) === parseInt(todayYear)) { commissionAn += trans.commission; }

                break;


        }
        comis = comis + trans.commission;
    })


    return (
        <div className={s.root}>
            <select
                style={{
                    marginTop: "30px",
                    marginLeft: "450px",
                    marginBottom: "50PX",
                    padding: "3px",
                    border: "1px solid #F5C5C5",
                    borderRadius: "5px",
                    width: "200px",
                    boxShadow: "1px 1px 2px #C0C0C0 inset",
                }}
                id="choix" name="choix"
                value={choix}
                onChange={handleInputChange}

            >
                <option value="" >Filtrer les données</option>
                <option value="all" >All</option>
                <option value="jour" >Filtre journalier</option>
                <option value="semaine" >Filtre hebdomadaire</option>
                <option value="mois" >Filtre mensuel</option>
                <option value="an" >Filtre annuel</option>
            </select>
            <Row>

                <Col sm={12} className="text-align:right"></Col>

            </Row>
            <Row>
                <Col sm={12}>
                    <Widget
                        // customDropDown
                        title={<p className={"fw-bold text-warning"}>COMISSION INTERCASH</p>}
                    >

                        <div className="main" style={{
                            display: "flex",
                            height: "100 vh",
                            width: "100%",
                            alignItems: "center",
                            flexDirection: "column",
                            rowGap: "100px",
                        }}>

                        </div>


                        <Table className={"table-hover table-bordered table-striped table-lg mt-lg mb-0"} borderless responsive>
                            <thead>
                                <tr>
                                <th key={1} scope="col" className={"text-center pl-0"}>
                                        Partenaires
                                    </th>
                                    <th key={1} scope="col" className={"text-center pl-0"}>
                                        Rétraits
                                    </th>
                                    <th key={2} scope="col" className={"text-center pl-0"}>
                                        Dépots
                                    </th>
                                    <th key={3} scope="col" className={"text-center pl-0"}>
                                       Total
                                    </th>
                                    <th key={3} scope="col" className={"text-center pl-0"}>
                                        Commandes
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-dark">
                                {
                                    comme.map((com, index) => {
                                        return (
                                            <tr key={index++}>

                                                
                                                <td className={"pl-0 fw-normal text-center"}><strong><em>Orange Money</em></strong></td>
                                                <td className={"pl-0 fw-normal text-center"}>{retraitOrangeMoney} F CFA</td>
                                                <td className={"pl-0 fw-normal text-center"}>{depotOrangeMoney} F CFA</td>
                                                <td className={"pl-0 fw-normal text-center"}>{com.orange_money_amount} F CFA</td>
                                                <td className={"pl-0 fw-normal text-center"}>
                                                <Button  style={{ fontSize: "20px", marginRight: "15px" }}><i class="text-success fa fa-plus"></i> <em>Increase</em></Button>

                                                <Button  style={{ fontSize: "20px", marginRight: "15px" }}><i class="text-success fa fa-minus"></i> <em>Decrease</em> </Button>
                                                </td>
                                               
                                            </tr>

                                        );
                                    })
                                    
                                }
                            </tbody>


                            <tbody className="text-dark">
                                {
                                    comme.map((com, index) => {
                                        return (
                                            <tr key={index++}>

                                                
                                                <td className={"pl-0 fw-normal text-center"}><strong><em>Moov Money</em></strong></td>
                                                <td className={"pl-0 fw-normal text-center"}>{retraitMoovMoney} F CFA</td>
                                                <td className={"pl-0 fw-normal text-center"}>{depotMoovMoney} F CFA</td>
                                                <td className={"pl-0 fw-normal text-center"}>{com.moov_money_amount} F CFA</td>
                                                <td className={"pl-0 fw-normal text-center"}>
                                                <Button  style={{ fontSize: "20px", marginRight: "15px" }}><i class="text-success fa fa-plus"></i> <em>Increase</em></Button>
                                                <Button  style={{ fontSize: "20px", marginRight: "15px" }}><i class="text-success fa fa-minus"></i> <em>Decrease</em> </Button>
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
            
            <Row>
                
                <Col xl={6} style={{ marginLeft: "250px"}}>
                    <Widget
                        title={<p style={{ fontWeight: 700 }}>Montant de la commission d'INTERCASH</p>}
                    >
                        <Row className={`justify-content-between mt-3`} noGutters>
                            <Col sm={8} className={"d-flex align-items-center"}>

                                <h6 className={"fw-semi-bold mb-0"}>
                                    {
                                        choix === "all" ? comis
                                            : choix === "jour" ? commissionJour
                                                : choix === "semaine" ? commissionSemaine
                                                    : choix === "mois" ? commissionMois
                                                        : commissionAn
                                    } F CFA
                                    : 
                                </h6>


                                {/* <h6 className={"fw-semi-bold mb-0"}>{(choix === "all")?{comis} :(choix === "jour" )?{commissionJour}:(choix === "semaine" )? {commissionSemaine} : (choix === "mois")?{commissionMois}:{commissionAn} }F CFA</h6> */}

                            </Col>
                        </Row>
                    </Widget>
                </Col>
            </Row>
        </div>
    );

}

export default Comission;
