import React from 'react';
import { Dimensions } from 'react-native';
import { HeaderButton } from './';

// nav bar 
export const ListNavHeader = ({ navigation }) => {
		const { navigate, setParams, state } = navigation;
		return {
			headerRight: <HeaderButton
							onPress={() => navigate('add', state.params)}
							title='Add'
						/>,
			headerLeft: <HeaderButton
							onPress={() => setParams({ showSearch: !state.params.showSearch })}
							title='Search'
						/>,
			headerTitle: state.params.listHeaderTitle,
			headerStyle: { height: Dimensions.get('window').height * 0.1 }
		};
};