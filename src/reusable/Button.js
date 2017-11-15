/* eslint-disable eol-last */ // <- gets rid of the "newline required error at the end of the page"

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { CardSection } from './';


export const Button = ({ children, color = '#007aff', onPress, title, }) => {

	const { buttonStyle, textStyle } = styles;

	return (
		<CardSection>
			<TouchableOpacity onPress={onPress} style={buttonStyle(color)}>
				<Text style={textStyle(color)}>{title || children}</Text>
			</TouchableOpacity>
		</CardSection>
	);
};


const styles = {
	buttonStyle: (color) => ({
		alignSelf: 'stretch',
		backgroundColor: '#FFF',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: color,
		flex: 1,
	}),
	textStyle: (color) => ({
		alignSelf: 'center',
		color,
		fontSize: 16,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10
	})
};