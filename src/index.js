import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import AppClass from './AppClass';
import reportWebVitals from './reportWebVitals';
import getLanguage from './util';
import locales from './locales';
/**
 * 필요한 context를 제공하기위한 IntlProvider
 */
import { IntlProvider } from 'react-intl';

getLanguage();

/**
 * nested object에 대한 접근을 지원하지 않아 변환 필요
 */
const flattenMessages = (nestedMessages, prefix = '') => {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    typeof value === 'string'
      ? (messages[prefixedKey] = value)
      : Object.assign(messages, flattenMessages(value, prefixedKey));

    return messages;
  }, {});
};

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider
      // locale: 적용할 locale, ISO 693-1 기준으로 작성해야함
      locale={sessionStorage.lang}
      // messages: 번역할 json파일
      messages={flattenMessages(locales[sessionStorage.lang])}
      // locale default 값, message에 locale에서 설정한 값이 없으면 defaullLocale 값으로 번역
      defaultLocale="ko"
    >
      <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/app-class" element={<AppClass />} />
        </Routes>
      </Router>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
