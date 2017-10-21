import React, { Component } from 'react';	
import { Dimensions, Keyboard, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, Card, CardSection, ErrorText, Input, Spinner } from './reusable/';
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
			height: Dimensions.get('window').height, 
			loading: false, 
			rules, 
			synonyms, 
			tags, 
			term,
			uid,
		};
	}

	componentWillMount() {
	// console.log('Edit will mount');
	   this.keyboardDidShowListener = Keyboard.addListener(
	   							'keyboardDidShow', 
	   							this.keyboardDidShow.bind(this));
	   this.keyboardDidHideListener = Keyboard.addListener(
	   							'keyboardDidHide', 
	   							this.keyboardDidHide.bind(this));
 	}

	componentWillUnmount() {
		// console.log('Edit will unmount');
	    this.keyboardDidShowListener.remove();
	    this.keyboardDidHideListener.remove();
  	}

	onInputChange(key, value) {
		this.setState({ [key]: value });
	}

	onButtonPress() {
		const { definitions, examples, rules,
		synonyms, tags, term, uid } = this.state;
		const { navigation } = this.props;
		this.props.editWord({ definitions, examples, 
									rules, synonyms, tags, term, uid }, navigation);
		this.setState({ loading: true });
	}

	keyboardDidShow(e) {
	    this.setState({ height: Dimensions.get('window').height - e.endCoordinates.height });
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	}

    keyboardDidHide() {
	    this.setState({ height: Dimensions.get('window').height });
	    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	} 

	render() {
		// console.log('EDIT RENDER', this.props);
		const { definitions, height, lineHeight, loading, examples, rules,
		synonyms, tags, term } = this.state; 
		const { containerStyle, viewHeight } = editWordStyles;

		if (loading) return <Spinner size="large" text='Saving' />;
		return (
			<KeyboardAwareScrollView 
				enableResetScrollToCoords={false}
				keyboardShouldPersistTaps={'always'}
				ref='scroll'
				style={viewHeight(height)} 
			>
				<Card 
				keyboardShouldPersistTaps={'always'}
				style={containerStyle}>
					<CardSection>
						<Input
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
						onContentSizeChange={(e) =>
								this.setState({ lineHeight: e.nativeEvent.contentSize.height })}
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

				<Button onPress={this.onButtonPress.bind(this)}>Save</Button>
				</Card>
			</KeyboardAwareScrollView>
			);
	}
}

export default connect(null, { editWord })(EditWord);





