import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AuthScreen from '../components/AuthScreen';
import { DictionariesTabBar } from './DictionariesNavigator';

// CONFIGS 

export const AppNavigator = StackNavigator({
      auth: { screen: AuthScreen },
      dictionaries: { screen: DictionariesTabBar }
	}, { headerMode: 'none' });

// NAVIGATION

// React-Navigation state integrated into Redux
class AppWithNavigationState extends React.Component { 
	render() {
		StatusBar.setBarStyle('dark-content', true); // StatusBar settings
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



