import axios from "./axios";

export const getallbanks = async()=>{
    const res = await axios.get('/getAllBanks');
    return res.data.banks;
}