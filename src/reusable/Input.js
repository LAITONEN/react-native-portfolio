import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { CardSection } from './';

export const Input = ({ 
		autoCapitalize = 'sentences', 
		autoFocus, 
		label, 
		maxLength = 25, 
		multiline, 	
		onChangeText, 
		outerViewStyle, 
		placeholder, 
		secureTextEntry, 
		style, 
		value, 
		viewStyle 
}) => {

	const { containerStyle, inputStyle, labelStyle } = styles;
	return (
		<CardSection style={outerViewStyle}>
			<View style={[containerStyle, viewStyle]}>
				<Text style={labelStyle}>{label}</Text>
				<TextInput 
					autoCapitalize={autoCapitalize}
					autoCorrect={false}
					autoFocus={autoFocus}
					maxLength={maxLength}
					multiline={multiline}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor='#C7C7CD'
					secureTextEntry={secureTextEntry} // show black dots instead of characters
					style={[inputStyle, style]}
					value={value}
				/>
			</View>
		</CardSection>
		);
};


const styles = {
	containerStyle: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		minHeight: 40,
	},
	inputStyle: {
		alignSelf: 'center',
		color: '#000',
		flex: 2,
		fontSize: 18,
		lineHeight: 23,
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 0,
	},
	labelStyle: {
		flex: 1,
		fontSize: 18,
		paddingLeft: 20,
	}
};