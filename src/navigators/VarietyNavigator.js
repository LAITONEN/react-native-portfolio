import React from 'react';	
import { Keyboard } from 'react-native';
import { NavigationActions, StackNavigator } from 'react-navigation';

import Dictionary from '../containers/VarietyList';
import WordDetails from '../containers/WordDetails';
import AddWord from '../containers/AddWord';
import EditWord from '../containers/EditWord';

import { HeaderBackButton, ListNavHeader } from '../reusable';

// save title in screenProps or state.params to make user-customizable?
const list = ({ navigation }) => ListNavHeader({ navigation }); 

// required in order to dismiss the keyboard faster, 
// right after the button click, not when AddWord unmounts
const backButton = ({ navigation }) => ({
			headerLeft: <HeaderBackButton
							onPress={() => {
								Keyboard.dismiss();
								navigation.goBack();
							}}
							navigation={navigation}
						/>,
});

const details = ({ navigation }) => ({ 
		headerTitle: navigation.state.params.word.term,
		headerLeft: <HeaderBackButton
						onPress={() => {
							const params = { ...navigation.state.params, searchInputAutoFocus: true };
							navigation.dispatch(NavigationActions.reset({ 
									index: 0,
									actions: [navigation.navigate('list', params)],
								}));
						}}
						navigation={navigation}
						staticTitle='English'
					/>,
}); 

const routeConfig = {
      list: { screen: Dictionary, navigationOptions: list },
      details: { screen: WordDetails, navigationOptions: details },
      add: { screen: AddWord, navigationOptions: backButton },
      edit: { screen: EditWord, navigationOptions: backButton }, };

const navigatorConfig = { 
	// initialRouteParams requried for using search from the computer simulator
				initialRouteParams: { dictionaryName: 'variety', listHeaderTitle: 'Synonyms', useTitle: true }, 
				navigationOptions: {
					tabBarLabel: 'SYN',
				},
			};

export const VarietyStack = StackNavigator(routeConfig, navigatorConfig);

