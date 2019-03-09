import * as constants from './constants';

export const isValidEmail = val => {
  for ( const regExp of constants.EMAIL_FILTERS ) if ( regExp.test( val ) ) return true;
  return false;
};

export const isValidPhone = val => {
  for ( const regExp of constants.PHONE_FILTERS ) if ( regExp.test( val ) ) return true;
  return false;
};

export const splitName = value => {
  value = value || '';
  return value
    .trim()
    .split( ' ' )
    .filter( value => value );
};
