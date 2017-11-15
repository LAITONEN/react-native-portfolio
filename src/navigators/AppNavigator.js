import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { MainDrawer } from './/MainNavigator';
// import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../containers/AuthScreen';
import { DictionariesTabBar } from './DictionariesNavigator';

// CONFIGS 


export const AppNavigator = StackNavigator({
      // welcome: { screen: WelcomeScreen }, // should be in the root navigator along with auth+dict stack as one screen
      auth: { screen: AuthScreen },
      dictionaries: { screen: DictionariesTabBar }
      // main: { screen: MainDrawer } 
	}, { headerMode: 'none' });

// NAVIGATION

class AppWithNavigationState extends React.Component { 
	render() {
		StatusBar.setBarStyle('dark-content', true);
		const { dispatch, nav } = this.props;
		return (
			<AppNavigator
				navigation={addNavigationHelpers({ dispatch, state: nav })}
			/>
		);
	}
}

AppWithNavigationState.propTypes = { 
	dispatch: PropTypes.func.isRequired,
	nav: PropTypes.object.isRequired 
};

const mapStateToProps = ({ app }) => ({ nav: app });

export default connect(mapStateToProps)(AppWithNavigationState);



