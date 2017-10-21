import React, { Component } from 'react';

import { ListLine } from './reusable/';
import { exists } from './reusable/Library';

class ListItem extends Component {

	onRowPress() {
		const { word, navigation } = this.props;
		// navigate to WordDetails component and pass current navigation params + current word object
		navigation.navigate('details', { ...navigation.state.params, word });
		}

	render() {
		const { header, word } = this.props;
		return (
		<ListLine
			sectionHeader={header}
			match={exists(() => word.match)}
			// show title of notes (grey text on the right in the list component)
			// only if Section Header has a particular value
			matchTitle={header === 'Close Match' ? 'Matched in: ' : ''} 
			onPress={this.onRowPress.bind(this)}
			 // "exists" verifies that every prop of the value that is passed exists
			 // if any prop does not exist - returns undefiend instead of an error
			 // in this case it verifies that word and word.term exist
			term={exists(() => word.term)}
		/>);
	}
}

export default ListItem;



