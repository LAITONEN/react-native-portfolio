import React from 'react';
import { Text } from 'react-native';

export const ErrorText = ({ message }) => {

	const { errorHideStyle, errorShowStyle } = styles;
	return (
			// if error messsage exists => show it, else set height to 0 to hide it 
			<Text style={message ? errorShowStyle : errorHideStyle}> 
				{message}
			</Text>
		);
};


const styles = { 
	errorShowStyle: {
		alignSelf: 'center',
		fontSize: 20,
		color: 'red',
	},
	errorHideStyle: {
		height: 0
	},
};