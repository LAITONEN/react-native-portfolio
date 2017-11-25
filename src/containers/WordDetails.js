import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import { deleteWord } from '../actions';
import { Button, Card, Confirm, DetailSection, Spinner } from '../reusable/';
import { wordDetailsStyles } from '../styles';

class WordDetails extends Component {

	constructor(props) {
		super(props);
		this.state = { modalVisible: false, showSpinner: false };
	}

	// when deletion is confirmed in the Confirm Modal
	deleteWord() {
		const { navigation } = this.props;
		this.toggleModalVisibility();
		this.props.deleteWord(navigation); // Action Creator
		this.setState({ showSpinner: true });
	}

	// when edit button is clicked
	editWord() {
		const { navigate, state } = this.props.navigation; 
		navigate('edit', { ...state.params, useTitle: false });
	}

	toggleModalVisibility() {
		this.setState({ modalVisible: !this.state.modalVisible });
	}

	render() {
		const { definitions, examples, rules, synonyms, tags, term } = 
							this.props.navigation.state.params.word;
		const { containerStyle, viewStyle } = wordDetailsStyles;
		if (this.state.showSpinner) return <Spinner size="large" text='Deleting' />;	
		return (
				<ScrollView style={viewStyle}>	
					<Card 
						showsVerticalScrollIndicator={false}
						style={containerStyle}
					>
						<DetailSection 
							link={`http://www.ldoceonline.com/dictionary/${term}`}
							content={definitions}
							title='Definitions'
							
						/>
						<DetailSection
							link={`http://www.thesaurus.com/browse/${term}`}
							content={synonyms}
							title='Synonyms'
						/>
						
						<DetailSection 
							content={examples}
							title='Examples'
						/>

						<DetailSection 
							content={rules}
							title='Rules'
						/>

						<DetailSection 
							content={tags}
							title='Tags'
						/>
						
						<Button 
							onPress={this.editWord.bind(this)} 
							title='Edit'
						/>

						<Button 
							color='#ff0000' 
							onPress={this.toggleModalVisibility.bind(this)}
							title='Delete'
						/>
						
						<Confirm
							onAccept={this.deleteWord.bind(this)}
							onDecline={this.toggleModalVisibility.bind(this)}
							visible={this.state.modalVisible}
						>
						Are you sure you want to delete this word?	
						</Confirm>
					</Card>
				</ScrollView>
			);
	}
}

export default connect(null, { deleteWord })(WordDetails);
