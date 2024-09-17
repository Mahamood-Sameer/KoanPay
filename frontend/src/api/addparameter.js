import axios from "./axios";
import dateFormat from "dateformat";

export const addparam = async(bank, parameter)=>{
    const now = await new Date();
    const new_now = dateFormat(now);
    const res = await axios.post("/updatestructure",{
        bank: bank,
        parameter: parameter,
        timestamp:new_now
    })
    return res.data;
}