import React, { Component } from "react";
import TutorialDataService from "../services/client.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      name: "",
      email: "", 
      cpf: "",

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeCpf(e) {
    this.setState({
      cpf: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      name: this.state.name,
      email: this.state.email,
      cpf: this.state.cpf,
      
      submitted: true
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          cpf: response.data.cpf,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      name: "",
      email: "",
      cpf: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Cliente Cadastro com Sucesso</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeTitle}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeDescription}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="number"
                className="form-control"
                id="cpf"
                required
                value={this.state.cpf}
                onChange={this.onChangeCpf}
                name="cpf"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Enviar
            </button>
          </div>
        )}
      </div>
    );
  }
}

