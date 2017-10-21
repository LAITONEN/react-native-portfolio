import React, { Component } from 'react';	
import { Keyboard, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, Card, CardSection, ErrorText, Input, Spinner } from './reusable/';
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
			loading: false, 
			height: shortHeight,
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
	 	if (nextProps.error) this.setState({ loading: false });
	}

	componentWillUnmount() {
		// empty the error props in redux store so that next time,
		// when the user opens this page, the error is not displayed
		this.props.emptyValue({ name: 'error', value: '' });
  	}


	onInputChange(key, value) {
		// when user type in any text input on the page =>
		// update the pertaining state prop's value
		this.setState({ [key]: value });
	}

	onButtonPress() {
		const { definitions, examples, rules,
		synonyms, tags, term } = this.state;
		const { createWord, emptyValue, navigation } = this.props;
		// show spinner while the word is added to the database
		// and then call createWord AC
		this.setState({ loading: true });
		createWord({ definitions, examples, rules, synonyms, tags, term }, navigation);
	}

	render() {
		const { definitions, lineHeight, examples, height, 
			loading, rules, synonyms, tags, term } = this.state;
		const { containerStyle, viewStyle } = addWordStyles;
		// show spinner
		if (loading) return <Spinner size="large" text='Saving' />;	
		// show input form
		return (	
			<KeyboardAwareScrollView
				enableResetScrollToCoords={false} // persists the position of the view after keyboard hides
				keyboardShouldPersistTaps={'handled'} // enables button clicks when keyboard is up
				ref='scroll'
				style={viewStyle(height)}
			>
			<Card 
			keyboardShouldPersistTaps={'always'}
			style={containerStyle}>
				<CardSection>
					<Input
						autoFocus
						label='Term'
						maxLength={40}
						onChangeText={this.onInputChange.bind(this, 'term')}
						placeholder='Javelin'
						value={term}
					/>
				</CardSection>

				<CardSection>
					<Input
						label='Definitions'
						maxLength={1000}
						multiline
						onChangeText={this.onInputChange.bind(this, 'definitions')}
						placeholder='A long stick with a point...'
						// when size of the input changes - change the height accordingly
						onContentSizeChange={(e) =>
								this.setState({ lineHeight: e.nativeEvent.contentSize.height })}
						// and set the value of height to the View and TextInput inside Input
						style={{ lineHeight }}
						viewStyle={{ height: lineHeight }}
						value={definitions}
					/>
				</CardSection>

				<CardSection>
					<Input
						label='Synonyms'
						maxLength={120}
						multiline
						onChangeText={this.onInputChange.bind(this, 'synonyms')}
						placeholder='Spear'
						onContentSizeChange={(e) => 
							{ this.setState({ lineHeight: e.nativeEvent.contentSize.height }); }
						}
						style={{ lineHeight }}
						viewStyle={{ height: lineHeight }}
						value={synonyms}
					/>
				</CardSection>

				<CardSection>
					<Input
						label='Examples'
						maxLength={1000}
						multiline
						onChangeText={this.onInputChange.bind(this, 'examples')}
						placeholder='Javelin was used as a ra...'
						onContentSizeChange={(e) => 
							{ this.setState({ lineHeight: e.nativeEvent.contentSize.height }); }
						}
						style={{ lineHeight }}
						viewStyle={{ height: lineHeight }}
						value={examples}
					/>
				</CardSection>

				<CardSection>
					<Input
						label='Rules'
						maxLength={120}
						multiline
						onChangeText={this.onInputChange.bind(this, 'rules')}
						placeholder='Transitive, formal'
						onContentSizeChange={(e) => 
							{ this.setState({ lineHeight: e.nativeEvent.contentSize.height }); }
						}
						style={{ lineHeight }}
						viewStyle={{ height: lineHeight }}
						value={rules}
					/>
				</CardSection>

				
				<CardSection>
					<Input
					label='Tags'
					maxLength={120}
					multiline
					onChangeText={this.onInputChange.bind(this, 'tags')}
					placeholder='Weapons, medieval'
					value={tags}
					/>
				</CardSection>	
				
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