import { Dimensions } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { ExplanationStack } from './ExplanationNavigator';
import { TranslationStack } from './TranslationNavigator';
import { VarietyStack } from './VarietyNavigator';

// CONFIGS

const routeConfig = {
      explanation: { screen: ExplanationStack }, // explanation is a React-Navigation's route
      translation: { screen: TranslationStack }, // translation is a RN's route
      variety: { screen: VarietyStack } // variety is a RN's route
  };

const navigatorConfig = {
					initialRouteName: 'explanation', // what page to show when navigation loads
					tabBarOptions: {
						labelStyle: {
							fontSize: 16,
							marginBottom: 12
						},
					 	style: {
					 		height: Dimensions.get('window').height * 0.07
					 	},
					},
					};


export const DictionariesTabBar = TabNavigator(routeConfig, navigatorConfig);
