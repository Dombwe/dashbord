import axios from 'axios';
import {toast} from "react-toastify";
import {BASE_URL, HEADERS} from "../config/http";


const route = '/users0';
export var hasProfessionalAccount = {
    0: "Classique",
    1: "Professionnel"
  }

  export var statusName = {
    0 : "Désactivé",
    1 : "Actif"
  };

 

  export  async function getUsers () {
    const url = BASE_URL+`${route}`;
    const response = await axios.get(url,{headers:HEADERS});
        if (response.status === 200) {
            if (response.data.status === true) {
                return response.data.data;
            } else {
                return response.data.message;
            }
        }
  }
 
  export async function addUser(user)  {
    const url = BASE_URL+`${route}/`;
    const response = await axios.put(url, {
        "lastName": user.lastName,
        "firstName": user.firstName,
        "password": user.password,
        "codePin": user.codePin,
        "phone": user.phone,
        "country": user.country,
    });

    if (response.status === 200) 
        return response;   
}

export async function getUsersMinim () {
    const url = BASE_URL+`${route}/findAllMin`;
    const response = await axios.get(url,{headers:HEADERS});
        if (response.status === 200) {
            return response;
        }
  }

  export async function getUsersById (id) {
    const url = BASE_URL+`${route}/${id}`;
    const response = await axios.get(url,{headers:HEADERS});
        if (response.status === 200) {
            return response;
        }
  }

  export async function getFullNameByUserId (userId) {
  const url = BASE_URL+`${route}/getFullNameByUserId/${userId}`;
  const response = await axios.get(url,{headers:HEADERS});
      if (response.status === 200) {
          return response;
      }
}

export async function BlockedUser (userId) {
    const url = BASE_URL+`${route}/lockUser/${userId}`;
    const response = await axios.get(url,{headers:HEADERS});
        if (response.status === 200) {
            return response;
        }
  }

  
export async function UnBlockedUser (userId) {
    const url = BASE_URL+`${route}/unLockUser/${userId}`;
    const response = await axios.get(url,{headers:HEADERS});
        if (response.status === 200) {
            return response;
        }
  }

export async function getFullNameByAccountId (accountId) {
    const url = BASE_URL+`${route}/getFullNameByAccountId/${accountId}`;
    const response = await axios.get(url,{headers:HEADERS});
        if (response.status === 200) {
            return response;
        }
  }

  export async function getFidelityPointsByUserId(userId) {
    const url = BASE_URL+`${route}/getFidelityPointsByUserId/${userId}`;
    const response = await axios.get(url);
        if (response.status === 200) {
            return response;
        }
  }
 
  export async function getUserByPhoneNumber(phone) {
    const url = BASE_URL+`${route}/getUserByPhoneNumber/${phone}`;
    const response = await axios.get(url);
        if (response.status === 200) {
            return response;
        }
  }

  export async function verifyPhoneNumber(phone) {
    const url = BASE_URL+`${route}/verifyPhoneNumber/${phone}`;
        const response = await axios.get(url);
        if (response.status === 200) {
            return response;
        }
  }

  export async function convertFidelityPointsToMoney(userId) {
    const url = BASE_URL+`${route}/convertFidelityPointsToMoney/${userId}`;
    const response = await axios.get(url);
        if (response.status === 200) {
            return response;
        }
  }

  export async function updateFirstName(id, firstName) {
    const url = BASE_URL+`${route}/updateFirstName/${id}/${firstName}`;
    const response = await axios.put(url);
        if (response.status === 200) {
            return response;
        }
  }

  export async function updateLastName(id, lastName) {
    const url = BASE_URL+`${route}/updateLastName/${id}/${lastName}`;
    const response = await axios.put(url);
        if (response.status === 200) {
            return response;
        }
  }

  export async function updatePhoneNumber(id, phone) {
    const url = BASE_URL+`${route}/updatePhoneNumber/${id}/${phone}`;
    const response = await axios.put(url);
        if (response.status === 200) {
            return response;
        }
  }

  export async function updatePassword(id, password) {
    const url = BASE_URL+`${route}/updatePassword/${id}/${password}`;
    const response = await axios.put(url);
        if (response.status === 200) {
            return response;
        }
  }
  

  export async function updateCodePin(id, codePin) {
    const url = BASE_URL+`${route}/updateCodePin/${id}/${codePin}`;
    const response = await axios.put(url);
        if (response.status === 200) {
            return response;
        }
  }
  
  export async function createProfessionalAccount(id) {
    const url = BASE_URL+`${route}/createProfessionalAccount/${id}`;
    const response = await axios.put(url,{});
        if (response.status === 200) {
            return response;
        }
  }

  export async function resetPassword(userId) {
    if (window.confirm("Are you sure that you wanted to reset user password ? ")
    ) {
    const url = BASE_URL+`${route}/resetPassword/${userId}`;
    const response = await axios.put(url,{},{headers:HEADERS});
        if (response.status === 200) {
            toast.success("User password reset successfully");
            return response;
        }
    }
  }

  export async function resetCodePin(userId) {
    if (window.confirm("Are you sure that you wanted to reset user code pin ? ")
    ) {
    const url = BASE_URL+`${route}/resetCodePin/${userId}`;
    const response = await axios.put(url,{},{headers:HEADERS});
        if (response.status === 200) {
            toast.success("User Code Pin reset successfully");
            return response;
        }
    }
  }

