import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';


export const HeaderButton = ({ onPress, title }) => {
		return (
			<Button 
				backgroundColor='transparent'
				color='rgba(0, 122, 255, 1)'
				Component={TouchableOpacity} // use this component as component for Button
				fontSize={17}
				onPress={onPress}
				style={styles.buttonStyle}
				title={title}
			/>
		);
};

const styles = {
	buttonStyle: {
		marginRight: -10, 
		marginLeft: -10
	}
};