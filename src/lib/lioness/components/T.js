//@flow

import React, { PureComponent } from "react";
import withTranslators from "../withTranslators.js";

type TProps = {
  message: any,
  children: any,
  context: string,
  tcnp: (...any) => string,
  t: (...any) => string
};

class T extends PureComponent<TProps> {
  static defaultProps = {
    message: null,
    children: null,
    context: ""
  };

  render() {
    const { message, context, children, tcnp, ...scope } = this.props;
    delete scope.t;
    const msgid = message || children || "";
    const translatedContent = tcnp(context, msgid, scope);
    return typeof translatedContent === "string"
      ? <span>
          {translatedContent}
        </span>
      : translatedContent;
  }
}

export default withTranslators(T);
