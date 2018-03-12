//@flow

import React, { Component } from 'react';
import logo from './logo.svg';
import theme from './App.css';
import Button from './components/button/Button';

declare var __;

// const translations = require(`./../locales/${}.json`)

class App extends Component<any> {
  componentDidMount = () => {
    if (process.env.NODE_ENV === 'production') {
      var element = document.getElementById('translationsBlock');
      element.outerHTML = '';
    }
  };

  render() {
    // console.log(__("HELLO_WORLD"));
    // console.log(__("Missing Text"));

    return (
      <div className={theme.app}>
        <header className={theme.header}>
          <img src={logo} className={theme.logo} alt="logo" />
          <h1 className={theme.title}>Welcome to React</h1>
        </header>
        <p className={theme.intro}>
          To get started: {window.translations['HELLO_WORLD']}
          <Button raised primary label="sample button" />
        </p>
      </div>
    );
  }
}

export default App;
