//@flow

import React, { PureComponent } from "react";
import getGettextInstance from "../getGettextInstance.js";
import { emit } from "../pubsub.js";
import { t, tcnp } from "../translators.js";
import interpolateComponents from "../interpolateComponents.js";

type LionessProviderProps = {
  messages: Object,
  locale: string,
  children: any,
  debug: boolean
};

/**
 * Localization context provider
 */
class LionessProvider extends PureComponent<LionessProviderProps> {
  // Prop types
  gt: any;

  static childContextTypes = {
    locale: () => {},
    t: () => {},
    tcnp: () => {}
  };

  static defaultProps = {
    debug: null
  };

  constructor(props: LionessProviderProps) {
    super(props);
    const options = props.debug === null ? {} : { debug: props.debug };
    this.gt = getGettextInstance(props.messages, props.locale, options);
  }

  componentDidUpdate(prevProps: LionessProviderProps) {
    if (prevProps.locale !== this.props.locale) {
      emit();
    }
    if (prevProps.messages !== this.props.messages) {
      emit();
    }
  }

  /**
   * Translator functions are curried, so we return a set of functions
   * which all have been given a translation function.
   */
  getChildContext() {
    return {
      locale: this.props.locale,
      t: t(this.gt.gettext.bind(this.gt)),
      tcnp: tcnp(interpolateComponents, this.gt.npgettext.bind(this.gt))
    };
  }

  /**
   * Set the locale when receiving new props
   */
  componentWillReceiveProps(nextProps: LionessProviderProps) {
    if (nextProps.locale !== this.props.locale) {
      this.gt.setLocale(nextProps.locale);
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export default LionessProvider;
