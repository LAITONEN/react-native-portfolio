import { NavigationActions } from 'react-navigation';
import firebase from 'firebase';

// constants
import { 
	VALUE_CHANGED,
	LOGIN_USER, 
	LOGIN_USER_FAIL, 
	LOGIN_USER_SUCCESS, 
	} from './types'; 

export const valueChanged = (value, key) => {
	// receives e-mail or password to update in the component
	return {
		type: VALUE_CHANGED,
		value,
		key,
	};
};


export const loginUser = ({ email, password }, navigation) => {	
	// log-in process
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(user => loginUserSuccess(dispatch, user, navigation)) // call the function below
		.catch((error) => {
			console.log(error);
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((user) => loginUserSuccess(dispatch, user, navigation)) // call the function below
			.catch(() => loginUserFail(dispatch));  // call the function below
		});
	};
};


const loginUserFail = (dispatch) => {
		dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user, navigation) => {
		dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
		// reset navigation state and navigate to dictionaries screen (TabNavigator) + pass params
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ 
					routeName: 'dictionaries', 
					params: { ...navigation.state.params } 
				})
			],
		});
		navigation.dispatch(resetAction);
};










