import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Keyboard, LayoutAnimation, SectionList, View } from 'react-native';

import { filterList, loadExplanationDictionary } from '../actions';
import { Search, Spinner } from './reusable/';
import ListItem from './ListItem';
import { sectionListStyle } from '../styles';

class ExplanationList extends Component {

	constructor(props) {
		super(props);
		this.state = { height: props.navigation.state.params.normalHeight, loading: false };
	}

	componentWillMount() {
		// console.log('will mount');
		const { arranged, database, filterList, loadExplanationDictionary, navigation } = this.props;
		const { params } = navigation.state;
		this.keyboardWillShowListener = Keyboard.addListener(
							'keyboardWillShow', this.keyboardWillShow.bind(this));
		this.keyboardWillHideListener = Keyboard.addListener(
							'keyboardWillHide', this.keyboardWillHide.bind(this));
		if (!arranged) {
			this.setState({ loading: true });
			loadExplanationDictionary(navigation, 'explanation');
		}
		if (params.predicate) {
			filterList(database.explanation, navigation, params.predicate);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.database.variety) this.setState({ loading: false });
	}

	shouldComponentUpdate(nextProps, nextState) {

		const { arranged, database } = this.props;

		if (!arranged || (nextProps.arranged === arranged && this.state === nextState) ||
			database.explanation.length + 1 === nextProps.database.explanation.length) {
			return false;
		}
 		return true;
	}


	componentDidUpdate() {
		// console.log('did update');
	}

	componentWillUnmount() {
		this.keyboardWillShowListener.remove();
	    this.keyboardWillHideListener.remove();
	}

	filterListByPredicate(searchFor = '') {
		const { database, filterList, navigation } = this.props;
		navigation.setParams({ predicate: searchFor });
		filterList(database.explanation, navigation, searchFor.toLowerCase());
	}

	cancelSearch() {
		const { database, filterList, navigation } = this.props;
		navigation.setParams({ predicate: '', showSearch: false, });
		Keyboard.dismiss();
		filterList(database.explanation, navigation, '');
	}

	keyboardWillShow() {
		const { shortHeight } = this.props.navigation.state.params;
	    if (this.state.height !== shortHeight) this.setState({ height: shortHeight });
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	}

    keyboardWillHide() {
        const { normalHeight } = this.props.navigation.state.params;
    	this.setState({ height: normalHeight });
    	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	} 

	render() {
		// console.log('render');
		const { arranged, navigation } = this.props;
		const { normalHeight, predicate, showSearch } = navigation.state.params;
		const { height } = this.state;
		if (this.state.loading) return <Spinner size="large" text='Loading' />;
		return (
			<View style={sectionListStyle(normalHeight)}>
				<View style={sectionListStyle(height)}>
					<Search
						dictionary={this.props.database.explanation}
						onCancelPress={this.cancelSearch.bind(this)}
						onChangeText={this.filterListByPredicate.bind(this)}
						onClearIconPress={this.filterListByPredicate.bind(this)}
						predicate={predicate}
						showSearch={showSearch}
					/>
					<SectionList
			            renderItem={(item) => <ListItem word={item.item} header={item.section.key} navigation={navigation} />}
			            renderSectionHeader={({ section }) => <ListItem header={section.key} />}
			            sections={arranged}
			            keyExtractor={(item) => item.uid}
			            keyboardShouldPersistTaps={'always'}
		          	/>
				</View>
			</View>
	);
	}
}

const mapStateToProps = ({ database, search }) => {

		return { arranged: search.explanation, database };
};

export default connect(mapStateToProps, { filterList, loadExplanationDictionary })(ExplanationList);
