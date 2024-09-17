import React, { useState } from "react";
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import CreateBank from "./components/CreateBank";
import SuperuserDashboard from "./components/SuperuserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ViewAndUpdateTerminal from "./components/ViewAndUpdateTerminal";

import UserLogs from "./components/UserLogs";
import Logs from "./components/AdminLogs";
import AdminLogsDisplay from "./components/AdminLogsDisplay";


// Creating a Context
import { createContext } from "react";
import DefineStruct from "./components/DefineStruct";
import UserDashboard from "./components/UserDashboard";
import BreadcrumbHome from "./components/BreadcrumbHome";
import BreadcrumbView from "./components/BreadcrumbView";

export const UserContext = createContext();
export const TerminalContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [terminal, setTerminal] = useState(null);
  return (
    <Router>
      <UserContext.Provider value={[user, setUser]}>
        <TerminalContext.Provider value={[terminal, setTerminal]}>
          <div className="App">
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route
                    path="/superuser"
                    element={[<Navbar />, <SuperuserDashboard />, <Footer />]}
                  />
                  <Route
                    path="/user"
                    element={[
                      <Navbar />,
                      <BreadcrumbHome />,
                      <UserDashboard />,
                      <Footer />,
                    ]}
                  />
                  <Route
                    path="/admin"
                    element={[<Navbar />, <AdminDashboard />, <Footer />]}
                  />
                  <Route
                    path="/define_struct"
                    element={[<Navbar />, <DefineStruct />, <Footer />]}
                  />
                  <Route path="/user/:tid" element={[<Navbar />, <BreadcrumbView />, <ViewAndUpdateTerminal/>, <Footer />]} />
                  <Route path="/admin/user_logs" element={[<Navbar />, <UserLogs/>, <Footer />]} />
                  <Route path="/superuser/logs" element={[<Navbar />, <Logs/>, <Footer />]} />
                  <Route path="/superuser/logs/:bank" element={[<Navbar />, <AdminLogsDisplay/>, <Footer />]} />
                  <Route
                    path="/create_bank"
                    element={[<Navbar />, <CreateBank />, <Footer />]}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </TerminalContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
