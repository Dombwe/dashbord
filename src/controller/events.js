import axios from 'axios';
import { BASE_URL, HEADERS } from "../config/http";
import { toast } from "react-toastify";



const route = '/events0';




export async function getEvents() {
  const url = BASE_URL + `${route}`;
  const response = await axios.get(url, { headers: HEADERS });
  if (response.status === 200) {
    if (response.data.status === true) {
      return response.data.data;
    }
    else {
      return response.data.message;
    }
  }
}

export async function getEvent(id) {
  const url = BASE_URL + `${route}/${id}`;
  const response = await axios.get(url, {headers: HEADERS});
  if (response.status === 200) {
    if (response.data.status === true) {
      return response.data.data;
    }
    else {
      return response.data.message;
    }
  }
}


export async function createEvent(event) {
  const url = BASE_URL + `${route}/`;
  console.log('*****************event*********************');
  console.log(event);
  toast.success("Event will be able to add");
  const response = await axios.post(url,
    {
      "name": event.name,
      "organizer": event.organizer,
      "limit_registration": event.limit_registration,
      "country": event.country,
      "city": event.city,
      "district": event.district,
      "location": event.location,
      "starting_date": event.starting_date,
      "ending_date": event.ending_date,
      "publishing_start_date": event.publishing_start_date,
      "publishing_end_date": event.publishing_end_date,
      "description": event.description,
      "phone": event.phone,
      "category": event.category,
      "account_id": event.account_id,
      "username": event.username,
      "password": event.password,
      "locality": event.locality,
      "activity_area": event.activity_area,
    }, { headers: HEADERS });

    if (response.status === 200) {
      
      if (response.data.status === true) {
        toast.success("Event added successfully");
        return response.data.data;
      }
      else {
        return response.data.message;
      }
    }
}

export async function getEventByName(eventName) {
  const url = BASE_URL + `${route}/getEventByName/${eventName}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response;
  }
}

export async function getEventByAccountId(accountId) {
  const url = BASE_URL + `${route}/getEventByAccountId/${accountId}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response;
  }
}

export async function validateEvent(eventId) {
  if (window.confirm('Are you sure you want to validate this event ?')) {
    const url = BASE_URL + `${route}/validate/${eventId}`;
    const response = await axios.put(url, {}, { headers: HEADERS });
    if (response.status === 200) {
      toast.success("Event Validated successfully");
      return response;
    }
  }

}

export async function deniedEvent(eventId) {
  if (window.confirm('Are you sure you want to denie this event ?')) {
    const url = BASE_URL + `${route}/denied/${eventId}`;
    const response = await axios.put(url, {}, { headers: HEADERS });
    console.log("............................................");
    console.log("Authorisation", HEADERS)
    if (response.status === 200) {
      toast.success("Event denied successfully");
      return response;
    }
  }

}

export async function changeStatus(eventId, eventStatus) {
  const url = BASE_URL + `${route}/changeStatus/${eventId}/${eventStatus}`;
  const response = await axios.put(url, {});
  if (response.status === 200) {
    return response;
  }
}

export async function updateEvent(event) {
  const url = BASE_URL + `${route}/updateEvent/${event.id}`;
  const response = await axios.put(url,
    {
      "name": event.name,
      "organizer": event.organizer,
      "limit_registration": event.limit_registration,
      "country": event.country,
      "city": event.city,
      "district": event.district,
      "location": event.location,
      "starting_date": event.starting_date,
      "ending_date": event.ending_date,
      "publishing_start_date": event.publishing_start_date,
      "publishing_end_date": event.publishing_end_date,
      "description": event.description,
      "phone": event.phone,
      "category": event.category,
      "account_id": event.account_id,
    }
  );
  if (response.status === 200) {
    return response;
  }
}

export async function deleteEvent(id) {
  const url = BASE_URL + `${route}/${id}`;
  const response = await axios.delete(url);
  if (response.status === 200) {
    return response;
  }
}

