import { UPDATED_DICTIONARY } from '../actions/types';

import { toArrayAndSort } from '../functions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	const { dictionaryName, payload, type } = action;
	switch (type) {

		case UPDATED_DICTIONARY:
			return { ...state, [dictionaryName]: toArrayAndSort(payload) };
			
		default:
		return state;
	}
};
