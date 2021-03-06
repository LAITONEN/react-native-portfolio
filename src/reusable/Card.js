/* eslint-disable eol-last */ // <- gets rid of the "newline required error at the end of the page"
import React from 'react';
import { ScrollView } from 'react-native';

export const Card = ({ 
					children, 
					keyboardShouldPersistTaps, 
					scrollEnabled, 
					showsVerticalScrollIndicator,
					style 
				}) => {
	return (
		<ScrollView 
			keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'always'}
			scrollEnabled={scrollEnabled}
			showsVerticalScrollIndicator={showsVerticalScrollIndicator}
			style={[styles.containerStyle, style]}
		>
		{children}
		</ScrollView>
		);
};

const styles = {
	containerStyle: {
		borderColor: '#DDD',
		borderBottomWidth: 0,
		borderRadius: 2,
		borderWidth: 1,
		elevation: 2,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,

	}
};