//@flow

import React, { Component } from 'react';
import { LionessProvider } from './lib/lioness';
// import Button from '@components/button/Button';
import loadable from 'loadable-components';
import Home from './Home';

export const Contact = loadable(() => import('./Contact'));

class App extends Component<any> {
  state = {
    language: document.documentElement.lang,
    messages: window.translations
  };

  changeLanguage = () => {
    this.setState({ language: 'de' });
  };

  render() {
    console.info('app');
    const { language, messages } = this.state;

    return (
      <LionessProvider messages={messages} locale={language} debug={true}>
        <div>
        <Home />
        <Contact />
        </div>
      </LionessProvider>
    );
  }
}

export default App;
