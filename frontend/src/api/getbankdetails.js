import axios from "./axios";

export const getdetails = async(bank)=>{
    const res = await axios.get('/getBankdetails',{
        headers: {
            "Content-Type": "application/json",
            Authorization: bank,
        },
    })
    return res.data;
}