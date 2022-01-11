import React, { createContext, useState } from 'react';

/**
 * 필요한 context를 제공하기위한 IntlProvider
 */
import { IntlProvider } from 'react-intl';

/**
 * 번역 json 파일 모음
 */
import locales from '../locales';

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

const LocaleContext = createContext();
export default LocaleContext;

export const LocaleContextProvider = (props) => {
  const [locale, setLocale] = useState(sessionStorage.lang);

  const context = {
    state: { locale },
    actions: { setLocale },
  };
  return (
    <LocaleContext.Provider value={context}>
      <IntlProvider
        // locale: 적용할 locale, ISO 693-1 기준으로 작성해야함
        locale={locale}
        // messages: 번역할 json파일
        messages={flattenMessages(locales[locale])}
        // locale default 값, message에 locale에서 설정한 값이 없으면 defaullLocale 값으로 번역
        defaultLocale="ko"
      >
        {props.children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
