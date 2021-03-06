import React from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ClearIcon from 'react-native-vector-icons/Entypo';
import SearchIcon from 'react-native-vector-icons/EvilIcons';

// this.props here are the props that are passed from the parent component
export default class Search extends React.Component {

	clearIconShow() {
		if (this.props.navParams.predicate) {
			return ( 
				<ClearIcon 
					name="circle-with-cross" 
					size={18} 
					color="#a3a3a8" 
					 // call function without binding so that the context of parent is used
					onPress={() => this._onClearIconPress()}
					style={styles.clearIcon} 
				/>
			);
		}
	return;
	}

	_onClearIconPress() {
		if (!this.searchInput.isFocused()) {
			this.searchInput.focus();
		}
		this.props.onClearIconPress();
	}

	render() {
		const { button, buttonText, buttonView, clearIcon, 
			searchInput, searchInputView, searchView, } = styles;

		const { onCancelPress, onChangeText, navParams } = this.props;

		const { predicate, searchInputAutoFocus, showSearch } = navParams;

		if (showSearch) {
		return (
	 			<View style={searchView}>
					<View style={searchInputView(predicate)}>
						<SearchIcon 
							component={View}
							name="search" 
							size={22} 
							color="#C7C7CD" 
							onPress={() => this.searchInput.focus()} 
							style={clearIcon} 
						/>
						<TextInput
							autoFocus={searchInputAutoFocus}
							autoCorrect={false}
							onChangeText={onChangeText}
							returnKeyType='done' // name of an 'enter' key on the keyboard
							ref={search => { this.searchInput = search; }}
							placeholder='Search'
							style={searchInput}
							value={predicate}
						/>
						{this.clearIconShow()}
					</View>
					<View style={buttonView}>
						<TouchableOpacity 
							activeOpacity={0.7}
							onPress={onCancelPress}
							style={button}
						>
							<Text style={buttonText}>Cancel</Text>
						</TouchableOpacity>
					</View>

				</View>
			);
		}
		return <View />;
	}
}



const styles = {	
	button: {
		alignItems: 'center', 
		backgroundColor: '#9E9E9E', 
		height: 35, 
		justifyContent: 'center', 
		marginRight: 16 
	},
	buttonText: {
		alignItems: 'center',
		alignSelf: 'center',
		color: 'white',
		fontSize: 16,
	},
	buttonView: {
		flex: 2, 
		overflow: 'hidden'
	},
	clearIcon: {
		alignSelf: 'center', 
		flex: 1, 
		marginRight: -5
	},
	searchInput: { 
		alignSelf: 'center', 
		flex: 9 
	},
	searchInputView: (predicate) => ({
		alignItems: 'center', 
		flex: 7, 
		flexDirection: 'row', 
		justifyContent: predicate > 0 ? 'flex-start' : 'center',
		paddingLeft: 5, 
		position: 'relative' 
	}),
	searchView: {
		borderColor: '#9E9E9E', 
		borderWidth: 3, 
		height: 40, 
		flexDirection: 'row', 
		marginRight: -19
	},
};





