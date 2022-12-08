import React, { Component } from "react";
import TutorialDataService from "../services/client.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3 ">
            <input
              type="text"
              className="form-control input-search"
              placeholder="Buscar Cliente"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary search-btn"
                type="button"
                onClick={this.searchTitle}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="list2 col-md-6">
          <h4>Clientes</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remover Todos
          </button>
        </div>
      </div>
        <div className="list3 col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Cliente</h4>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {currentTutorial.name}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentTutorial.email}
            </div>
            <div>
              <label>
                <strong className="text-cpf">CPF:</strong>
              </label>{" "}
              {currentTutorial.cpf}
            </div>

            <Link
              to={"/clients/" + currentTutorial.id}
              className="edit-btn"
            >
              Editar Cadastro
            </Link>
          </div>
        ) : (
          <div>
            <br />
          </div>
        )}
      </div>
    </>
    );
  }
}
