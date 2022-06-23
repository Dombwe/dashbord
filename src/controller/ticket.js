import axios from "axios";
import {BASE_URL, HEADERS} from "../config/http";
import {toast} from "react-toastify";
const route = "/tickets0";




  export async function createTicket(ticket) {
  console.log('*****************ticket*********************');
  console.log(ticket);
  toast.success("ticket will be able to add");
    const url = BASE_URL+`${route}/`;
    const response = await axios.post(url,{
        "price": ticket.price,
        "category": ticket.category,
        "commission": ticket.commission,
        "is_valid": ticket.is_valid,
        "total_ticket": ticket.total_ticket,
        "event_id": ticket.event_id,
        "movie_id": ticket.movie_id,
        "account_id": ticket.account_id,
    }, { headers:HEADERS });
    if (response.status === 200) {
      if (response.data.status === true) {
        toast.success("Ticket added successfully");
        return response.data.data;
      }
      else {
        return response.data.message;
      }
    }
  }


  export async function getTickets () {
    const url = BASE_URL+`${route}/`;
    const response = await axios.get(url,{headers:HEADERS});
    if (response.status === 200 && response.data.status === true) {
        return response.data.data;
    }
  }

  export async function getTicketById (id) {
    const url = BASE_URL+`${route}/${id}`;
    const response = await axios.get(url);
    if (response.status === 200) {
        return response;
    }
  }

  export async function getTicketByName (name) {
    const url = BASE_URL+`${route}/getTicketByName/${name}`;
    const response = await axios.get(url);
    if (response.status === 200) {
        return response;
    }
  }

  export async function getTicketByCategory (category) {
    const url = BASE_URL+`${route}/getTicketByCategory/${category}`;
    const response = await axios.get(url);
    if (response.status === 200) {
        return response;
    }
  }

  export  async function getTicketByEventId(eventId) {
    const url = BASE_URL+`${route}/findAllTicketsByEventId/${eventId}`;
    const response = await axios.get(url,{headers:HEADERS});
    if (response.status === 200) {
      if (response.data.status === true) {
          return response.data.data;
      } else {
          return response.data.message;
      }
  }
  }

  export async function getTicketByAccountId(accountId) {
    const url = BASE_URL+`${route}/getTicketByAccountId/${accountId}`;
    const response = await axios.get(url);
    if (response.status === 200) {
        return response;
    }
  }

  export async function getTotalTickets(ticketId) {
    const url = BASE_URL+`${route}/getTotalTickets/${ticketId}`;
    const response = await axios.get(url);
    if (response.status === 200) {
        return response;
    }
  }
  
  export async function getTotalTicketsSold(ticketId) {
    const url = BASE_URL+`${route}/getTotalTicketsSold/${ticketId}`;
    const response = await axios.get(url);
    if (response.status === 200) {
        return response;
    }
  }

  export async function increaseTotalTickets(ticketId, ticketNumber) {
    const url = BASE_URL+`${route}/increaseTotalTickets/${ticketId}/${ticketNumber}`;
    const response = await axios.get(url);
    if (response.status === 200) {
        return response;
    }
  }

  export async function increaseTotalTicketsSold(ticketId, ticketNumber) {
    const url = BASE_URL+`${route}/increaseTotalTicketsSold/${ticketId}/${ticketNumber}`;
    const response = await axios.get(url);
    if (response.status === 200) {
        return response;
    }
  }
  
  export async function updateTicket(ticket) {
    const url = BASE_URL+`${route}/${ticket.id}`;
    const response = await axios.put(url,{
        "price": ticket.price,
        "number": ticket.number,
        "creationDate": ticket.creationDate,
        "category": ticket.category,
        "isValid": ticket.isValid,
        "totalTicket": ticket.totalTicket,
        "totalSold": ticket.totalSold,
        "eventId": ticket.eventId,
        "movieId": ticket.movieId,
        "accountId": ticket.accountId,
    });
    if (response.status === 200) {
        return response;
    }
  }
  