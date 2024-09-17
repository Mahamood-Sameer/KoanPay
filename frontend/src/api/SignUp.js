import axios from "./axios";

export const signup = async (fname,lname,email, password, userType)=>{
    const res = await axios.post('/register',{
        fname,email,lname,password,userType
    })
    return res.data;
}