import React, { useState } from "react";
import { Row, Col, Button} from "reactstrap";
import { Link } from "react-router-dom";
import s from "./Event.module.scss";
import { toast } from "react-toastify";
import {createEvent}  from "../../../controller/events";

const initialState = {
  name: "",
  organizer: "",
  limit_registration: "",
  country: "",
  city: "",
  district: "",
  location: "",
  starting_date: "",
  ending_date: "",
  publishing_start_date: "",
  publishing_end_date: "",
  description: "",
  phone: "",
  category: "",
  account_id: "",
  username: "",
  password: "",
  locality: "",
  activity_area: "",

}


function AddEvent() {

 var [state, setState] = useState(initialState);

  const { name, organizer, limit_registration, country, city, district, location, starting_date, ending_date, description, phone, category, account_id, publishing_start_date, publishing_end_date} = state;
  var user_id;
  
  const handleInputChange = (e) => {

    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    if (!name || !organizer ||!limit_registration || !country || !city || !district || !location ||  !starting_date || !ending_date || !description || !category || !account_id || !publishing_start_date || !publishing_end_date) {
      toast.error("Please provide value into each input field");
    }
    else {
      state.username = state.name+"_"+state.account_id;
      state.password = (state.name).slice(0,2)+"@"+state.user_id+"@";
      state.locality = state.country+state.city+state.district;
      state.activity_area = state.category;
      createEvent(state);
    }
  };


  return (
    <div className={s.root}>
      <Row>
        <Col sm={10} className="text-align:right"></Col>
        <Col sm={2} className="text-align:right">
          <Link to="/app/administration/event/list">
            <Button className="text-warning" style={{ fontSize: "20px", marginBottom: "10px", background: "black" }}> Event list </Button>
          </Link>
        </Col>
      </Row>
      <div className="form-group text-center">
        <h6>CREATION D'ADMINISTRATEUR INTERCASH</h6>
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
                htmlFor="name">
                <strong>Name :</strong>
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
                type="text"
                id="name"
                name="name"
                placeholder="Enter name ..."
                onChange={handleInputChange}
                value={name}

              />
            </td>
          </tr>

          <tr >
            <td>
              <label htmlFor="organizer"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              ><strong>organizer : </strong> </label>
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
                type="text"
                id="organizer"
                name="organizer"
                placeholder="Enter the name of organizer ..."
                onChange={handleInputChange}
                value={organizer}

              />
            </td>
          </tr>

          <tr >
            <td>
              <label htmlFor="user_id"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              ><strong>User ID : </strong></label>
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
                type="text"
                id="user_id"
                name="user_id"
                placeholder="Enter the name of organizer ..."
                onChange={handleInputChange}
                value={user_id}

              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="limit_registration"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong>limit registration :</strong> </label>
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
                id="limit_registration"
                name="limit_registration"
                placeholder="Enter places available"
                onChange={handleInputChange}
                value={limit_registration}

              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="country"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong>Event country :</strong> </label>
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
                type="text"
                id="country"
                name="country"
                placeholder="Enter country"
                onChange={handleInputChange}
                value={country}

              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="city"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong>Event city :</strong> </label>
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
                type="text"
                id="city"
                name="city"
                placeholder="Enter city"
                onChange={handleInputChange}
                value={city}

              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="district"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong>Event district :</strong> </label>
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
                type="text"
                id="district"
                name="district"
                placeholder="Enter district"
                onChange={handleInputChange}
                value={district}

              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="location"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong>Event location :</strong> </label>
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
                type="text"
                id="location"
                name="location"
                placeholder="Enter location"
                onChange={handleInputChange}
                value={location}

              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="description"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong> Description :</strong> </label>
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
                type="text"
                id="description"
                name="description"
                placeholder="give description of event"
                onChange={handleInputChange}
                value={description}

              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="starting_date"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong>Event starting date :</strong> </label>
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
                type="date"
                id="starting_date"
                name="starting_date"
                placeholder="Enter starting date"
                onChange={handleInputChange}
                value={starting_date}

              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="ending_date"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong>Event ending date :</strong> </label>
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
                type="date"
                id="ending_date"
                name="ending_date"
                placeholder="Enter ending date"
                onChange={handleInputChange}
                value={ending_date}

              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="phone"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong> Number :</strong> </label>
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
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                onChange={handleInputChange}
                value={phone}

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
                <option value="Concert" >Concert</option>
                <option value="Gala" >Gala</option>
                <option value="Kermesse" >Kermesse</option>
                <option value="Sortie" >Sortie</option>
                <option value="Autre" >Autre</option>
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

          <tr>
            <td>
              <label htmlFor="publishing_start_date"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong>Début de publication :</strong></label>
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
                type="date"
                id="publishing_start_date"
                name="publishing_start_date"
                placeholder="Enter la date pour le début de la publication ..."
                value={publishing_start_date}
                onChange={handleInputChange}

              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="publishing_end_date"
                style={{
                  marginTop: "40px",
                  marginRight: "50px",
                }}
              > <strong>Fin de publication :</strong></label>
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
                type="date"
                id="publishing_end_date"
                name="publishing_end_date"
                placeholder="Enter la  date de fin de la publication ..."
                value={publishing_end_date}
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
            type="submit" value={"Add Event"} />
        </form>
        <br />

      </div>
    </div>
  )
}

export default AddEvent;
