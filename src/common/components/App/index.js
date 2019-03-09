import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'store';
import 'common/globals';
import 'assets/styles/app.css';
import { Index } from 'common/components';

class App extends Component {
  render() {
    return <Provider store={ store }>
      <PersistGate loading= { null } persistor={ persistor }>
        <Index />
      </PersistGate>
    </Provider>;
  }
}

export default App;
