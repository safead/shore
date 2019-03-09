import * as constants from 'common/constants';

export const getAllCustomers = state => state.customers.items;
export const getCustomerById = ( state, id ) => {
  if ( id === constants.IDLE ) return null;
  if ( id === constants.NEW_ITEM ) {
    return {
      name: '',
      email: '',
      phone: '',
      favoriteServices: []
    };
  }
  return state.customers.items.find( item => item.id === id );
};

