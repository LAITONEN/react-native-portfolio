import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, Card, ErrorText, Input, Spinner } from '../reusable/';
import { createWord, emptyValue } from '../actions';
import { addWordStyles } from '../styles';

class AddWord extends Component {

	static navigationOptions = () => ({
		headerTitle: 'Add new word'
	});

	constructor(props) {
		super(props);
			const { shortHeight, predicate } = props.navigation.state.params;
		this.state = { 
			definitions: '',
			examples: '', 
			showSpinner: false, 
			screenHeight: shortHeight,
			rules: '',
			synonyms: '', 
			tags: '', 
			term: predicate
		};
	}
	

	componentWillMount() {
		// console.log('Add will mount', this.props.navigation.state.params);
 	}

 	componentWillReceiveProps(nextProps) {
 		// after the user clicked the 'add' button, in case they did not fill in
 		// 'term' and 'definitions' fields - show the word form instead of a spinner again
	 	if (nextProps.error) this.setState({ showSpinner: false });
	}

	componentWillUnmount() {
		// empty the error props in redux store so that next time,
		// when the user opens this page, the error is not displayed
		this.props.emptyValue({ name: 'error', value: '' });
  	}

	onButtonPress() {
		const { definitions, examples, rules,
		synonyms, tags, term } = this.state;
		const { createWord, navigation } = this.props;
		// show spinner while the word is added to the database
		// and then call createWord AC
		this.setState({ showSpinner: true });
		createWord({ definitions, examples, rules, synonyms, tags, term }, navigation);
	}

	render() {
		const { definitions, examples, screenHeight, 
			showSpinner, rules, synonyms, tags, term } = this.state;
		const { containerStyle, viewStyle } = addWordStyles;
		// show spinner
		if (showSpinner) return <Spinner size="large" text='Saving' />;	
		// show input form
		return (	
			<KeyboardAwareScrollView
				enableResetScrollToCoords={false} // persists the position of the view after keyboard hides
				keyboardShouldPersistTaps={'always'} // enables button clicks when keyboard is up
				ref='scroll'
				style={viewStyle(screenHeight)}
			>
			<Card 
			keyboardShouldPersistTaps={'always'}
			showsVerticalScrollIndicator={false}
			style={containerStyle}>
					<Input
						autoFocus
						label='Term'
						maxLength={40}
						onChangeText={value => this.setState({ term: value })}
						placeholder='Javelin'
						value={term}
					/>

					<Input
						label='Definitions'
						maxLength={1000}
						multiline
						onChangeText={value => this.setState({ definitions: value })}
						placeholder='A long stick with a point...'
						value={definitions}
					/>

					<Input
						label='Synonyms'
						maxLength={1000}
						multiline
						onChangeText={value => this.setState({ synonyms: value })}
						placeholder='Spear'
						value={synonyms}
					/>

					<Input
						label='Examples'
						maxLength={1000}
						multiline
						onChangeText={value => this.setState({ examples: value })}
						placeholder='Javelin was used as a ra...'
						value={examples}
					/>

					<Input
						label='Rules'
						maxLength={1000}
						multiline
						onChangeText={value => this.setState({ rules: value })}
						placeholder='Transitive, formal'
						value={rules}
					/>
				
					<Input
						label='Tags'
						maxLength={120}
						multiline
						onChangeText={value => this.setState({ tags: value })}
						placeholder='Weapons, medieval'
						value={tags}
					/>
				
				<ErrorText
					message={this.props.error}
				/>

				<Button
					onPress={this.onButtonPress.bind(this)}
					title='Add'
				/>
			</Card>
			</KeyboardAwareScrollView>
			);
	}
}

const mapStateToProps = ({ generic }) => {
	return generic; 
};

export default connect(mapStateToProps, { createWord, emptyValue })(AddWord); 