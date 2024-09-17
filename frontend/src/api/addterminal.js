import axios from "./axios";

export const addtermi = async(bank, terminal)=>{
    const res = await axios.post("/updateterminal",{
        bank: bank,
        terminal: terminal,
    })
    return res.data;
}