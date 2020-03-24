import React from "react";
import logo from "./logo.svg";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./App.css";
import axios from "axios";

class MainTipper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tip: {
        id: 0,
        title: "Fai una torta.",
        description: "Mettila in forno!",
        button: {
          link: "http://www.google.com",
          text: "Vai alla ricetta"
        },
        author: "Simone"
      },
      colors: this.getColors()
    };
    this.updateData();
  }

  updateData() {
    // Fetch tip from API
    const colors = this.getColors();
    axios
      .get("/api/tip")
      .then(res => {
        // Change colors and tip
        this.setState({ tip: res.data, colors: colors });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getColors() {
    const ColorScheme = require("color-scheme");
    let scm = new ColorScheme();
    let hue = Math.random() * 365;
    console.log(hue);
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

  render() {
    var buttonStyle = {
      "--button-secondary-color": this.state.colors.buttonPrimary,
      "--button-secondary-color-dark": this.state.colors.buttonDark
    };

    return (
      <div className="App">
        <header
          className="App-header"
          style={{ backgroundColor: this.state.colors.background }}
        >
          <h1 style={{ fontSize: "75px" }}>{this.state.tip.title}</h1>
          <div className="descriptionDiv">
            <h4 style={{ fontWeight: "300" }}>{this.state.tip.description}</h4>
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
          </div>
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
            <AwesomeButton type="primary" className="button" size="medium">
              Suggerisci!
            </AwesomeButton>
          </div>
        </header>
      </div>
    );
  }
}

function App() {
  return <MainTipper />;
}

export default App;
