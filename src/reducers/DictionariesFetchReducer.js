import { UPDATED_DICTIONARY } from '../actions/types';

import { toArrayAndSort } from '../components/reusable/Library';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	const { dictionary, payload, type } = action;
	switch (type) {

		case UPDATED_DICTIONARY:
			return { ...state, [dictionary]: toArrayAndSort(payload) };
			
		default:
		return state;
	}
};
