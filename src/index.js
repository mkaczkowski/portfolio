import React from "react";
import {  render } from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from './registerServiceWorker';

function convertTranslations(translations: Array<any>, language: string) {
  const translationsPairs = {};
  Object.keys(translations).forEach(key => {
    const value = translations[key];
    translationsPairs[key] = {
      msgid: key,
      msgstr: [value]
    };
  });
  return {
    [language]: {
      translations: {
        "": translationsPairs
      }
    }
  };
}

async function getTranslations(language) {
  return import(`./locales/${language}.json`);
}

async function init() {
  const language = document.documentElement.lang;

  const translations = await getTranslations(language);
  window.translations = convertTranslations(translations, language);

  const rootElement = document.getElementById("root");
  // if (rootElement.hasChildNodes()) {
  //   hydrate(<App />, rootElement);
  // } else {
    render(<App />, rootElement);
  // }
}

init();


if(process.env.NODE_ENV === 'development'){
  registerServiceWorker();
}
