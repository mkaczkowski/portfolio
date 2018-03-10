//@flow
import React, { Component } from "react";
import classnames from "classnames";
import theme from "./theme.css"

  class Button extends Component<any> {
    buttonNode:any;

    static defaultProps = {
      accent: false,
      className: "",
      flat: false,
      floating: false,
      mini: false,
      neutral: true,
      primary: false,
      raised: false,
      type: "button"
    };

    getLevel = () => {
      if (this.props.primary) return "primary";
      if (this.props.accent) return "accent";
      return "neutral";
    };

    getShape = () => {
      if (this.props.raised) return "raised";
      if (this.props.floating) return "floating";
      return "flat";
    };

    handleMouseUp = (event:any) => {
      this.buttonNode.blur();
      if (this.props.onMouseUp) this.props.onMouseUp(event);
    };

    handleMouseLeave = (event:any) => {
      this.buttonNode.blur();
      if (this.props.onMouseLeave) this.props.onMouseLeave(event);
    };

    render() {
      const {
        accent, // eslint-disable-line
        children,
        className,
        flat, // eslint-disable-line
        floating, // eslint-disable-line
        href,
        icon,
        inverse,
        label,
        mini,
        neutral,
        primary, // eslint-disable-line
        raised, // eslint-disable-line
        type,
        ...others
      } = this.props;
      const element = href ? "a" : "button";
      const level = this.getLevel();
      const shape = this.getShape();
      const mouseEvents = {
        onMouseUp: this.handleMouseUp,
        onMouseLeave: this.handleMouseLeave
      };

      const classes = classnames(
        theme.button,
        [theme[shape]],
        {
          [theme[level]]: neutral,
          [theme.mini]: mini,
          [theme.inverse]: inverse
        },
        className
      );

      const props = {
        ...others,
        ...mouseEvents,
        href,
        ref: node => {
          this.buttonNode = node;
        },
        className: classes,
        disabled: this.props.disabled,
        type: !href ? type : null,
        "data-react-toolbox": "button"
      };

      const buttonElement = React.createElement(
        element,
        props,
        label,
        children
      );

      return others.onMouseEnter && this.props.disabled ? <span {...mouseEvents}>{buttonElement}</span> : buttonElement;
    }
  }

export default Button;
