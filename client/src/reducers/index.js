import { combineReducers } from 'redux';
import { messages } from './message';
import { recipient, recipients } from './recipient'; 

const chatApp = combineReducers({
	messages,
	recipient,
	recipients
})

export default chatApp;