import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteWord } from '../actions';
import { Button, Card, Confirm, DetailSection, Spinner } from './reusable/';

class WordDetails extends Component {

	static navigationOptions = ({ navigation }) => ({
		headerTitle: navigation.state.params.word.term,
	});

	constructor(props) {
		super(props);
		this.state = { isVisible: false, loading: false };
	}

	// when deletion is confirmed in the Confirm Modal
	deleteWord() {
		const { navigation } = this.props;
		this.toggleVisibility(); // hide Confirm Modal
		this.props.deleteWord(navigation); // call AC
		this.setState({ loading: true }); // switch view from form to spinner
	}

	// when edit button is clicked
	editWord() {
		const { navigate, state } = this.props.navigation; 
		navigate('edit', state.params); // navigate to EditWord and pass params
	}

	// visibility of Confirm Modal
	toggleVisibility() {
		this.setState({ isVisible: !this.state.isVisible });
	}

	render() {
		const { definitions, examples, rules, synonyms, tags, term } = 
							this.props.navigation.state.params.word;
							
		if (this.state.loading) return <Spinner size="large" text='Deleting' />;	
		return (
				<Card>
					<DetailSection 
						link={() => `http://www.ldoceonline.com/dictionary/${term}`}
						text={definitions}
						title='Definitions'
						
					/>
					<DetailSection
						link={() => `http://www.thesaurus.com/browse/${term}`}
						text={synonyms}
						title='Synonyms'
					/>
					
					<DetailSection 
						text={rules}
						title='Rules'
					/>

					<DetailSection 
						text={examples}
						title='Examples'
					/>

					<DetailSection 
						text={tags}
						title='Tags'
					/>
					
					<Button onPress={this.editWord.bind(this)}>Edit</Button>

					<Button 
						color='#ff0000' 
						onPress={this.toggleVisibility.bind(this)}
						title='Delete'
					/>
					
					<Confirm
						onAccept={this.deleteWord.bind(this)}
						onDecline={this.toggleVisibility.bind(this)}
						visible={this.state.isVisible}
					>
					Are you sure you want to delete this word?	
					</Confirm>
				</Card>
			);
	}
}

export default connect(null, { deleteWord })(WordDetails);
