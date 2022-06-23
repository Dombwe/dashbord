import { BASE_URL, HEADERS } from "../config/http";
import axios from "axios";
import { toast } from "react-toastify";
const route = '/administrators0';


export async function addAdministrator(administrateur) {
    const url = BASE_URL + `${route}/`;
    const response = await axios.post(url,
        {
            "name": administrateur.name,
            "username": administrateur.username,
            "password": administrateur.password,
            "level": administrateur.level,
            "contact": administrateur.contact,
        }, { headers: HEADERS });
    if (response.status === 200) {
        console.log('Administrateur crée');
    } else {
        console.log('Error');
    }
}

export async function getAdministrators() {
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




export async function getSingleAdministrator(id) {
    const url = BASE_URL + `${route}/${id} `;
    const response = await axios.get(url,{ headers: HEADERS });
    if (response.status === 200) {
        if (response.data.status === true) {
            return response.data.data;
        }
        else {      
            return response.data.message;
            
        }
    }
}

export async function deleteAdministrator(id) {
    if (window.confirm("Are you sure that you wanted to delete that user record ? ")
    ) {
        const url = BASE_URL + `${route}/${id}/`;
        const response = await axios.delete(url, { headers: HEADERS });
        if (response.status === 200) {
            toast.success("User deleted successfully");
            getAdministrators();
        }
    }
}

export async function updateAdministrator(administrateur, id) {
    const url = BASE_URL + `${route}/${id}`;
    const response = await axios.put(url,
        {
            "name": administrateur.name,
            "username": administrateur.username,
            "password": administrateur.password,
            "level": administrateur.level,
            "contact": administrateur.contact,
        }
        , { headers: HEADERS });
    if (response.status === 200) {
        toast.information("Users updated successfuly");
    }
}

export async function login(username, password) {
    if (username.length > 0 && password.length > 0) {

        const url = BASE_URL + `${route}/login/${username}/${password}`;
        const response = await axios.get(url);

        if (response.status === 200) {
            localStorage.setItem('token', response.data['token']);
            localStorage.setItem('name', response.data['administrator'].name);
            localStorage.setItem('username', response.data['administrator'].username);
            localStorage.setItem('contact', response.data['administrator'].contact);
            localStorage.setItem('level', response.data['administrator'].level);
            return true;
        }
        return false;
    } else {
        return false;
    }
}
