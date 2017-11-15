/* eslint-disable eol-last */

import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';


export const Spinner = ({ color = 'grey', height = 30, size = 'large', text = '' }) => {
	const { spinnerStyle, textStyle } = styles;
	return (
		<View style={spinnerStyle}>
			<Text style={textStyle(height)}>{text}</Text>
			<ActivityIndicator 
				size={size} 
				color={color} 
			/>
		</View>
	);
};

const styles = {
	spinnerStyle: {
		alignItems: 'center',
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'center'
	},
	textStyle: (height) => ({
		fontSize: 20, 
		height, 
		paddingBottom: 8,
	}),
};