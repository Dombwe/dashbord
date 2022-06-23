import React  from "react";
import { Row, Col, Button } from "reactstrap";
import Widget from "../../../components/Widget";
import s from "./Event.module.scss";
import { getEvent } from "../../../controller/events";
import { useHistory, Link} from 'react-router-dom';

const View = () => {

    const history = useHistory()
    const url2 = history.location.pathname;
    var bon = "";

    for (var i = 0; i < url2.length; i++) {

        if (url2[i] === "=")
            bon = i;

    }
    const id = parseInt(url2.slice(bon + 1));

    var data = getEvent(id);
    data.then((value) => {
        localStorage.setItem('event', JSON.stringify(value));
    
      });
      var ev = JSON.parse(localStorage.getItem('event'));
    

    return (

        <div className={s.root}>
            <Row>
           
          
       
                <Col sm={12}>
                    <Widget
                        
                        title={<p className={"fw-bold text-warning"}>Event Details</p>}
                    >
                        
                        <Link to={`/app/administration/Tickets/addTicket/id=${id}`}>
            <Button className="text-warning" style={{ fontSize: "20px", marginBottom: "20px", background: "black", marginTop: "10px", marginLeft: "800px"}}> Create Ticket </Button>
          </Link>

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
                       
                <div className="container" style={{textAlign: "center"}}>
                     <strong>ID: </strong>
                     <span>{id} </span>
                     <br />
                     <br />
                     <strong>Name: </strong>
                     <span>{ev && ev.name} </span>
                     <br />
                     <br />
                     <strong>Organizer: </strong>
                     <span>{ev  && ev.organizer} </span>
                     <br />
                     <br />
                     <strong>Limit places : </strong>
                     <span>{ev && ev.limit_registration} </span>
                     <br />
                     <br />
                     <strong>Location: </strong>
                     <span>{ev && ev.location} </span>
                     <br />
                     <br />
                     <strong>City: </strong>
                     <span>{ev && ev.city} </span>
                     <br />
                     <br />
                     <strong>Start Date: </strong>
                     <span>{ev && ev.starting_date.slice(0, 10)} </span>
                     <br />
                     <br />
                     <strong>Start Hours: </strong>
                     <span>{ev && ev.starting_date.slice(11, 19)} </span>
                     <br />
                     <br />
                     <strong>End Date : </strong>
                     <span>{ev && ev.ending_date.slice(0, 10)} </span>
                     <br />
                     <br />
                     <strong>End Hours : </strong>
                     <span>{ev && ev.ending_date.slice(11, 19)} </span>
                     <br />
                     <br />
                     <strong>Publish Start Date: </strong>
                     <span>{ev && ev.publishing_start_date.slice(0, 10)} </span>
                     <br />
                     <br />
                     <strong>Publish End Date: </strong>
                     <span>{ev && ev.publishing_end_date.slice(0, 10)} </span>
                     <br />
                     <br />
                     <strong>Categorie: </strong>
                     <span>{ev && ev.category} </span>
                     <br />
                     <br />
                     <strong>Account ID: </strong>
                     <span>{ev && ev.account_id} </span>
                     <br />
                     <br />
                     <strong>Statut: </strong>
                     <span>{ev && ev.status} </span>
                     <br />
                     <br />
                     <br />
                     <br />
                     <Link to="/app/administration/event/list">
                         <button className="btn btn.edit">Go Back</button>
                     </Link>
                 </div>
                          
                    </Widget>
                </Col>
            </Row>
        </div>
    );




};
export default View