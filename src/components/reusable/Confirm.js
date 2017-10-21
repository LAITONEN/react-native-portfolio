import React from 'react';
import { Modal, Text, View } from 'react-native';

import { ModalButton } from './';
import { CardSection } from './CardSection';

const Confirm = ({ children, visible, onAccept, onDecline }) => { 
	// {children} is a Text that is written in between the this component tags in another component
	const { cardSectionStyles, containerStyles, textStyles } = styles;
	return (
			<Modal
				animationType='slide'
				onRequestClose={() => {}}
				transparent
				visible={visible}
			>
				<View style={containerStyles}>
					<CardSection style={cardSectionStyles}>
						<Text style={textStyles}>{children}</Text> 
					</CardSection>

					<CardSection>
						<ModalButton onPress={onAccept}>Yes</ModalButton>
						<ModalButton onPress={onDecline}>No</ModalButton>
					</CardSection>
				</View>
			</Modal>
		);
};


const styles = {
	cardSectionStyles: {
		justifyContent: 'center' //default: flex-start
	},

	containerStyles: {
		backgroundColor: 'rgba(0,0,0,0.75)',
		flex: 1,
		justifyContent: 'center',
		position: 'relative'
	},

	textStyles: {
		flex: 1,
		fontSize: 18,
		lineHeight: 40,
		textAlign: 'center'	
	},
};

export { Confirm };