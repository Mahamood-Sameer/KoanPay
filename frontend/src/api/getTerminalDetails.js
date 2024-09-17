import axios from "./axios";

export const getTerminalDetails = async (tid, bank) => {
  const res = await axios.get("/tid-details", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `{"bank":"${bank}","tid":"${tid}"}`,
    },
  });
//   console.log("The response is : ")
  return res.data.data;
};
