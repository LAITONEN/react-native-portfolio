import { applyMiddleware, compose, createStore } from 'redux'; 
import ReduxThunk from 'redux-thunk';
/*import { autoRehydrate, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';*/
import reducers from './reducers';



const store = createStore(
	reducers,
	{},
	compose(applyMiddleware(ReduxThunk))
);



export default store;