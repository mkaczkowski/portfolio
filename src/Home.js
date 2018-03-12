//@flow

import React, { Component } from 'react';
import Logo from './logo.svg';
import theme from './App.css';
import Button from './components/button/Button';
import { withTranslators } from './lib/lioness';

class Home extends Component<any> {
  render() {
    const { t } = this.props;

    return (
      <div className={theme.app}>
        <header className={theme.header}>
          <Logo className={theme.logo} />
          <h1 className={theme.title}>
            Welcome to Reac11t: {t('HELLO_WORLD')}
          </h1>
        </header>
        <p className={theme.intro}>
          <Button
            raised
            primary
            label="sample button"
            onClick={() => alert('hi')}
          />
        </p>
      </div>
    );
  }
}

export default withTranslators(Home);
