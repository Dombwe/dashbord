import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import 'react-toastify/dist/ReactToastify.css';
import s from './ticket.module.scss';
import { Row, Col, Button} from "reactstrap";
import {Link} from "react-router-dom";

import {getTickets} from '../../controller/ticket';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>({
    table: {
        minWidth:650,
    },
    tableContainer: {
        borderRadius:15,
        margin: "10px 10px",
        maxWidth: 950,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color:theme.palette.getContrastText(theme.palette.primary.dark),
    }
}));






function Comission() {

    const promise = getTickets();
    const classes = useStyles();
    

    promise.then((value) => {
        localStorage.setItem('tickets',JSON.stringify(value));
      });
      const ticket = JSON.parse(localStorage.getItem('tickets'));

    return (
        <div className={s.root}>
          {/* <Row>
        <Col sm={10} className="text-align:right"></Col>
        <Col sm={2} className="text-align:right">
          <Link to="/app/administration/Tickets/addTicket">
            <Button className="text-warning" style={{ fontSize: "20px", marginBottom: "10px", background: "black" }}> Create Ticket </Button>
          </Link>
        </Col>
      </Row> */}
    <TableContainer component={Paper} className={classes.TableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell} >ID</TableCell>
            <TableCell className={classes.tableHeaderCell} >Prix</TableCell>
            <TableCell className={classes.tableHeaderCell} >Categorie</TableCell>
            <TableCell className={classes.tableHeaderCell} >Number</TableCell>
            <TableCell className={classes.tableHeaderCell} >Date</TableCell>
            <TableCell className={classes.tableHeaderCell} >Event</TableCell>
            <TableCell className={classes.tableHeaderCell} >Compte</TableCell>
            <TableCell className={classes.tableHeaderCell} >Acheter ?</TableCell>
            <TableCell className={classes.tableHeaderCell} >Utiliser ?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ticket && ticket.map((ticket) => (
            <TableRow >
              <TableCell >{ticket.id}</TableCell>
              <TableCell >{ticket.price} F CFA</TableCell>
              <TableCell >{ticket.category}</TableCell>
              <TableCell >{ticket.number}</TableCell>
              <TableCell >
                  {(ticket.creation_date).slice(0,10)}
                  <br/>
                  {(ticket.creation_date).slice(11, 16)}    
              </TableCell>
              <TableCell >{ticket.event_id}</TableCell>
              <TableCell >{ticket.account_id}</TableCell>
              <TableCell >{(ticket.is_buy)?"Yes":"No"}</TableCell>
              <TableCell >{(ticket.is_used)? "Yes" : "No"}</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );

}

export default Comission;
