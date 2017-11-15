import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';


import { filterList, loadVarietyDictionary } from '../actions';
import { List, Spinner } from '../reusable/';
import { exists } from '../functions';

class VarietyList extends Component {

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
	    const { sections, database, filterList, loadVarietyDictionary, navigation } = this.props;
		const { params } = navigation.state;
		if (!sections) {
			loadVarietyDictionary(navigation, 'variety');
		}
		if (params.predicate) {
			filterList(database.variety, navigation, params.predicate);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.database.variety) {
			this.setState({ showSpinner: false });
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { sections, database } = this.props;
		// statement is unique since the dictionary is in the last tab
		if ((nextProps.sections === sections && this.state === nextState) ||
			exists(() => database.variety.length + 1) === exists(() => nextProps.database.variety.length)) {
			return false;
		}
 		return true;
	}

	onCancelSearchPress() {
		const { database, filterList, navigation } = this.props;
		navigation.setParams({ predicate: '', showSearch: false, });
		Keyboard.dismiss();
		filterList(database.variety, navigation, '');
	}

	filterListByPredicate(searchFor = '') {
		const { database, filterList, navigation } = this.props;
		navigation.setParams({ predicate: searchFor });
		filterList(database.variety, navigation, searchFor.toLowerCase());
	}

	render() {
		const { sections, database, navigation } = this.props;
		const { screenHeight } = this.state;
		if (this.state.showSpinner) return <Spinner size="large" text='Loading' />;
		return (
			<List 
				dictionary={database.variety}
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

		return { sections: search.variety, database };
};

export default connect(mapStateToProps, { filterList, loadVarietyDictionary })(VarietyList);
