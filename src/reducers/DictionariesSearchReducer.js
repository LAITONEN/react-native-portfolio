import { FILTER_LIST, UPDATED_DICTIONARY } from '../actions/types';

import { arrangeForSectionList, toArrayAndSort } from '../components/reusable/Library';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	const { dictionary, list, payload, predicate, type } = action;

	switch (type) {

		case (FILTER_LIST):
			return { ...state, [dictionary]: arrangeForSectionList(list, predicate) };

		case (UPDATED_DICTIONARY): 
			return { ...state, [dictionary]: arrangeForSectionList(toArrayAndSort(payload)) };

		default:
			return state;
	}
	
};