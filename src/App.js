//@flow

import React, { Component, Fragment } from 'react';
import { LionessProvider } from './lib/lioness';
import Home from './Home';
import Button from '@components/button/Button';

class App extends Component<any> {
  state = {
    language: document.documentElement.lang,
    messages: window.translations
  };

  changeLanguage = () => {
    this.setState({ language: 'de' });
  };

  render() {
    const { language, messages } = this.state;

    return (
      <LionessProvider messages={messages} locale={language} debug={true}>
        <Fragment>
          <Button onClick={this.changeLanguage}>DE</Button>
          <Home />
        </Fragment>
      </LionessProvider>
    );
  }
}

export default App;
