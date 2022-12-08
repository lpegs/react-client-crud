import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-client.component";
import Tutorial from "./components/client.component";
import TutorialsList from "./components/clients-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand abalo">
          <img className="image-header" src="./cliente.png" />
          <Link to={"/clients"} className="navbar-brand left-margin">
            NCL - Cadastro de Clientes
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/clients"} className="nav-link">
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Adicionar
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TutorialsList/>} />
            <Route path="/clients" element={<TutorialsList/>} />
            <Route path="/add" element={<AddTutorial/>} />
            <Route path="/clients/:id" element={<Tutorial/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;

