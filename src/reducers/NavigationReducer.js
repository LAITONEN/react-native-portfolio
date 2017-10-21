import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

// initial react-navigation state
const initialAppState = AppNavigator.router.getStateForAction(NavigationActions.init());

export default (state = initialAppState, action) => {
	// new react-navigation state that fires when I navigate between pages, setParams of navigation.state
	// or interact with navigation props in any other way
  	const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
};