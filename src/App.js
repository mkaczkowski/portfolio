//@flow

import React, { Component } from 'react';
import logo from './logo.svg';
import theme from './App.css';
import Button from "./components/button/Button";

class App extends Component<any> {
  render() {
    return (
      <div className={theme.app}>
        <header className={theme.header}>
          <img src={logo} className={theme.logo} alt="logo" />
          <h1 className={theme.title}>Welcome to React</h1>
        </header>
        <p className={theme.intro}>
          To get started, edit <code>src/App.js</code> and save to reload.
            <Button raised primary label="sample button"/>
        </p>
      </div>
    );
  }
}

export default App;
