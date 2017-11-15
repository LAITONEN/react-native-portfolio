import { FILTER_LIST, UPDATED_DICTIONARY } from '../actions/types';

import { arrangeForSectionList, toArrayAndSort } from '../functions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	const { dictionaryName, list, payload, predicate, type } = action;

	switch (type) {

		case (FILTER_LIST):
			return { ...state, [dictionaryName]: arrangeForSectionList(list, predicate) };

		case (UPDATED_DICTIONARY): 
			return { ...state, [dictionaryName]: arrangeForSectionList(toArrayAndSort(payload)) };

		default:
			return state;
	}
	
};