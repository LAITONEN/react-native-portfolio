import React, { Component } from 'react';
import { Dimensions, Keyboard, LayoutAnimation, View } from 'react-native';
import { connect } from 'react-redux';

import { Button, CardSection, ErrorText, InfoBox, Input, Spinner } from './reusable';
import { loginUser, valueChanged } from '../actions';


class AuthScreen extends Component {

	componentWillMount() {
		this.keyboardWillShowListener = Keyboard.addListener(
								'keyboardWillShow', this.keyboardWillShow.bind(this));
		this.keyboardWillHideListener = Keyboard.addListener(
								'keyboardWillHide', this.keyboardWillHide.bind(this));
	}

	componentWillUnmount() {
		// remove Keyboard listeners
		this.keyboardWillShowListener.remove();
		this.keyboardWillHideListener.remove();
	}

	onEmailChange(email) {
		// when user types in the e-mail field - call the valueChanged AC
		this.props.valueChanged(email, 'email');
	}

	onPasswordChange(password) {
		// when user types in the e-mail field - call the valueChanged AC
		this.props.valueChanged(password, 'password');
	}

	// when user clicks on the "Log in" button:
	onButtonPress() {
		Keyboard.dismiss();
		const { email, loginUser, navigation, password } = this.props;
		// call loginUser AC
		loginUser({ email, password }, navigation);	
	}

	// right before keyboard shows - set the necessary params, inclusively by using Keyboard's height
	// then configure layout animation on the next layout with the easeInEaseOut preset
	keyboardWillShow(e) {
		this.props.navigation.setParams({
			dictionary: 'explanation', 
			normalHeight: Dimensions.get('window').height * 0.83, 
			predicate: '', 
			showSearch: false, 
			shortHeight: Dimensions.get('window').height * 0.9 - e.endCoordinates.height, 
			viewHeight: Dimensions.get('window').height * 0.83, 
 		}); 
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	}

	// when keyboard hides (usually after user clicked 'log-in' button) - configure next layout animation 
	keyboardWillHide() {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	}

	render() {
		
		const { email, error, loading, password, user } = this.props;
		// after "log in" button click, show spinner
		if (loading) return <Spinner size="large" text="Logging" />;	
		// after user logged in - show InfoBox with the relevant info
		// this is added for the sake of a bug when the user gets navigated to AuthScreen
		// so that instead of seeing a Log-in form, they are notified that they are still logged-in
		else if (user) return <InfoBox />;
		return (
			<View style={styles.viewStyle}>
			<CardSection
				style={{ borderTopWidth: 1 }}
			>
				<Input
				autoCapitalize='none'
				autoFocus
				label="Email"
				onChangeText={this.onEmailChange.bind(this)}
				placeholder="email@gmail.com"
				value={email}
				/>
			</CardSection>

			<CardSection>
				<Input
				autoCapitalize='none'
				label="Password"
				onChangeText={this.onPasswordChange.bind(this)}
				placeholder="password"
				secureTextEntry
				value={password}
				/>
			</CardSection>

			<ErrorText message={error} />

			<Button onPress={this.onButtonPress.bind(this)}>Log in</Button>
			</View>
			);
	}
}

const styles = {
	viewStyle: {
        alignItems: 'center',
        flexDirection: 'column', 
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 200,
        padding: 0,
		borderColor: '#DDD',
		borderBottomWidth: 0,
		borderRadius: 2,
		borderWidth: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
		marginBottom: 150,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
};

const mapStateToProps = ({ auth }) => {
	const { email, error, loading, password, user } = auth; 

	return { email, error, loading, password, user };
};


// 1. Connect function is run just before the component is rendered;
// 2. The props for this component are being fetched from the Provider component's state 
// by connect function;
// 3. It then passes the state to the 1 arg (mapStateToProps);
// 4. The function as the first argument returns the values that can now be accessed from inside 
// the component;
// 5. The second argument (mapDispatchToProps) 

export default connect(mapStateToProps, { loginUser, valueChanged })(AuthScreen); 




