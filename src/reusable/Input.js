import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { CardSection } from './';


export class Input extends React.Component {

	onSubmit = (e) => {
		
	}

    render() {
    	const { 
			autoCapitalize = 'sentences', 
			autoFocus, 
			label, 
			maxLength = 25, 
			multiline, 	
			onChangeText, 
			outerViewStyle, 
			placeholder, 
			secureTextEntry, 
			style, 
			value, 
			viewStyle 
		} = this.props;

		const { containerStyle, inputStyle, labelStyle, multilineStyle } = styles;
		const mergedInputStyle = [inputStyle, multilineStyle, style];
        return (
            <CardSection 
				style={[outerViewStyle, { padding: 0 }]}>
				<View 	
					style={[containerStyle, viewStyle]}>
					<Text style={labelStyle}>{label}</Text>
					<TextInput 
						autoCapitalize={autoCapitalize}
						autoCorrect={false}
						autoFocus={autoFocus}
						maxLength={maxLength}
						multiline={multiline}
						onChangeText={onChangeText}
						onSubmitEditing={this.onSubmit}
						placeholder={placeholder}
						placeholderTextColor='#C7C7CD'
						secureTextEntry={secureTextEntry}
						style={mergedInputStyle}
						value={value}
					/>
				</View>
			</CardSection>
        );
    }
}


const styles = {
	containerStyle: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		minHeight: 50,
	},
	inputStyle: {
		color: '#000',
		flex: 2,
		fontSize: 18,
		height: '100%',
		paddingTop: 15,
		paddingRight: 5,
		paddingBottom: 12,
		paddingLeft: 5,
	},
	labelStyle: {
		flex: 1,
		fontSize: 18,
		paddingLeft: 20,
	},
};