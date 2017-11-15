import React from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
// navigatOR because it uses AppConfig there as well so Navigator (file) = Navigation + Config (files)
import AppWithNavigationState from './src/navigators/AppNavigator'; 
import store from './src/store';

export default class App extends React.Component {

  componentWillMount() {
    const config = { 
        // paste the contents of your firebase config object here
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      // Redux store being wrapped around (passed down) App with react-navigation state
      <Provider store={store}>
          <AppWithNavigationState />
      </Provider>
    );
  }
}