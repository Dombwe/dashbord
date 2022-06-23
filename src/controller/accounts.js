import axios from 'axios';
import {BASE_URL, HEADERS} from "../config/http";
import { toast } from "react-toastify";

const route = '/accounts0';
const MainRoute = '/MainAccounts0';

 export var TypeAccount = {
    1: "Classique",
    2: "Professionnel"
  }

  
  export  async function getAccounts () {
    const url = BASE_URL+`${route}`;
    const response = await axios.get(url,{headers:HEADERS});
        if (response.status === 200 && response.data.status === true) {
            return response.data.data;
        }
  }

  export  async function getFullAccounts () {
    const url = BASE_URL+`${route}/getAccounts/tableData`;
    const response = await axios.get(url,{headers:HEADERS});
        if (response.status === 200 && response.data.status === true) {
            return response.data.data;
        }
  }

  export async function mainAccount () {
    
    const url = BASE_URL+`${MainRoute}`;
    const response = await axios.get(url,{headers:HEADERS});
    if (response.status === 200 && response.data.status === true) {
      return response.data.data;
  }
  }

  export async function BlockedAccount(accountId){
    if(window.confirm('Are you sure you want to blocked this account ?')){
    const url = BASE_URL+`${route}/lockAccount/${accountId}`;
    const response = await axios.put(url,{},{headers:HEADERS});
    window.location.reload(300);
    if (response.status === 200 && response.data.status === true) {
      toast.success("Account Blocked successfuly");
      getFullAccounts();
  }

  }
}

export async function resetMooveMoneyAmount(){
  if(window.confirm('Are you sure you want to reset Moov Money amount ?')){
  const url = BASE_URL+`${route}/reset/moovMoney/amount/`
  const response = await axios.put(url,{},{headers:HEADERS});
  window.location.reload(300);
  if (response.status === 200 && response.data.status === true) {
    toast.success("Moov Money amount reset successfully");
}

}
}

export async function resetOrangeMoneyAmount(){
  if(window.confirm('Are you sure you want to reset Orange Money amount ?')){
  const url = BASE_URL+`${route}/reset/orangeMoney/amount/`
  const response = await axios.put(url,{},{headers:HEADERS});
  window.location.reload(300);
  if (response.status === 200 && response.data.status === true) {
    toast.success("Orange Money amount reset successfully");
}

}
}

export async function UnBlockedAccount(accountId){
  if(window.confirm('Are you sure you want to unblocked this account ?')){
  const url = BASE_URL+`${route}/unLockAccount/${accountId}`;
  const response = await axios.put(url,{},{headers:HEADERS});
  if (response.status === 200 && response.data.status === true) {
    toast.success("Account Unlocked successfuly");
    getFullAccounts();
}

}
}
  export async function addAccount(account)  {
    const url = BASE_URL+`${route}/`;
    const response = await axios.put(url, 
      {
      "id": account.id,
      "amount": account.amount,
      "pinCode": account.pinCode,
      "stopAmount": account.stopAmount, 
      "accountTypeId": account.accountTypeId,
      "userId": account.userId,
      }
      );

    if (response.status === 200) {
        toast.success("Account created successfuly");
    } else {
        toast.error("Something wrong !!! Please try again");
    }
}

export async function getAccountById(id){
  const url = BASE_URL+`${route}/${id}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response;
  } 
}

export async function getStopAmount(id){
  const url = BASE_URL+`${route}/getStopAmount/${id}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response;
  }
}

export async function getAccountByUserId(userId){
  const url = BASE_URL+`${route}/findByUserId/${userId}`;
  const response = await axios.get(url, {headers:HEADERS});
  if (response.status === 200) {
    if (response.data.status === true) {
      return response.data.data;
    }
    else {
      return response.data.message;
    }
  }
}


export  async function getAccountByUserPhoneNumber(userPhoneNumberNumber, accountTypeId){
  const url = BASE_URL+`${route}/getByPhoneNumber/${userPhoneNumberNumber}/${accountTypeId}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response;
  }
}

export async function getAccountAmount(id){
  const url = BASE_URL+`${route}/getAmount/${id}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response;
  }
}


export async function updateAccountAmount(id, amount){
  const url = BASE_URL+`${route}/updateStopAmount/${id}/${amount}`;
  const response = await axios.get(url,{
    "id": id,
    "amount": amount,
  });
  if (response.status === 200) {
    return response;
  }
}


export async function updateAccountCodePin(id, codePin){
  const url = BASE_URL+`${route}/updateCodePin/${id}/${codePin}`;
  const response = await axios.put(url,{
    "id": id,
    "amount": codePin,
  });
  if (response.status === 200) {
    return response;
  }
}

export async function verifyAccountCodePin(codePin, userId){
  const url = BASE_URL+`${route}/verifyCodePin/${codePin}/${userId}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response;
  }
}
