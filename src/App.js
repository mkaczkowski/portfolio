//@flow

import React, { Component } from "react";
import { LionessProvider } from "./lib/lioness";
import Home from "./Home";

class App extends Component<any> {
  state = {
    language: document.documentElement.lang,
    messages: window.translations,
  };


  render() {
    const { language, messages } = this.state;

    return (
      <LionessProvider messages={messages} locale={language} debug={true}>
        <Home />
      </LionessProvider>
    );
  }
}

export default App;
