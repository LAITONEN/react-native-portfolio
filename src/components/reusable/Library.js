import _ from 'lodash';

// This file consists of functions divided into 2 sections. Read comments carefully.

// SECTION 1: ARRANGE DATA FOR LIST SCREEN (called from the reducer)
// (functions are sorted in the order of execution)

// decider function for how to arrange data
export function arrangeForSectionList(dictionary, predicate) {
	if (predicate) {
		// filter dictionary and construct appropriate data format for SectionList
		return constructFilteredSections(pickWords(dictionary, predicate));
	}
	// constructor appropriate format for SectionList
	return constructUnfilteredSections(dictionary);
}

// take dictionary and return only the words that match the predicate
function pickWords(dictionary, predicate) {
	let searchArray = predicate.toLowerCase().split(' ');
	if (predicate.length > 2) searchArray = searchArray.filter((item) => item.length > 2);

	// for each element in the dictionary, run searchArray =>searchArray.length+1<= times
	const filteredWords = _.filter(dictionary, word => {

		// values of all props of the word concatenated into one string and lowercased
		const wordValuesConcat = Object.values(word).join(' ').toLowerCase();
		let matchedIn = '';

		// find matches in word's props for each item in a predicate array
		_.each(searchArray, (one) => { 
			// if match exists - call 'add' function (below) and append the returned result to 'matchedIn'
			if (wordValuesConcat.includes(one)) matchedIn += add(word, one); 
		});

		// if there was at least 1 match
		if (matchedIn) {

			// count the number of spaces, which is the number of matches in the word's props;
			const howMany = (matchedIn.match(/ /g) || []).length;
			
			// take string, remove unnecessary spaces (at the start and the end of the string),
			// then turn string into array and for each word in a string:
			// create new prop in a 'matchedInObject' with the word as a key and +1 increment as a value:
			// 'definitions: 1', 'tags: 2' a.s.o
			const matchedInObject = {};
			matchedIn.trim().split(' ').forEach(value => {
				matchedInObject[value] = matchedInObject[value] ? matchedInObject[value] + 1 : 1;
			});
			
			// matchedIn is now an array where each value resembles this:
			// 'definitions(1)', 'tags(2)' etc, where a number indicates the number of matches
			matchedIn = _.map(matchedInObject, (v, i) => {
				return `${[i]}(${v})`;
			});
			
			// create new prop in the current word
			word.match = { 
				howMany,
				where: matchedIn.toString().replace(',', ' ').trim(), // where did matches occur
			};
			return true; // indicates that match existed, hence the word should be returned
		}
		return false; // match did not exist - do not return the word
	}); // end of the iteration through one word of a dictionary
	//  this value goes to the function which called pickWords() (currently constructFilteredSections())
	return filteredWords; 
}


function add(word, predicateItem) { 
		let result = '';
		// take key-value pair of each entry (prop) of a word
		Object.entries(word).forEach(([key, value]) => {
			if (typeof value === 'string' && key !== 'uid') {
				const check = value.toLowerCase();
				// if match exists in the current key - add it to the result string
				if (key === 'term' && check.startsWith(predicateItem)) { 
					// '1' indicates that the value of a word starts with the predicate string
					result += `1${key} `; 
				}
				else if (check.includes(predicateItem)) {
					result += `${key} `;
				}
			}
		});	
		return result; 
}

// turn the input into data format acceptable by SectionList
function constructFilteredSections(dictionary) {

		// split value.match.where string into array by 'how'
		// i.e. if how === ' ' - split string by space
		// if how === '' - split string by characters
		const whereArr = (value, how) => value.match.where.split(how);

		// group words by the type of match (creating the section names at the same time)
		let output = _.groupBy(dictionary, value => {
			if (value.match.where.includes('1term')) return 'DirectMatch';
			else if (!value.match.where.startsWith('examples')) return 'CloseMatch';
			return 'ExamplesMatch';
		});

			// sort data in output.CloseMatch by the amount of matches
		if (output.CloseMatch) {
			output.CloseMatch = 
				_.orderBy(output.CloseMatch, [value => { 
				return whereArr(value, '') // make array of single characters of match.where
				.filter(char => Number(char)) // remove characters that are not numbers
				.reduce((a, b) => +a + +b); }], ['desc']); // sort by number in the descending order

			// remove Number (like '(1)' or '(3)') from match.where strings
			output.CloseMatch = _.each(output.CloseMatch, (v, i, a) => {
				a[i].match.where = a[i].match.where.replace(/\(1\)/g, '');
			});
		}

		// sort data in 'output.ExamplesMatch' by the number of matches in the descending order
		if (output.ExamplesMatch) {
			output.ExamplesMatch = _.orderBy(
				output.ExamplesMatch, [value => value.match.howMany], ['desc']
			);
		}

		// turn data into SectionList format
		output = _.reduce(output, (res, v, i) => {
			res.push({ data: v, key: i.split(/(?=[A-Z])/).join(' ') });
			return res;
		}, []);

		const order = ['Direct Match', 'Close Match', 'Examples Match'];

		// sort data in the 'output' by  the order specified in the 'order' const above
		// if a > b - move b lower
		output.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
		return output;
}


function constructUnfilteredSections(dictionary) {

	// array => object
	// covnert data into Section List data format
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
		
