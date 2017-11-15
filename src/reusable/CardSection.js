/* eslint-disable eol-last */ // <- gets rid of the "newline required error at the end of the page"
import React from 'react';
import { View } from 'react-native';


export const CardSection = (props) => {
	// style on the right overwrites the properties of the style on the left or just add a new property
	return (
		<View style={[styles.containerStyle, props.style]}>
		{props.children}
		</View>
		);
};


const styles = {
	containerStyle: {
		backgroundColor: '#FFF',
		borderBottomWidth: 1,
		borderColor: '#DDD',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: 5,
		position: 'relative',
	}
};
