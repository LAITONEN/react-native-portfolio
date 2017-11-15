import React from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';

import { filterList, loadExplanationDictionary } from '../actions';
import { List, Spinner } from '../reusable/';

class ExplanationList extends React.Component {

	constructor(props) {
		super(props);
		this.state = { screenHeight: props.navigation.state.params.fullHeight, showSpinner: false };
	}

	componentWillMount() {
	// this.props.sections = SectionList data
		if (!this.props.sections) {
			this.setState({ showSpinner: true });
		}
	}

	componentDidMount() {
		const { sections, database, filterList, loadExplanationDictionary, navigation } = this.props;
		const { params } = navigation.state;
	    if (!sections) {
	    	loadExplanationDictionary(navigation, 'explanation');
	    }
		// if searchInput is not empty - call filterList AC to show data based on the predicate
		if (params.predicate) {
			filterList(database.explanation, navigation, params.predicate);
		}
	}

	componentWillReceiveProps(nextProps) {
		// stops showing spinner (on the page's initial load) only when 
		// all the data from all dictionaries has been fetched
		if (nextProps.database.variety) this.setState({ showSpinner: false });
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { sections, database, navigation } = this.props;

// SKIP RE-RENDER:

	// 1.during the initial load
		if (!sections) return false;

	// 2. when the layout / local data have not changed
		else if (nextProps.sections === sections && this.state === nextState) return false;

	// 3. when local version of the dictionary has updated, but sectionList data has not
		else if (database.explanation.length + 1 === nextProps.database.explanation.length) {
			return false;
		}
		/*if (sections !== nextProps.sections) {
			//console.log('');
			//console.log('sections changed');
			//console.log('before', sections);
			//console.log('after', nextProps.sections);
			//console.log('');
		}*/
 		return true;
	}
	
	onCancelSearchPress() {
		const { database, filterList, navigation } = this.props;
		// empty the value of searchInput + hide the searchInput
		// then dismiss keyboard
		// then show the full list of data
		navigation.setParams({ predicate: '', showSearch: false, });
		Keyboard.dismiss();
		filterList(database.explanation, navigation, '');
	}

// when a user changes a searchInput's value - call this method
	filterListByPredicate(searchFor = '') {
		const { database, filterList, navigation } = this.props;

	// 1. set the value to show in searchInput
		navigation.setParams({ predicate: searchFor }); //async

	// 2. filter data based on the predicate
		filterList(database.explanation, navigation, searchFor.toLowerCase());
	}


	render() {
		//console.log('listner', this.keyboardWillShowListener);
		const { sections, database, navigation } = this.props;
		const { screenHeight } = this.state;

		// show ActivityIndicator while the component is not ready to be presented
		if (this.state.showSpinner) return <Spinner size="large" text='Loading' />;

		// show Search and SectionList components
		return (
			<List 
				dictionary={database.explanation}
				filterListByPredicate={this.filterListByPredicate.bind(this)}
				navigation={navigation}
				onCancelPress={this.onCancelSearchPress.bind(this)}
				screenHeight={screenHeight}
				sections={sections}
			/>
		);
	}
}

const mapStateToProps = ({ database, search }) => {

		return { sections: search.explanation, database };
};

export default connect(mapStateToProps, { filterList, loadExplanationDictionary })(ExplanationList);
