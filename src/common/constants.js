export const AUTHOR = 'Anton Kochetkov';
export const NAV = [
  { path: '/', title: 'Customers', component: 'CustomersList' },
  { path: '/about/', title: 'About', component: 'AboutInfo' }
];
export const IDLE = 'IDLE';
export const LOADING = 'LOADING';
export const FAILED = 'FAILED';
export const LOADING_SPINNER_DEBOUNCE = 1000;
export const NEW_ITEM = 'NEW_ITEM';

export const EMAIL_FILTERS = [
  /^([a-z0-9]([a-z0-9_.\-+'=])*)?[a-z0-9]@[a-z0-9][a-z0-9\-.]*[a-z0-9]\.[a-z]{2,7}$/
];
export const PHONE_FILTERS = [
  /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,
  /^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*$/,
  /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/,
  /^\(0[1-9]{1}\)[0-9]{8}$/,
  /^1?[-. ]?(\(\d{3}\)?[-. ]?|\d{3}?[-. ]?)?\d{3}?[-. ]?\d{4}$/,
  /(^\([0]\d{1}\))(\d{7}$)|(^\([0][2]\d{1}\))(\d{6,8}$)|([0][8][0][0])([\s])(\d{5,8}$)/,
  /(1 )?\d{3} \d{3}-\d{4}/,
  /^\b\d{2,3}-*\d{7}\b$/,
  /^(\d{5}-\d{2}-\d{7})*$/,
  /^(0)44[\s]{0,1}[-]{0,1}[\s]{0,1}2[\s]{0,1}[1-9]{1}[0-9]{6}$/
];
