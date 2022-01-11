import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

/**
 * FormattedMessage: 번역하고 싶은 부분에 사용하는 컴포넌트
 * useIntl: 함수형 컴포넌트에서 컴포넌트대신 text만 사용하고 싶을때 제공하는 react hook (예: placeholder 부분)
 */
import { FormattedMessage, useIntl } from 'react-intl';

const App = () => {
  const [lang, setLang] = useState(sessionStorage.lang);
  const intl = useIntl();

  const doChangeLanguage = (e) => {
    setLang(e.target.value);
    sessionStorage.lang = e.target.value;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <select value={lang} onChange={(e) => doChangeLanguage(e)}>
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
        <div>
          {/* hook 사용 / id는 번역할 object의 key */}
          {intl.formatMessage({ id: 'App.test' })}
        </div>
        {/* date도 각 locale에 맞게 자동 변환 (intl 메소드) */}
        <div>{intl.formatDate(Date.now())}</div>
        <div>
          {/* text에 value를 넘겨 줄 수 있음 */}
          <FormattedMessage
            id="App.getValue"
            values={{ value: 'react-intl' }}
          />
        </div>
        <Link to="/app-class">
          <button>
            {/* 컴포넌트 사용 / id는 번역할 object의 key */}
            <FormattedMessage id="App.button" />
          </button>
        </Link>
      </header>
    </div>
  );
};

export default App;
