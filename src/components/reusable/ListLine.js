import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

export const ListLine = ({ match, matchTitle, onPress, sectionHeader, term }) => {
	const { sectionStyle, noteTitleStyle, noteStyle, termStyle, titleStyle } = styles;

	function showNote() {
		if (sectionHeader === 'Close Match') {
			return (
					// show matchTitle as a note if it's a section header render
					// or match.where number if it's a section item render
					<Text style={term ? noteStyle : noteTitleStyle} >
						{match ? match.where : matchTitle}
					</Text>
				);
		}
		return;
	}

	return (
		// ternaries and conditionals depend on whether section header or section item should be rendered
		<TouchableHighlight
			onPress={term ? onPress : null}
			underlayColor='#a8a8a8'
		>          
			<View style={sectionStyle}>
					<Text 
						style={term ? termStyle : titleStyle}
					>
					{term || sectionHeader}
					</Text>
					{showNote()}
			</View> 
		</TouchableHighlight> 
		);
};


const styles = {
	noteStyle: {
		color: '#C7C7CD',
		flex: 2,
		fontSize: 12,
	},
	noteTitleStyle: {
		color: '#C7C7CD',
		flex: 2,
		fontSize: 16,
		left: 7,
	},
	sectionStyle: {
		alignItems: 'center',
		backgroundColor: '#FFF',
		borderBottomWidth: 1,
		borderColor: 'rgba(0, 122, 255, 0.3)',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: 5,
		position: 'relative',
	},
	termStyle:
	{
		flex: 3,
		fontSize: 18,
		marginRight: 20,
		paddingLeft: 15
	},
	titleStyle: {
		flex: 3,
		fontSize: 22,
		fontWeight: 'bold',
		paddingLeft: 15
	},
};