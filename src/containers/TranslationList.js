import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';


import { filterList, loadTranslationDictionary } from '../actions';
import { List, Spinner } from '../reusable/';

class TranslationList extends Component {

	constructor(props) {
		super(props);
		this.state = { screenHeight: props.navigation.state.params.fullHeight, showSpinner: false };
	}

	componentWillMount() {
		if (!this.props.sections) {
			this.setState({ showSpinner: true });
		}
	}

	componentDidMount() {
		const { sections, database, filterList, loadTranslationDictionary, navigation } = this.props;
		const { params } = navigation.state;
	    if (!sections) {
			loadTranslationDictionary(navigation, 'translation');
		}
		if (params.predicate) {
			filterList(database.translation, navigation, params.predicate);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.database.variety) this.setState({ showSpinner: false });
	}

	shouldComponentUpdate(nextProps, nextState) {

		const { sections, database } = this.props;

		if (!sections || (nextProps.sections === sections && this.state === nextState) ||
			database.translation.length + 1 === nextProps.database.translation.length) {
			return false;
		}
 		return true;
	}
	
	onCancelSearchPress() {
		const { database, filterList, navigation } = this.props;
		navigation.setParams({ predicate: '', showSearch: false, });
		Keyboard.dismiss();
		filterList(database.translation, navigation, '');
	}

	filterListByPredicate(searchFor = '') {
		const { database, filterList, navigation } = this.props;
		navigation.setParams({ predicate: searchFor });
		filterList(database.translation, navigation, searchFor.toLowerCase());
	}


	render() {
		const { sections, database, navigation } = this.props;
		const { screenHeight } = this.state;
		if (this.state.showSpinner) return <Spinner size="large" text='Loading' />;
		return (
			<List 
				dictionary={database.translation}
				screenHeight={screenHeight}
				filterListByPredicate={this.filterListByPredicate.bind(this)}
				navigation={navigation}
				onCancelPress={this.onCancelSearchPress.bind(this)}
				sections={sections}
			/>
		);
	}
}

const mapStateToProps = ({ database, search }) => {

		return { sections: search.translation, database };
};

export default connect(mapStateToProps, { filterList, loadTranslationDictionary })(TranslationList);
