import axios from "./axios";
import dateFormat from "dateformat";

export const editVar = async (
  bank,
  currParam,
  variable,
  toUpdate,
  newValue
) => {
  const now = new Date();
  const new_now = dateFormat(now);
  const res = await axios.post("/edit-var", {
    bank: bank,
    currParam: currParam,
    variable: variable,
    toUpdate: toUpdate,
    newValue: newValue,
    timestamp: new_now,
  });
  return res.data.updatedParameters;
};
