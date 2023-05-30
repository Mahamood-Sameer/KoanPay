import axios from "./axios";

export const addentry= async(bank,tid,parameter,variable)=>{
    const res = await axios.post("/add-entry",{
        bank: bank,
        tid:tid,
        parameter:parameter,
        variable:variable,
    })
    return res.data;
}