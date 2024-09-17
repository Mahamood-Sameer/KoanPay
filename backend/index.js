const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoUrl =
  "mongodb+srv://prashant1shukla:PassWord@koanpay.9rjwa0c.mongodb.net/?retryWrites=true&w=majority";
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "pfhbvhsbdfvjsbdfvhjbshdfvjshbhbhbhdn";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./Schema/userDetails");
const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password, usertype } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      usertype,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User Not Found" });
    }
    if (bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET);

      if (res.status(201)) {
        return res.json({ status: "ok", data: token, userDetails: user });
      } else {
        return res.json({ error: "error" });
      }
    }
    // res.json({status: "error", error:"Invalid Password"});
  } catch (error) {
    res.json({ status: "error", error: "Invalid Password" });
  }
});

app.get("/userData", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

// Creating Bank
require("./Schema/bank");
const Bank = mongoose.model("BankName");
app.post("/create-bank", async (req, res) => {
  const { bank, admin } = req.body;
  try {
    const oldBank = await Bank.findOne({ bank });
    if (oldBank) {
      return res.json({ error: "bank Exists" });
    }
    // Bank Creation
    await Bank.create({
      bank: bank,
      admin: admin.email,
    });
    // Admin creation
    // password: `${bank}_${admin.email}`
    const encryptedPassword = await bcrypt.hash(`${bank}_${admin.email}`, 10);
    await User.create({
      fname: admin.fname,
      lname: admin.lname,
      email: admin.email,
      userType: "admin",
      BankName: bank,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

// Adding User to Bank
app.post("/adduser", async (req, res) => {
  const bank = req.body.bank;
  const user = req.body.user;
  const timestamp = req.body.timestamp;
  console.log("The bank is: ", bank);
  // Adding user in BankDB
  const bankindb = await Bank.findOne({ bank: bank });
  // console.log("The bank in DB is, ",bankindb);
  let prevuser = bankindb.users;
  prevuser.push(user.email);
  // Adding user in UserDB
  await User.create({
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    userType: "user",
    BankName: bank,
    password: `${bank}_${user.email}`,
  });
  // Admin logs
  var log = {
    type: "Added User",
    timestamp: timestamp,
  };
  var prev_logs = bankindb.adminlogs;
  prev_logs.push(log);
  await Bank.updateOne(
    {
      bank: bank,
    },
    {
      $set: {
        adminlogs: prev_logs,
        users: prevuser,
      },
    }
  );
  res.send({
    status: "ok",
  });
});

// Getting Bank Details
app.get("/getBankdetails", async (req, res) => {
  const bank = req.headers.authorization;
  const bankindb = await Bank.findOne({ bank: bank });
  res.send({
    status: "ok",
    details: bankindb,
  });
});

// Adding Parameter
app.post("/updatestructure", async (req, res) => {
  const { bank, parameter, timestamp } = req.body;
  const bankindb = await Bank.findOne({ bank: bank });

  var log = {
    type: "Updated the Structure",
    timestamp: timestamp,
  };
  var prev_logs = bankindb.adminlogs;
  prev_logs.push(log);
  await Bank.updateOne(
    {
      bank: bank,
    },
    {
      $set: {
        adminlogs: prev_logs,
        parameters: parameter,
      },
    }
  );
  res.send({
    status: "Updated",
  });
});

// Editing Var in structure
app.post("/edit-var", async (req, res) => {
  const { bank, currParam, variable, toUpdate, newValue, timestamp } = req.body;
  var bankindb = await Bank.findOne({ bank: bank });
  var param_index, var_index;
  bankindb.parameters?.map((param, index_of_param) => {
    if (param.par_name === currParam.par_name) {
      param_index = index_of_param;
      param.variables?.map((vari, index_of_vari) => {
        if (vari.var_name === variable.var_name) {
          var_index = index_of_vari;
          return;
        }
      });
      return;
    }
  });

  var parameters = bankindb.parameters;
  parameters[param_index].variables[var_index][toUpdate] = newValue;

  var log = {
    type: "Edited the Structure",
    timestamp: timestamp,
  };

  var prev_logs = bankindb.adminlogs;
  prev_logs.push(log);

  await Bank.updateOne(
    {
      bank: bank,
    },
    {
      $set: {
        parameters: parameters,
        adminlogs: prev_logs,
      },
    }
  );
  res.send({
    status: "ok",
    updatedParameters: parameters,
  });
});

// Adding Terminal
app.post("/updateterminal", async (req, res) => {
  const { bank, terminal } = req.body;
  await Bank.updateOne(
    {
      bank: bank,
    },
    {
      $set: {
        terminals: terminal,
      },
    }
  );
  res.send({
    status: "Updated",
    terminaldetails: terminal,
  });
});

// Getting all Bank Details
app.get("/getAllBanks", async (req, res) => {
  const data = await Bank.find();
  res.send({
    status: "ok",
    banks: data,
  });
});

// Getting all Struct Details
app.get("/getAllStructs", async (req, res) => {
  const data = await Struct.find();
  res.send({
    status: "ok",
    structs: data,
  });
});

//TERMINAL:
// Creating Terminal
require("./Schema/terminal");
const Terminal = mongoose.model("Terminal");
app.post("/create-terminal", async (req, res) => {
  const { tid, mid } = req.body;
  try {
    const oldTerminal = await Terminal.findOne({ tid });
    if (oldTerminal) {
      return res.json({ error: "terminal Exists" });
    }
    // Terminal Creation
    await Terminal.create({
      tid: tid,
      mid: mid,
    });
  } catch (error) {
    res.send({ status: "error" });
  }
});

// Copy Terminal
app.post("/copy-terminal", async (req, res) => {
  const { bank, currtid, existingtid } = req.body;
  console.log("The details are: ", bank, currtid, existingtid);
  const bankindb = await Bank.findOne({ bank: bank });
  var index = -1;
  bankindb.terminals.map((terminal, ind) => {
    if (terminal.tid === existingtid) {
      index = ind;
      return;
    }
  });
  if (index === -1) {
    res.send({
      status: "error",
      message: `Tid-${existingtid} Not found`,
    });
  }
  let prevterminals = [...bankindb.terminals];
  let newterminal = { ...prevterminals[index] };
  newterminal.tid = currtid;
  prevterminals.push(newterminal);
  await Bank.updateOne(
    {
      bank: bank,
    },
    {
      $set: {
        terminals: prevterminals,
      },
    }
  );
  res.send({
    status: "ok",
    message: "Terminal copied successfully",
    terminals: prevterminals,
  });
});

// Getting terminal details
app.get("/tid-details", async (req, res) => {
  // const{bank, tid}=req.headers.authorization;
  var headers = req.headers.authorization;
  headers = JSON.parse(headers);
  // console.log("this is the terminal bank", headers.bank, headers.tid);
  const bankindb = await Bank.findOne({ bank: headers.bank });
  var flag = 0;
  bankindb?.terminals?.map((terminal) => {
    if (terminal.tid === headers.tid) {
      flag = 1;
      res.send({ status: "ok", data: terminal });
    }
  });
  if (flag === 0) res.send({ status: "error" });
});

// Adding User to Bank
app.post("/adduser", async (req, res) => {
  const bank = req.body.bank;
  const user = req.body.user;
  console.log("The bank is: ", bank);
  // Adding user in BankDB
  const bankindb = await Bank.findOne({ bank: bank });
  // console.log("The bank in DB is, ",bankindb);
  let prevuser = bankindb.users;
  prevuser.push(user.email);
  await Bank.updateOne(
    {
      bank: bank,
    },
    {
      $set: {
        users: prevuser,
      },
    }
  );
  // Adding user in UserDB
  await User.create({
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    userType: "user",
    BankName: bank,
    password: `${bank}_${user.email}`,
  });
  res.send({
    status: "ok",
  });
});

// Getting Bank Details
app.get("/getBankdetails", async (req, res) => {
  const bank = req.headers.authorization;
  const bankindb = await Bank.findOne({ bank: bank });
  res.send({
    status: "ok",
    details: bankindb,
  });
});

// Adding an Entity
app.post("/add-entry", async (req, res) => {
  const { bank, tid, parameter } = req.body;
  var bankindb = await Bank.findOne({ bank: bank });
  var tid_index, param_index;
  bankindb?.terminals.map((terminal, index_of_terminal) => {
    if (terminal.tid === tid) {
      tid_index = index_of_terminal;
      terminal.tparameters.map((param, index_of_param) => {
        if (param.par_name === parameter) {
          param_index = index_of_param;
          return;
        }
      });
    }
  });
  var terminals = bankindb.terminals;
  var prev_entries = terminals[tid_index].tparameters[param_index].entries;
  var currvariables = terminals[tid_index].tparameters[param_index].variables;
  prev_entries.push(currvariables);
  terminals[tid_index].tparameters[param_index].entries = prev_entries;
  await Bank.updateOne(
    {
      bank: bank,
    },
    {
      $set: {
        terminals: terminals,
      },
    }
  );
  res.send({
    status: "OK",
    updatedterminal: terminals[tid_index],
  });
});

//Updating Entry
app.post("/update-entry", async (req, res) => {
  const {
    bank,
    tid,
    parameter,
    id_variable,
    id_entry,
    value,
    user,
    timestamp,
  } = req.body;
  var bankindb = await Bank.findOne({ bank: bank });
  var tid_index, param_index, var_index, entity_index;
  bankindb?.terminals.map((terminal, index_of_terminal) => {
    if (terminal.tid === tid) {
      tid_index = index_of_terminal;
      terminal.tparameters.map((param, index_of_param) => {
        if (param.par_name === parameter) {
          param_index = index_of_param;
          return;
        }
      });
    }
  });
  var terminals = bankindb.terminals;
  var prev_val =
    terminals[tid_index].tparameters[param_index].entries[id_entry][id_variable]
      .value;
  var var_name =
    terminals[tid_index].tparameters[param_index].entries[id_entry][id_variable]
      .var_name;
  terminals[tid_index].tparameters[param_index].entries[id_entry][
    id_variable
  ].value = value;

  // Logs.....
  var log = {
    user: user,
    tid: tid,
    parameter: parameter,
    variable: var_name,
    prev_val: prev_val,
    new_val: value,
    timestamp: timestamp,
  };
  var prev_logs = bankindb.logs;
  prev_logs.push(log);
  await Bank.updateOne(
    {
      bank: bank,
    },
    {
      $set: {
        terminals: terminals,
        logs: prev_logs,
      },
    }
  );
  res.send({
    status: "OK",
    updatedterminal: terminals[tid_index],
  });
});

app.listen(5000, () => {
  console.log("Server started!");
});
