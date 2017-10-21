import {  
	LOGIN_USER,
	LOGIN_USER_FAIL, 
	LOGIN_USER_SUCCESS, 
	VALUE_CHANGED,
} from '../actions/types'; 

const INITIAL_STATE = { email: '', error: '', loading: false, password: '', user: null };

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case LOGIN_USER:
			return { ...state, loading: true }; 

		case VALUE_CHANGED:
			return { ...state, [action.key]: action.value }; 

		case LOGIN_USER_SUCCESS:
			return { ...INITIAL_STATE, user: action.payload }; 

		case LOGIN_USER_FAIL:
			return { ...state, error: 'Authentication Failed', loading: false }; 

		default:
			return state;
	}
};