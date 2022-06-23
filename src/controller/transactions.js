import axios from 'axios';
import { useEffect } from 'react';
import {BASE_URL, HEADERS} from "../config/http";


const route = '/transactions0';
var typeTransaction = {
    1:"Dépot",
    2:"Transfert",
    3:"Achat",
    4:"Vente"
  }

  

  export  async function getTransactions () {
    const url = BASE_URL+`${route}`;
    const response = await axios.get(url,{headers:HEADERS});
        if (response.status === 200 && response.data.status === true) {
            return response.data.data;
        }
  }

  export async function getFullTransactions(){
    const url = BASE_URL+`${route}/getTransactions/tableData`;
    const response = await axios.get(url,{headers:HEADERS});
    if (response.status === 200 )
       { 
    if( response.data.status === true)
      {
        return response.data.data;
      }
     }
  }

  export async function getTransaction (id) {
    const url = BASE_URL+`${route}/${id}`;
    const response = await axios.get(url);
    if (response.status === 200) {
        return response.data;
    }
  }

  export async function createTransaction (transaction) {
    const url = BASE_URL+`${route}/`;
    const response = await axios.put(url, {
      "amount": transaction.amount,
      "senderAccountId": transaction.senderAccountId,
      "senderPhone": transaction.senderPhone,
      "receiverAccountId": transaction.receiverAccountId,
      "receiverPhone": transaction.receiverPhone,
      "storeId": transaction.storeId,
      "transactionTypeId": transaction.transactionTypeId,
    });
    if (response.status === 200) {
        return response;
    }
  }
 
  export async function getTransactionByAccountId (id) {
    const url = BASE_URL+`${route}/findTransactionsByAccountId/${id}`;
    const response = await axios.get(url, { headers:HEADERS });
    if (response.status === 200 )
    { 
 if( response.data.status === true)
   {
     return response.data.data;
   }
   else{
     return response.data.message;
   }
  }
  }
