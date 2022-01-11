const LANGUAGE_LIST = {
  'en-US': 'en',
  en: 'en',
  'ko-KR': 'ko',
  ko: 'ko',
  ja: 'ja',
};

const getLanguage = () => {
  const lang = window.navigator.language;
  sessionStorage.lang = LANGUAGE_LIST.hasOwnProperty(lang)
    ? LANGUAGE_LIST[lang]
    : 'ko'; // 언어가 없을 시 한국어 default value로 설정
};

export default getLanguage;
