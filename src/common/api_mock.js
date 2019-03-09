import uuid from 'uuid/v1';

/* --- ERRORS FOUND ---

const keyBy = ( k, xs ) => xs.reduce( ( target, x ) => ( {
  ...target,
  [ x[ k ] ]: x
} ), {} );

 1) In theory (just in theory) if two identical uuid will be generated,
 you will lost a record after assigning it to the object with the same key
 (both 'services' and 'customers' arrays can be corrupted)

 2) There are no guarantee that object keys will be sorted exactly as the source arrays are, so
 Object.values( services )[ 0 ].id can point to the different service

 for more complex transformations of JSON data it is better to use 'normalizr' lib

*/

let services = [
  {
    name: 'Wash',
    durationInMinutes: 15
  },
  {
    name: 'Dye',
    durationInMinutes: 90
  },
  {
    name: 'Trim',
    durationInMinutes: 60
  },
  {
    name: 'Dry',
    durationInMinutes: 10
  }
].map( service => ( {
  ...service,
  id: uuid()
} ) );

let customers = [
  {
    name: 'Little My',
    email: 'little.my@moomin.valley',
    phone: '',
    favoriteServices: [
      services[ 0 ].id,
      services[ 1 ].id
    ]
  },
  {
    name: 'Snufkin',
    email: 'greenhat@digitalnomad.com',
    phone: '',
    favoriteServices: [
      services[ 3 ].id
    ]
  },
  {
    name: 'Moomintroll',
    email: '',
    phone: '1 (000) 909-0990',
    favoriteServices: []
  },
  {
    name: 'The Groke',
    email: '',
    phone: '1 (000) 000-0000',
    favoriteServices: [
      services[ 1 ].id,
      services[ 3 ].id
    ]
  }
].map( customer => ( {
  ...customer,
  id: uuid()
} ) );

export const getServices = () => {
  return Promise.resolve( services );
};

export const getCustomers = () => {
  return Promise.resolve( customers );
};

/* JUST TO EMULATE THE SERVER DATABASE */

const API_STORAGE_CUSTOMERS = 'apiLocalCustomers';
const API_STORAGE_SERVICES = 'apiLocalServices';

const loadFromLS = name => {
  try {
    const result = window.localStorage.getItem( name ) ;
    return result ? JSON.parse( result ) : null;
  } catch ( ex ) {
    console.error( '[ex] Storage.read', ex );
    return null;
  }
};

const saveToLS = ( name, data ) => {
  try {
    window.localStorage.setItem( name, JSON.stringify( data ) );
  } catch ( ex ) {
    console.error( '[ex] Storage.write', ex );
  }
};

let loaded = loadFromLS( API_STORAGE_CUSTOMERS );
loaded ? customers = loaded : saveToLS( API_STORAGE_CUSTOMERS, customers );
loaded = loadFromLS( API_STORAGE_SERVICES );
loaded ? services = loaded : saveToLS( API_STORAGE_SERVICES, services );
export const saveCustomers = data => saveToLS( API_STORAGE_CUSTOMERS, data );
export const saveServices = data => saveToLS( API_STORAGE_SERVICES, data );
