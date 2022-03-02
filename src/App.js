import React, { Component } from "react";
import { Row } from "react-bootstrap";
import "./App.css";
import { FormProduct, NavbarComponent } from "./components";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarComponent />
        <Row>
          <FormProduct />
        </Row>
      </div>
    );
  }
}
