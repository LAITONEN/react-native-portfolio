import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';


export const HeaderBackButton = ({ onPress, title }) => {
		const { backIconStyle, buttonStyle, textStyle } = styles;
		return (
			<TouchableOpacity 
				onPress={onPress}
				style={buttonStyle}
			>
				<BackIcon
					color='rgba(0, 122, 255, 1)'
					name="ios-arrow-back-outline"
					size={33}
					style={backIconStyle}
				/>
				<Text style={textStyle}>{title}</Text>
			</TouchableOpacity>
		);
};

const styles = {
	backIconStyle: {
		marginLeft: 8, 
		marginTop: 3,
	},
	buttonStyle: {
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: 'transparent',
		flexDirection: 'row',
		marginLeft: 1,
	},
	textStyle: {
		color: 'rgba(0, 122, 255, 1)',
		fontSize: 17,
		marginLeft: 7,
	}
};