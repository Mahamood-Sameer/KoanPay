import axios from "./axios";
import dateFormat from "dateformat";

export const adduser = async (bank,user)=>{
    const now = await new Date();
    const new_now = dateFormat(now);
    const res = await axios.post('/adduser',{
        bank:bank,
        user:user,
        timestamp:new_now,
    })
    return res.data;
}