import axios from "./axios";
import dateFormat from "dateformat";

export const updateentry= async(bank,tid,parameter,id_variable,id_entry, value, user)=>{
    const now = await new Date();
    const new_now = dateFormat(now);
    const res = await axios.post("/update-entry",{
        bank: bank,
        tid:tid,
        parameter:parameter,
        id_variable: id_variable,
        id_entry:id_entry,
        value : value,
        user : user,
        timestamp:new_now
    })
    return res.data.updatedterminal;
}