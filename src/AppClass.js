import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Locale from './context/LocaleContext';

/**
 * FormattedMessage: 번역하고 싶은 부분에 사용하는 컴포넌트
 * injectIntl: 클래스형 컴포넌트에서 컴포넌트대신 text만 사용하고 싶을때 제공하는 HOC (예: placeholder 부분)
 */
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl';

class AppClass extends Component {
  static contextType = Locale;

  doChangeLanguage = (e) => {
    this.context.actions.setLocale(e.target.value);
    sessionStorage.lang = e.target.value;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <select
              value={this.context.state.locale}
              onChange={(e) => this.doChangeLanguage(e)}
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
          <div>
            {/* 컴포넌트 사용 / id는 번역할 object의 key */}
            <FormattedMessage id="AppClass.test" />
          </div>
          <div>
            <FormattedDate value={Date.now()} />
          </div>
          <div>
            {this.props.intl.formatMessage(
              { id: 'AppClass.getValue' },
              { value: 'react-intl' },
            )}
          </div>
          <Link to="/">
            <button>
              {/* HOC의 props를 받아와 사용 / id는 번역할 object의 key */}
              {this.props.intl.formatMessage({ id: 'AppClass.button' })}
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

// HOC 적용
export default injectIntl(AppClass);
