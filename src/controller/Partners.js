import {BASE_URL, HEADERS} from "../config/http";
import axios from "axios";
import { toast } from "react-toastify";
const route = '/partners0';



export async function createPartners (partner) {
    const url = BASE_URL+`${route}/`;
    const response = await axios.post(url,{
        "name": partner.name,
        "logo": partner.logo,
    }, {headers:HEADERS});
    if(response.status === 200){
        toast.success("Partenaire create successfully");
        return response; 
    }
}

export async function getPartners() {
    const url = BASE_URL+`${route}/`;
    const response = await axios.get(url,{headers:HEADERS});
    if(response.status === 200){
        return response;
 }
}

export async function getPartnersById(id) {
    const url = BASE_URL+`${route}/${id}`;
    const response = await axios.get(url, {headers:HEADERS});
    if (response.status === 200) {
        return response;
    }
}
  
export async function getPartnersByName(name) {
    const url = BASE_URL+`${route}/findOneByName/${name}`;
    const response = await axios.get(url);
    if(response.status === 200){
        return response;
    }
}

 export async function updatePartners (partner,id) {
    const url = BASE_URL+`${route}/${id}`;
    const response = await axios.put(url,
        { 
        "name": partner.name,
        "logo": partner.logo,
       }
        , {headers:HEADERS});
    if (response.status === 200) {
        toast.information("Partner updated successfuly");
    }
 }

 export  async function deletePartner(id) {
    if (window.confirm("Are you sure that you wanted to delete that Partner record ? ")
    ) {
        const url = BASE_URL+`${route}/${id}`;
        const response = await axios.delete(url, {headers:HEADERS});
        if (response.status === 200) {
            toast.success("Partner deleted successfully");
            getPartners();
        }
    }
 }
  