import axios from "./axios";

export const copyterminal = async (bank,currtid,existingtid)=>{
    const res = await axios.post('/copy-terminal',{
        currtid:currtid,
        bank:bank,
        existingtid:existingtid
    })
    return res.data;
}