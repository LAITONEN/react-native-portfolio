import _ from 'lodash';

// This file consists of functions divided into 2 sections. 

// SECTION 1: ARRANGE DATA FOR LIST SCREEN (called from the reducer)
// (functions are sorted in the order of execution)


export function arrangeForSectionList(dictionary, predicate) {
	if (predicate) {
		return constructFilteredSections(pickWords(dictionary, predicate));
	}
	return constructUnfilteredSections(dictionary);
}


function pickWords(dictionary, predicate) {
	let searchArray = predicate.toLowerCase().split(' ');
	if (predicate.length > 2) searchArray = searchArray.filter((item) => item.length > 2);

	const filteredWords = _.filter(dictionary, word => {

		const wordValuesConcat = Object.values(word).join(' ').toLowerCase();
		const keysOfSearchItemsMatches = [];

		searchArray.forEach(searchItem => { 
			if (wordValuesConcat.includes(searchItem)) {
				keysOfSearchItemsMatches.push(findMatchingKeys(word, searchItem, predicate.toLowerCase())); 
			}
		});
		
		if (keysOfSearchItemsMatches.length > 0) {
			const howMany = keysOfSearchItemsMatches.length;
			const allMatches = keysOfSearchItemsMatches.map(subArr => {
				return subArr.join(' ');
			}).join(' ').split(' ');

			

			const totalCount = {};
			allMatches.forEach(value => {
				totalCount[value] = totalCount[value] ? totalCount[value] + 1 : 1;
			});

			const matchedInNote = _.map(totalCount, (v, i) => {
				return `${[i]}(${v})`;
			}).join(' ').trim();
			
			word.match = { 
				howMany,
				where: matchedInNote,
			};
			return true; // match existed => return word
		}
		return false; // match did not exist => do not return the word
	});
	return filteredWords; 
}


function findMatchingKeys(word, searchItem, wholeSearch) { 

		if (word.term.toLowerCase().startsWith(wholeSearch)) return ['1term'];
		let result = [];
		const wordKeysAndValues = Object.entries(word).filter(([key, value]) => {
			return typeof value === 'string' && key !== 'uid';
		});

		result = wordKeysAndValues.filter(([key, value]) => value.toLowerCase().includes(searchItem))
			.map(([key]) => key);

		return result; // if something is wrong with the search check this value
}

function constructFilteredSections(dictionary) {

		const splitBy = (value, how) => value.match.where.split(how);

		const hasNecessaryValues = (v) => {
			return v.includes('definitions') ||
					v.includes('tags') ||
					v.includes('term') ||
					v.includes('synonyms') ||
					v.includes('rules');
		};

		let words = _.groupBy(dictionary, ({ match: { where } }) => {
			if (where.includes('1term')) return 'DirectMatch';
			else if (where.split(' ').some(hasNecessaryValues)) return 'CloseMatch';
			return 'ExamplesMatch';
		});

		if (words.CloseMatch) {
			words.CloseMatch = 
				_.orderBy(words.CloseMatch, [wordValues => { 
				return splitBy(wordValues, '')
				.filter(char => +char)
				.reduce((a, b) => +a + +b); }], ['desc']);

			words.CloseMatch = _.each(words.CloseMatch, (v, i, a) => {
				a[i].match.where = a[i].match.where.replace(/\(1\)/g, '');
			});
		}

		if (words.ExamplesMatch) {
			words.ExamplesMatch = _.orderBy(
				words.ExamplesMatch, [value => value.match.howMany], ['desc']
			);
		}

		// turn data into SectionList format
		words = _.reduce(words, (res, v, i) => {
			res.push({ data: v, key: i.split(/(?=[A-Z])/).join(' ') });
			return res;
		}, []);

		const order = ['Direct Match', 'Close Match', 'Examples Match'];

		// sort data in the 'words' by  the order specified in the 'order' const above
		// if a > b - move b lower
		words.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
		return words;
}


function constructUnfilteredSections(dictionary) {

	// array => object
		let output = _.groupBy(dictionary, value => value.term.charAt(0).toUpperCase());
		output = _.reduce(output, (res, v, i) => {
				res.push({ data: v, key: i });
				return res;
			}, []);
		return output;
}



// SECTION 2: REUSABLE FUNCTIONS (called from anywhere else in the app)
// (functions are sorted in the alphabetical order)

// trim the string and turn the first letter to upperCase
export function adjust(term) {
		let result = term.trim();
		const char = result.charAt(0);
		const charUp = char.toUpperCase();
		if (char !== charUp) result = (charUp + result.replace(char, ''));
		return result;
}

// check if the props of multilevel object (prop1.prop2.prop3) exist
// if they do - return whatever was passed in the closure
// if they do not - return undefined to avoid error
export function exists(closure) {
	try { return closure(); }
	catch (e) { return undefined; }
}

// find out the length of the object
export function length(obj) { 
	if (obj) return _.reduce(obj, (res, v) => res + v.data.length, 0);
	return undefined;
}

// take object, turn into array and sort in ascending order
export function toArrayAndSort(dictionary) {
	// obj => arr 
		const words = _.map(dictionary, (objProp, uid) => { 
		return { ...objProp, uid };
		});

	// Sort asc (test is an array)
		const test = words.sort((a, b) => {
			if (a.term < b.term) return -1;
			else if (a.term > b.term) return 1;
			return 0;
		});

		return test;
}
		
