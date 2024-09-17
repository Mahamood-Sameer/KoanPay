import axios from "./axios";

export const addentry= async(bank,tid,parameter)=>{
    const res = await axios.post("/add-entry",{
        bank: bank,
        tid:tid,
        parameter:parameter,
    })
    return res.data;
}