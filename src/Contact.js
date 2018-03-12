//@flow

import React, { Component } from 'react';
import theme from './contact.css';
import { withTranslators } from './lib/lioness';

class Contact extends Component<any> {
  render() {
    const { t } = this.props;

    return (
      <div className={theme.contact}>
        CONTACT FORM
      </div>
    );
  }
}

export default withTranslators(Contact);
