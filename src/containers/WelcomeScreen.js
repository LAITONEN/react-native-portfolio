import { View } from 'react-native';	
import React, { Component } from 'react';
import { Button } from 'react-native-elements';

class WelcomeScreen extends Component {
	render() {
		return (
			<View>
				<Button
					onPress={() => this.props.navigation.navigate('auth')}
					style={{ marginTop: 100 }}
					title="Go To Auth"
				></Button>
			</View>
			);
	}
}

export default WelcomeScreen;