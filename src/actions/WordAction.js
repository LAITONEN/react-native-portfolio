import { NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import _ from 'lodash';

import { 
	EMPTY_FIELDS_ERROR, 
	EMPTY_VALUE, 
	UPDATED_DICTIONARY, 
} from './types';

import { adjust } from '../functions';

// constants to be used in multiple ACs
const DATABASE = (location) => firebase.database().ref(location);
const routeName = 'list';

// empty error message in the Add and Edit components 
export const emptyValue = (pair) => {
	return { type: EMPTY_VALUE, payload: pair };
};

// load English dictionary and then on every change in the dictionary object
export const loadExplanationDictionary = (navigation, dictionaryName) => {
	const access = `/users/${firebase.auth().currentUser.uid}/explanation`;
	const type = UPDATED_DICTIONARY;
	return (dispatch) => {
		DATABASE(access).on('value', snapshot => {
			dispatch({ type, dictionaryName, payload: snapshot.val() });
		});
	};
};

// load Native Language to English dictionary and then on every change in the dictionary object
export const loadTranslationDictionary = (navigation, dictionaryName) => {
	const access = `/users/${firebase.auth().currentUser.uid}/translation`;
	const type = UPDATED_DICTIONARY;
	return (dispatch) => {
		DATABASE(access).on('value', snapshot => {
			dispatch({ type, dictionaryName, payload: snapshot.val() });
		});
	};
};

// load Synonyms dictionary once and then on every change in the dictionary object
export const loadVarietyDictionary = (navigation, dictionaryName) => {
	const access = `/users/${firebase.auth().currentUser.uid}/variety`;
	const type = UPDATED_DICTIONARY;
	return (dispatch) => {
		DATABASE(access).on('value', snapshot => {
			dispatch({ type, dictionaryName, payload: snapshot.val() });
		});
	};
};

// dispatch action to filter SectionList based on searchInput
export const filterList = (list, navigation, predicate) => {
	const { dictionaryName } = navigation.state.params;
	const object = { type: 'filter_list', list, dictionaryName, predicate };

	return dispatch => dispatch(object);
};

// add word to the database
export const createWord = ({ definitions, examples, rules, synonyms, tags, term }, navigation) => {

// DECLARATIONS (grouped and sorted in the use order)
	const { params } = navigation.state;
	const { dictionaryName } = params; // prop that hold string of the dictionary name to add a word to
	const error = () => definitions === '' || term.length < 2;
	const payload = 'Fill in the first two fields!';
	const type = EMPTY_FIELDS_ERROR;

	const access = `/users/${firebase.auth().currentUser.uid}/${dictionaryName}`; 
	const word = { definitions, examples, guessed: 0, notGuessed: 0, 
								rules, synonyms, tags, term: adjust(term) };

	const actions = [NavigationActions.navigate({ routeName, params })];
	const resetToList = NavigationActions.reset({ index: 0, actions });

// ACTIONS
	// if error exists - dispatch an action to the component which called this AC
	// if it does not - add word to the database and dispatch Navigation Action 
	// that resets the navigation state and navigates to the 'list' page
	return (dispatch) => {
		if (error()) dispatch({ type, payload });
		else DATABASE(access).push(word).then(() => navigation.dispatch(resetToList));
	};
};


// edit certain word's value in the database
export const editWord = ({ definitions, examples, rules = '', synonyms, tags, term, uid }, navigation) => {
// DECLARATIONS (grouped and sorted by in the by use order)
	// prop that hold string of the dictionary name to add a word to
	const { dictionaryName } = navigation.state.params;  
	const error = () => definitions === '' || term.length < 2;
	const type = EMPTY_FIELDS_ERROR;
	const payload = 'Fill in the first two fields!';

	const access = `/users/${firebase.auth().currentUser.uid}/${dictionaryName}/${uid}`;
	const word = { definitions, examples, rules, synonyms, tags, term: term.trim() };

	const { params } = navigation.state;
	const details = { definitions, examples, dictionaryName, rules, uid, synonyms, tags, term };
// listHeaderTitle: '' for the List => "onLongPress" => Edit => "onSavePress" => Details
// if I decide to opt for this approach, currently it is Edit => "onSavePress" => List
// if this assignment is omitted, 
 	const paramsForDetails = { ...params, useTitle: true, word: details };

// action depends on the page from where the user was navigated to EditWord screen
	// if from WordDetails => action navigates to WordDetails stacked on top of the List screen
	// list page receives generic params, details page, in addition receives word object

	// if from List screen => to List screen
	const resetAction = () => {
		if (!params.useTitle) {
			return NavigationActions.reset({ index: 1, actions: [
			  	NavigationActions.navigate({ routeName, params: { ...params, searchInputAutoFocus: false } }),
			    NavigationActions.navigate({ routeName: 'details', params: paramsForDetails })] });
		}
		return NavigationActions.reset({ index: 0, actions: [
			  	NavigationActions.navigate({ routeName, params })] });
	};

// ACTIONS
	// same as in createWord AC:
	// if error exists - dispatch an action to the component which called this AC
	// if it does not - edit word in the database and dispatch Navigation Action 
	// that resets the navigation state 
	// and navigates to the 'details' page stacked on top of the 'list' page
	return (dispatch) => {
		if (error()) dispatch({ type, payload });
	// reset in order to update data on the previous pages in the stack
		else DATABASE(access).set(word).then(() => navigation.dispatch(resetAction()));
	};
};

// delete word from the database
export const deleteWord = (navigation) => {
// DECLARATIONS
	const { currentUser } = firebase.auth(); // current user
	const { params } = navigation.state;
	// dictionary - prop that hold string of the dictionary name to add a word to
	// word is required for its id in the database
	const { dictionaryName, word } = params;

	const access = `/users/${currentUser.uid}/${dictionaryName}/${word.uid}`;
	const actions = [NavigationActions.navigate({ routeName, params: { ...params, searchInputAutoFocus: true } })];
	const resetToList = NavigationActions.reset({ index: 0, actions });

// ACTIONS
	// add word to the database and dispatch Navigation Action 
	// that resets the navigation state and navigates to the 'list' page
	return () => {
		DATABASE(access).remove().then(() => navigation.dispatch(resetToList));
	};
};








