const mongoose = require("mongoose");

const TerminalScehma = new mongoose.Schema(
  {
    tid:{ type: String, unique: true },
    mid:String,
    bank:String,
    admin:String,
    parameters: Array,
    action:Boolean,
  },
  {
    collection: "Terminal",
  }
);

mongoose.model("Terminal", TerminalScehma);
