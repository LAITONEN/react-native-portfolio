import React from 'react';	
import { Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Dictionary from '../containers/TranslationList';
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

const routeConfig = {
      list: { screen: Dictionary, navigationOptions: list },
      details: { screen: WordDetails },
      add: { screen: AddWord, navigationOptions: backButton },
      edit: { screen: EditWord, navigationOptions: backButton }, };

const navigatorConfig = { 
	// initialRouteParams requried for using search from the computer simulator
				initialRouteParams: { dictionaryName: 'translation', listHeaderTitle: 'Russian', useTitle: true }, 
				navigationOptions: {
					tabBarLabel: 'RUS',
				},
			};

export const TranslationStack = StackNavigator(routeConfig, navigatorConfig);

