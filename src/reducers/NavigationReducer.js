import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

const initialAppState = AppNavigator.router.getStateForAction(NavigationActions.init());

export default (state = initialAppState, action) => {

  	const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
};