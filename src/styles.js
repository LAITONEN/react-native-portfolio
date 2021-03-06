// Styles are ordered alphabetically ascending (A-B-C)

import { Dimensions } from 'react-native';

// const screenHeight = Dimensions.get('window').height;

// All the styles used in Class Components (that used as React-Navigation's screen)

export const addWordStyles = {
	containerStyle: {
		borderColor: '#DDD',
		borderBottomWidth: 0,
		borderRadius: 2,
		borderWidth: 1,
		elevation: 2,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	errorShowStyle: {
		alignSelf: 'center',
		fontSize: 20,
		color: 'red',
	},
	errorHideStyle: {
		height: 0
	},
	inputStyle: {
		alignSelf: 'center',
		color: '#000',
		flex: 2,
		fontSize: 18,
		height: 40,
		paddingLeft: 5,
		paddingRight: 5,
	},
	labelStyle: {
		flex: 1,
		fontSize: 18,
		paddingLeft: 20,
	},
	termView: {
		alignItems: 'center',
		height: 40,
		flex: 1,
		flexDirection: 'row'
	},
	viewStyle: (height) => ({
		backgroundColor: 'white', 
		height: height + 2
	}),
};

export const editWordStyles = {
	containerStyle: {
		borderColor: '#DDD',
		borderBottomWidth: 0,
		borderRadius: 2,
		borderWidth: 1,
		elevation: 2,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	errorShowStyle: {
		alignSelf: 'center',
		fontSize: 20,
		color: 'red',
	},
	errorHideStyle: {
		height: 0
	},
	container: {
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	lineStyle: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		height: 40
	},
	inputStyle: {
		alignSelf: 'center',
		color: '#000',
		flex: 2,
		fontSize: 18,
		lineHeight: 23,
		paddingLeft: 5,
		paddingRight: 5,
	},
	labelStyle: {
		flex: 1,
		fontSize: 18,
		paddingLeft: 20,
	},
	viewHeight: (height) => ({
		backgroundColor: 'white', 
		height: height * 0.833
	}),
};

export const listItemStyles = {
	noteStyle: {
		color: '#C7C7CD',
		flex: 2,
		fontSize: 12,
	},
	noteTitleStyle: {
		color: '#C7C7CD',
		flex: 2,
		fontSize: 16,
		left: 7,
	},
	sectionStyle: {
		alignItems: 'center',
		backgroundColor: '#FFF',
		borderBottomWidth: 1,
		borderColor: 'rgba(0, 122, 255, 0.3)',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: 5,
		position: 'relative',
	},
	termStyle:
	{
		flex: 3,
		fontSize: 18,
		marginRight: 20,
		paddingLeft: 15
	},
	titleStyle: {
		flex: 3,
		fontSize: 22,
		fontWeight: 'bold',
		paddingLeft: 15
	},
};

export const wordDetailsStyles = {
	containerStyle: {
		borderColor: '#DDD',
		borderBottomWidth: 0,
		borderRadius: 2,
		borderWidth: 1,
		elevation: 2,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	viewStyle: {
		backgroundColor: 'white', 
		height: Dimensions.get('window').height,
	},
};