import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import AppClass from './AppClass';
import reportWebVitals from './reportWebVitals';
// 초기 언어 세팅
import getLanguage from './util';
// 언어 변경을 위한 context provider
import { LocaleContextProvider } from './context/LocaleContext';

getLanguage();

const AppProvider = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev,
      }),
    children,
  );

ReactDOM.render(
  <React.StrictMode>
    <AppProvider contexts={[LocaleContextProvider]}>
      <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/app-class" element={<AppClass />} />
        </Routes>
      </Router>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
