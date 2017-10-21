import React, { Component } from 'react';
import { Animated, Dimensions, LayoutAnimation, PanResponder, Platform, UIManager, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH; 
const SWIPE_OUT_SPEED = 250;

// NOT IN USE YET
class Swipe extends Component {
	// if the user does not pass the prop from this statis var to this component, the default
	// value mentioned here will be set to it
	static defaultProps = {
		keyProp: 'id',
		onSwipeLeft: () => {},
		onSwipeRight: () => {}
	}
	constructor(props) {
		super(props);
		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true, // true - panResponder is responsible for user touches
			onPanResponderMove: (event, gesture) => { 	
				// event - what element was pressed down by the user
				// gesture - where and how quickly is the user moving his finger
				position.setValue({ x: gesture.dx, y: gesture.dy });
				},
			onPanResponderRelease: (event, gesture) => { 
				if (gesture.dx > SWIPE_THRESHOLD)
				{
					this.keepSwipingOut(SCREEN_WIDTH);
				}
				else if (gesture.dx < -SWIPE_THRESHOLD)
				{
					this.keepSwipingOut(-SCREEN_WIDTH);
				}
				else 
				{
					this.resetPosition(); 
				}
			}
		});
		this.state = { cardNumber: 0, panResponder, position };
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			this.setState({ cardNumber: 0 });
		}
	}

	componentWillUpdate() {
		// ANDROID
		// if the first part exists, call the second part with the specified value (true)
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
		// iOS
		LayoutAnimation.spring();
	}

	onSwipeComplete(direction) {
		const { data, onSwipeLeft, onSwipeRight } = this.props;
		const item = data[this.state.cardNumber];
		direction > 0 ? onSwipeRight(item) : onSwipeLeft(item);
		this.state.position.setValue({ x: 0, y: 0 });
		this.setState({ cardNumber: this.state.cardNumber + 1 }); // resetting, not modifying by cardNum++
		}

	getCardsStyle() {
		const { position } = this.state;
		const rotate = position.x.interpolate({
			inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
			outputRange: ['-120deg', '0deg', '120deg']
		});
		return {
			// adding all the properties from getLayout() + additional 'transform'
			...position.getLayout(), 
			//getLayout - object of how the card should be positioned in the x-y direction
			transform: [{ rotate }]
			};
	}

	keepSwipingOut(x) {
		Animated.timing(this.state.position, {
			toValue: { x, y: 0 },
			duration: SWIPE_OUT_SPEED
		}).start(() => { this.onSwipeComplete(x); });
	}

	resetPosition() {
		Animated.spring(this.state.position, { 
			toValue: { x: 0, y: 0 }
		}).start();
	}

	renderCards() {
		if (this.state.cardNumber >= this.props.data.length) 
		{
			return this.props.renderNoMoreCards();
		}
		const deck = this.props.data.map((item, index) => {
			if (index < this.state.cardNumber) { return null; }
			if (index === this.state.cardNumber)
			{
				return (
				<Animated.View 
				key={item[this.props.keyProp]} // always attach the key prop whenever we build a list
				style={[this.getCardsStyle(), styles.cardStyle]}
				{...this.state.panResponder.panHandlers}
				>
				{this.props.renderCard(item)}
				</Animated.View>
				);
			}
			return ( 
				<Animated.View 
				key={item[this.props.keyProp]} 
				style={[styles.cardStyle, { top: 2 * (index - this.state.cardNumber) } ]}
				>
				{this.props.renderCard(item)}
				</Animated.View>
				);
		});

		return Platform.OS === 'android' ? deck : deck.reverse()
	}
	render() {
		return (
			<View>
				{this.renderCards()}
			</View>
			);
	}
}

const styles = {
	cardStyle: {
		position: 'absolute',
		width: SCREEN_WIDTH
	}
};

export default Swipe;

