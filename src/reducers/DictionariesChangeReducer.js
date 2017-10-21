import { EMPTY_FIELDS_ERROR, EMPTY_VALUE } from '../actions/types';

const INITIAL_STATE = { 
	definitions: '', 
	error: '', 
	examples: '', 
	loading: false,
	searchFor: '',
	synonyms: '',
	tags: '', 
	term: '' };

export default (state = INITIAL_STATE, action) => {
	switch (action.type){
			
		case EMPTY_VALUE:
			return { ...state, [action.payload.name]: '' };

		case EMPTY_FIELDS_ERROR:
			return { ...state, error: action.payload };

		default:
			return state;
	}
};