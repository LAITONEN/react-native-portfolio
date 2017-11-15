import React, { Component } from 'react';	
import { Dimensions, Keyboard, LayoutAnimation } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, Card, ErrorText, Input, Spinner } from '../reusable/';
import { editWord } from '../actions';
import { editWordStyles } from '../styles';

class EditWord extends Component {

	static navigationOptions = () => ({
		headerTitle: 'Edit Word',
		title: 'ENG'
		});

	constructor(props) {
		super(props);
		const { definitions, examples, rules,
					 synonyms, tags, term, uid, } = props.navigation.state.params.word;
		this.state = { 
			definitions, 
			examples, 
			screenHeight: Dimensions.get('window').screenHeight, 
			showSpinner: false, 
			rules, 
			synonyms, 
			tags, 
			term,
			uid,
		};
	}

	onButtonPress() {
		const { definitions, examples, rules,
		synonyms, tags, term, uid } = this.state;
		const { editWord, navigation } = this.props;
		editWord({ definitions, examples, 
									rules, synonyms, tags, term, uid }, navigation);
		this.setState({ showSpinner: true });
		Keyboard.dismiss();
	}

	render() {
		const { definitions, screenHeight, showSpinner, examples, rules,
		synonyms, tags, term } = this.state; 
		const { containerStyle, viewHeight } = editWordStyles;

		if (showSpinner) return <Spinner size="large" text='Saving' />;
		return (
			<KeyboardAwareScrollView 
				enableResetScrollToCoords={false}
				keyboardShouldPersistTaps={'handled'}
				ref='scroll'
				style={viewHeight(screenHeight)} 
			>
				<Card 
					keyboardShouldPersistTaps={'always'}
					style={containerStyle}>

					<Input
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

				<Button onPress={this.onButtonPress.bind(this)}>Save</Button>
				</Card>
			</KeyboardAwareScrollView>
			);
	}
}

export default connect(null, { editWord })(EditWord);





