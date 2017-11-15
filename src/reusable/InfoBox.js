import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export const InfoBox = () => {
	return (
			<View style={styles.outerViewStyle}>
				<View style={styles.innerViewStyle}>
					<Icon 
						name="check-circle-outline" 
						color="#007aff" 
						size={50} 
						style={styles.iconStyle} 
					/>
					<Text style={styles.textStyle}>Logged-in</Text>
				</View>
			</View>
		);
};

const styles = {
	iconStyle: {
		alignSelf: 'center',
		paddingRight: 7,
	},
	textStyle: {
		color: '#007aff',
		fontFamily: 'Helvetica',
		fontSize: 30,
	},
	innerViewStyle: {
		alignItems: 'center',
		alignSelf: 'center',
		borderColor: '#007aff',
		borderRadius: 15,
		borderWidth: 6,
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 30,
	},
	outerViewStyle: {
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'center'
	}
};