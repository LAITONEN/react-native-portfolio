/* eslint-disable eol-last */ // <- gets rid of the "newline required error at the end of the page"

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const ModalButton = ({ onPress, children }) => {

	const { buttonStyle, textStyle } = styles;

	return (
		<TouchableOpacity onPress={onPress} style={buttonStyle}>
			<Text style={textStyle}>{children}</Text>
		</TouchableOpacity>
	);
};


const styles = {
	buttonStyle: {
		alignSelf: 'stretch',
		backgroundColor: '#FFF',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#007aff',
		flex: 1,
	},

	textStyle: {
		alignSelf: 'center',
		color: '#007aff',
		fontSize: 16,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10
	}
};

export { ModalButton };