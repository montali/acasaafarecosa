import React from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

import "./App.css";
import axios from "axios";

class MainTipper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tip: {
        title: "",
        description: "",
        button: {
          link: null,
          text: null
        }
      },
      colors: this.getColors(),
      suggesting: false
    };
    this.updateData();
    this.handleSuggestion = this.handleSuggestion.bind(this);
    this.handleCloseSuggestions = this.handleCloseSuggestions.bind(this);
  }
  updateData() {
    // Fetch tip from API
    const colors = this.getColors();
    axios
      .get("/api/dbtip")
      .then(res => {
        // Change colors and tip
        const tip = {
          title: res.data.title,
          description: res.data.desc,
          button: {
            link: res.data.link,
            text: res.data.linkDesc
          },
          author: res.data.nickname
        };
        this.setState({ tip: tip, colors: colors });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSuggestion(data) {
    const suggestion = {
      title: data.title,
      desc: data.desc,
      link: data.link,
      linkDesc: data.linkDesc,
      nickname: data.nickname
    };
    axios
      .post("/api/suggest", suggestion)
      .then(res => {
        //Thank the user!
        this.setState({ suggesting: false });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getColors() {
    const ColorScheme = require("color-scheme");
    let scm = new ColorScheme();
    let hue = Math.random() * 365;
    scm
      .from_hue(hue)
      .scheme("contrast")
      .variation("pastel")
      .web_safe(true);

    var colors = scm.colors();
    return {
      background: "#" + colors[1],
      buttonPrimary: "#" + colors[6],
      buttonDark: "#" + colors[7]
    };
  }

  handleCloseSuggestions() {
    this.setState({ suggesting: false });
  }

  render() {
    var buttonStyle = {
      "--button-secondary-color": this.state.colors.buttonPrimary,
      "--button-secondary-color-dark": this.state.colors.buttonDark
    };
    if (!this.state.suggesting) {
      let credits = "";
      let button = "";
      if (this.state.tip.author)
        credits = (
          <h5 style={{ fontWeight: "300" }}>
            Grazie a {this.state.tip.author} per il consiglio.
          </h5>
        );
      if (this.state.tip.button.link && this.state.tip.button.text)
        button = (
          <AwesomeButton
            type="secondary"
            className="button"
            style={buttonStyle}
            size="large"
            onPress={() => {
              window.open(this.state.tip.button.link, "_blank");
            }}
          >
            {this.state.tip.button.text}
          </AwesomeButton>
        );
      return (
        <div className="App">
          <header
            className="App-header"
            style={{ backgroundColor: this.state.colors.background }}
          >
            <h1 id="tipTitle">{this.state.tip.title}</h1>
            <div className="descriptionDiv">
              <h4 style={{ fontWeight: "300" }}>
                {this.state.tip.description}
              </h4>
              {button}
              {credits}
            </div>
            <div className="copyrightDiv">
              <div className="buttonDiv">
                <AwesomeButton
                  type="primary"
                  className="button"
                  size="medium"
                  onPress={() => {
                    this.updateData();
                  }}
                >
                  Un altro!
                </AwesomeButton>
                <AwesomeButton
                  type="primary"
                  className="button"
                  size="medium"
                  onPress={() => {
                    this.setState({ suggesting: true });
                  }}
                >
                  Suggerisci!
                </AwesomeButton>
              </div>
              🏠Proudly made by <a href="https://monta.li/">Simone Montali</a>{" "}
              during the COVID19 quarantine. 🏠
              <br />
              <a href="https://github.com/simmontali/acasaafarecosa">
                This project is open source!
              </a>{" "}
              <emsp /> <emsp /> <emsp />
              <a href="https://instagram.com/sommosimmy">
                Follow me on Instagram.
              </a>
            </div>
          </header>
        </div>
      );
    } else
      return (
        <div className="App">
          <header
            className="App-header"
            style={{ backgroundColor: this.state.colors.background }}
          >
            <Suggest
              handleSuggestion={this.handleSuggestion}
              handleClose={this.handleCloseSuggestions}
            />
          </header>
        </div>
      );
  }
}

class Suggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sendText: "Invia" };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="formPaper">
        <form
          id="contact"
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <h3>Invia un suggerimento</h3>
          <input
            placeholder="Titolo"
            required
            onChange={this.handleInputChange}
            type="text"
            name="title"
          />
          <input
            placeholder="Descrizione"
            required
            onChange={this.handleInputChange}
            type="text"
            name="desc"
          />
          <input
            placeholder="Link (opzionale)"
            onChange={this.handleInputChange}
            type="url"
            name="link"
          />
          <input
            placeholder="Titolo link per il bottone(opzionale)"
            onChange={this.handleInputChange}
            type="text"
            name="linkDesc"
          />
          <input
            placeholder="Il tuo nickname (opzionale)"
            onChange={this.handleInputChange}
            type="text"
            name="nickname"
          />
          <AwesomeButton
            type="primary"
            className="button"
            size="medium"
            onPress={() => {
              this.setState({ sendText: "Grazie ❤️" }, () => {
                setTimeout(() => {
                  this.props.handleSuggestion(this.state);
                }, 600);
              });
            }}
          >
            {this.state.sendText}
          </AwesomeButton>
        </form>
        <AwesomeButton
          type="secondary"
          className="button"
          size="medium"
          onPress={this.props.handleClose}
        >
          Annulla
        </AwesomeButton>
      </div>
    );
  }
}

function App() {
  return <MainTipper />;
}

export default App;
