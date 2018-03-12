import React from "react";
import { configure } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
// import "@theme/commons.scss"

setOptions({
  name: "Dev7-UI",
  url: "#",
  addonPanelInRight: true,
  sortStoriesByKind: true
});

const req = require.context("../src", true, /.stories.js$/);

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);
