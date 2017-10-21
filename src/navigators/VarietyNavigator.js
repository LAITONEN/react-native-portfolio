import React from 'react';	
import { Dimensions, Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Dictionary from '../components/VarietyList';
import WordDetails from '../components/WordDetails';
import AddWord from '../components/AddWord';
import EditWord from '../components/EditWord';

import { HeaderBackButton, ListNavHeader } from '../components/reusable';

// navigationOptions of list route
const list = ({ navigation }) => ListNavHeader({ navigation, title: 'Synonyms' }); 

// navigationOptions of add route
const add = ({ navigation }) => ({
			// required in order to dismiss the keyboard faster, 
			// right after the button click, not when AddWord unmounts
			headerLeft: <HeaderBackButton
							onPress={() => {
								Keyboard.dismiss();
								navigation.goBack();
							}}
							title='Synonyms'
						/>,
});

const routeConfig = {
      list: { screen: Dictionary, navigationOptions: list },
      details: { screen: WordDetails },
      add: { screen: AddWord, navigationOptions: add },
      edit: { screen: EditWord } };

const navigatorConfig = { 
	// initialRouteParams requried for using search from the computer simulator
				initialRouteParams: { dictionary: 'variety' }, 
				navigationOptions: {
					tabBarLabel: 'SYN',
				},
			};

export const VarietyStack = StackNavigator(routeConfig, navigatorConfig);

