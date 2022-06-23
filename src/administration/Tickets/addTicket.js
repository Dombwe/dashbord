import React, { useState } from "react";
import { Row, Col, Button} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import s from "./ticket.module.scss";
import { toast } from "react-toastify";
import {createTicket}  from "../../controller/ticket";

const initialState = {
        price: "",
        commission: "",
        category:"",  
        total_ticket: "",
        event_id:"",
        movie_id: "",
        is_valid: "",
        account_id:"",
}



function AddEvent() {

 var [state, setState] = useState(initialState);
 const history = useHistory()
 const url2 = history.location.pathname;
 var bon = "";

 for (var i = 0; i < url2.length; i++) {

     if (url2[i] === "=")
         bon = i;

 }
 const id = parseInt(url2.slice(bon + 1));
  const {
    price,
    commission,
    category,  
    total_ticket,
    event_id,
    movie_id,
    is_valid,
    account_id
   } = state;
  
  
  const handleInputChange = (e) => {

    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  console.log(state);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!price || !category ||  !total_ticket || !account_id)  {
      toast.error("Please provide value into each input field");
    }
    else {
        state.movie_id = 0;
        state.is_valid = true;
        state.event_id = id;
        createTicket(state);
    }
  };


  return (
    <div className={s.root}>
      <Row>
        <Col sm={10} className="text-align:right"></Col>
        <Col sm={2} className="text-align:right">
          <Link to={`/app/administration/event/list/ticketsEvent/id=${id}`}>
            <Button className="text-warning" style={{ fontSize: "20px", marginBottom: "10px", background: "black" }}>Ticket list </Button>
          </Link>
        </Col>
      </Row>
      <div className="form-group text-center">
        <h6>CREATION D'UN TICKET</h6>
        <form

          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "500px",
            alignContent: "center",
            color: "#DF3F3F",
            fontWeight: "bold",
            backgroundColor: "#FFF3F3"



          }}
          onSubmit={handleSubmit}
        >

          <tr>
            <td>
              <label
                style={{
                  marginTop: "10px",
                  marginRight: "50px",
                }}
                htmlFor="price">
                <strong>Prix :</strong>
              </label>
            </td>
            <td>
              <input
                style={{
                  padding: "3px",
                  border: "1px solid #F5C5C5",
                  borderRadius: "5px",
                  width: "200px",
                  boxShadow: "1px 1px 2px #C0C0C0 inset",
                }}
                type="number"
                id="price"
                name="price"
                placeholder="Enter price ..."
                onChange={handleInputChange}
                value={price}

              />
            </td>
          </tr>

          <tr >
            <td>
              <label htmlFor="commission"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              ><strong>Commission : </strong> </label>
            </td>
            <td>
              <input
                style={{
                  marginTop: "40px",
                  padding: "3px",
                  border: "1px solid #F5C5C5",
                  borderRadius: "5px",
                  width: "200px",
                  boxShadow: "1px 1px 2px #C0C0C0 inset",
                }}
                type="number"
                id="commission"
                name="commission"
                placeholder="Enter commission ..."
                onChange={handleInputChange}
                value={commission}

              />
            </td>
          </tr>

          {/* <tr >
            <td>
              <label htmlFor="event_id"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              ><strong>Event  ID : </strong></label>
            </td>
            <td>
              <input
                style={{
                  marginTop: "40px",
                  padding: "3px",
                  border: "1px solid #F5C5C5",
                  borderRadius: "5px",
                  width: "200px",
                  boxShadow: "1px 1px 2px #C0C0C0 inset",
                }}
                type="number"
                id="event_id"
                name="event_id"
                placeholder="Enter the name of organizer ..."
                onChange={handleInputChange}
                value={event_id}

              />
            </td>
          </tr> */}

         

          <tr>
            <td>
              <label htmlFor="total_ticket"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong> Nombre de ticket :</strong> </label>
            </td>
            <td>
              <input
                style={{
                  marginTop: "40px",
                  padding: "3px",
                  border: "1px solid #F5C5C5",
                  borderRadius: "5px",
                  width: "200px",
                  boxShadow: "1px 1px 2px #C0C0C0 inset",
                }}
                type="number"
                id="total_ticket"
                name="total_ticket"
                placeholder="Enter total ticket..."
                onChange={handleInputChange}
                value={total_ticket}

              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="category"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong>category :</strong></label>
            </td>
            <td>
              <select
                style={{
                  marginTop: "40px",
                  padding: "3px",
                  border: "1px solid #F5C5C5",
                  borderRadius: "5px",
                  width: "200px",
                  boxShadow: "1px 1px 2px #C0C0C0 inset",
                }}
                id="category" name="category"
                value={category}
                onChange={handleInputChange}
              >
                <option value="VIP" >VIP</option>
                <option value="STANDARD" >STANDARD</option>
                <option value="GRATUIT" >GRATUIT</option>
              </select>
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="account_id"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong>ID Compte :</strong></label>
            </td>
            <td>
              <input
                style={{
                  marginTop: "40px",
                  padding: "3px",
                  border: "1px solid #F5C5C5",
                  borderRadius: "5px",
                  width: "200px",
                  boxShadow: "1px 1px 2px #C0C0C0 inset",
                }}
                type="number"
                id="account_id"
                name="account_id"
                placeholder="Enter L'ID du compte ..."
                value={account_id}
                onChange={handleInputChange}

              />
            </td>
          </tr>

          
          
          <input
            style={{
              marginTop: "40px",
              width: "100px",
              marginLeft: "5px",
              boxShadow: "1px 1px 1px #D83F3D",
              cursor: "pointer",
            }}
            type="submit" value={"Add Ticket"} />
        </form>
        <br />

      </div>
    </div>
  )
}

export default AddEvent;
