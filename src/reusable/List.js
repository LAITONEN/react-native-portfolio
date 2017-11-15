import React from 'react';
import { Dimensions, KeyboardAvoidingView, SectionList, View } from 'react-native';

import Search from '../components/Search';
import ListItem from '../components/ListItem';

class List extends React.Component {

	renderLine(what, item) {
		if (what === 'item') {
			return (
				<ListItem 
					navigation={this.props.navigation} 
					sectionHeader={item.section.key} 
					word={item.item} 
				/>);
		}
		return <ListItem sectionHeader={item.section.key} />;

	}

	render() {
		const { 
			dictionary, 
			filterListByPredicate, 
			navigation, 
			onCancelPress, 
			screenHeight, 
			sections 
		} = this.props;
	    return (
	        <View style={style(screenHeight)}>
					<KeyboardAvoidingView 
						behavior='padding'
						keyboardVerticalOffset={Dimensions.get('window').height * 0.1}
						style={style(screenHeight)}
					>
						<Search
							dictionary={dictionary}
							onCancelPress={onCancelPress}
							onChangeText={filterListByPredicate}
							onClearIconPress={filterListByPredicate}
							navParams={navigation.state.params}
						/>
						<SectionList
				            renderItem={(item) => this.renderLine('item', item)} 
				            renderSectionHeader={(item) => this.renderLine('section', item)}
				            sections={sections}
				            keyExtractor={(item) => item.uid}
				            // allow ListItem to capture presses when keyboard is up
				            keyboardShouldPersistTaps={'always'} 
			          	/>
					</KeyboardAvoidingView>
				</View>
	    );
    }
};


const style = (height, paddingTop) => ({
		backgroundColor: 'white',
		height
	});


export { List };

