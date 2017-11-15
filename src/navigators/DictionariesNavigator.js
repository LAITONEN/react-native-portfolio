import { Dimensions } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { ExplanationStack } from './ExplanationNavigator';
import { TranslationStack } from './TranslationNavigator';
import { VarietyStack } from './VarietyNavigator';

// CONFIGS

const routeConfig = {
      explanation: { screen: ExplanationStack }, // explanation is a route
      translation: { screen: TranslationStack }, // translation is a route
      variety: { screen: VarietyStack } 
  };

const navigatorConfig = {
					initialRouteName: 'explanation',  // what page to show when navigation loads
					tabBarOptions: {
						labelStyle: {
							fontSize: 16,
							marginBottom: 12
						},
					 	style: {
					 		height: Dimensions.get('window').height * 0.07
					 	},
					},
/*					navigationOptions: {
						drawerIcon: (<Icon name="book" size={25} />),
						drawerLabel: 'Dictionaries'
						}*/
					};


export const DictionariesTabBar = TabNavigator(routeConfig, navigatorConfig);
