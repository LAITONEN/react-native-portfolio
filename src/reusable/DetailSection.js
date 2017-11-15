import React from 'react';
import { Linking, Text, TouchableHighlight, View } from 'react-native';

export const DetailSection = ({ link, content, title, overrideViewStyle }) => {
		const { textStyle, titleStyle, viewStyle } = styles;
		if (link) {
			return (
				<View style={[viewStyle, overrideViewStyle]}>
					<TouchableHighlight
						onPress={() => Linking.openURL(link)}
						underlayColor='#ffffff'
					>	
						<View> 
						<Text style={titleStyle}>{title}</Text>
						<Text style={textStyle}>{content}</Text>
						</View>
					</TouchableHighlight>
				</View>
				);
		}
		return (
			<View style={[viewStyle, overrideViewStyle]}>
					<Text style={titleStyle}>{title}</Text>
					<Text style={textStyle}>{content}</Text>
			</View>
		);
};

const styles = {
	titleStyle: {
		flex: 1, 
		fontSize: 16,
		fontWeight: 'bold'
	},
	textStyle: {
		flex: 2,
		fontSize: 16
	},
	viewStyle: {
		backgroundColor: '#FFF',
		borderBottomWidth: 1,
		borderColor: '#DDD',
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'flex-start',
		padding: 5,
		position: 'relative',
	},
};