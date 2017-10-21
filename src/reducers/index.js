import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import NavigationReducer from './NavigationReducer';
import DictionariesChangeReducer from './DictionariesChangeReducer';
import DictionariesFetchReducer from './DictionariesFetchReducer';
import DictionariesSearchReducer from './DictionariesSearchReducer';

// First Word indicates to what part of the app the reducer
// is refered to (Auth, Dictionaries, Games, Settings)
export default combineReducers({
	app: NavigationReducer,
	auth: AuthReducer,
	database: DictionariesFetchReducer,
	generic: DictionariesChangeReducer,
	search: DictionariesSearchReducer,
});




