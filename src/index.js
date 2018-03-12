import React from 'react';
import { render } from 'react-dom';
import _fromPairs from 'lodash/fromPairs';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//TODO implement
const ALL_LANGUAGES = ['en', 'de'];

async function convertTranslations(language) {
  const languages =
    process.env.NODE_ENV === 'development' ? ALL_LANGUAGES : [language];

  let result = await Promise.all(
    languages.map(async language => {
      const translationsPairs = {};
      const translations = await import(`./locales/${language}.json`);

      Object.keys(translations).forEach(key => {
        const value = translations[key];
        translationsPairs[key] = {
          msgid: key,
          msgstr: [value]
        };
      });

      return [
        [language],
        {
          translations: {
            '': translationsPairs
          }
        }
      ];
    })
  );
  return _fromPairs(result);
}

async function init() {
  const language = document.documentElement.lang;
  window.translations = await convertTranslations(language);
  const rootElement = document.getElementById('root');
  render(<App />, rootElement);
}

init();

if (process.env.NODE_ENV === 'development') {
  registerServiceWorker();
}
