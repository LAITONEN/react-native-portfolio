import React from 'react';
import { Keyboard, Text, TouchableHighlight, View } from 'react-native';

import { exists } from '../functions';
import { listItemStyles } from '../styles';

export default class ListItem extends React.Component {

	onRowPress = () => {
		const { navigation, word } = this.props;
		// navigate to WordDetails screen and pass current navigation params
		// + listHeaderTitle: '', so that BackButton on the 'Edit' page had the title of 'Details'
		// + current word object with all the props
		navigation.navigate('details', { ...navigation.state.params, word });
		}

	onLongPress = () => {
		const { navigation, word } = this.props;

		// navigate to EditWord screen and pass current navigation params + current word object 
		// + headerTitle of List screen
	    navigation.navigate('edit', { ...navigation.state.params, useTitle: true, word });
	}

	showNote() {
		const { sectionHeader, word } = this.props;
		const term = exists(() => word.term);
		const match = exists(() => word.match);
		const { noteStyle, noteTitleStyle } = listItemStyles;
		const matchTitle = sectionHeader === 'Close Match' ? 'Matched in: ' : '';

	    if (sectionHeader === 'Close Match') {
			return (
					// show matchTitle as a note if it's a section HEADER render
					// or match.where number if it's a section ITEM render
					<Text style={term ? noteStyle : noteTitleStyle}>
						{match ? match.where : matchTitle}
					</Text>
				);
		}
		return;
	}

	render() {
		const { sectionHeader, word } = this.props;
		const { sectionStyle, termStyle, titleStyle } = listItemStyles;
		const term = exists(() => word.term);
		return (
			<TouchableHighlight
				onLongPress={term ? this.onLongPress : null} // null for section header
				onPress={term ? this.onRowPress : null}
				underlayColor='#a8a8a8'
			>          
				<View style={sectionStyle}>
					<Text 
						style={term ? termStyle : titleStyle}
					>
					{term || sectionHeader}
					</Text>
					{this.showNote()}
				</View> 
			</TouchableHighlight> 
		);
	}
}



