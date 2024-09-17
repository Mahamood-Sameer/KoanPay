import axios from "./axios";

export const createbank = async(bank,admin)=>{
    const res = await axios.post('/create-bank',{
        bank:bank,
        admin:admin
    })
    return res.data;
}