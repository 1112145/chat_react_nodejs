//http://redux.js.org/docs/Troubleshooting.html


export const messages = (state = [], action) => {
	switch(action.type) {
		case 'ADD_MESSAGE':{
			return [
			...state,
			action.message
			];
		}
		case 'READ_ALL_MESSAGES':{
			return state.map((m) => {
				if(m.status == 'unread'){
					return Object.assign({}, m, {status : 'read'});
				}
				return m;
			});
		}
		case 'SENT_SUCCESS':{
			return state.map((m) => {
				if(m === action.message){
					return Object.assign({}, m, {status : 'Sent!'});
				}
				return m;
			});
		}
		case 'ADD_MESSAGES':{
			return _addMessages(state, action.messages);
		}
		case 'CLEAR_ALL_MESSAGES': {
			return [];
		}
		default: return state;
	}
}

			
// push a new message array to the head of current message array.
function _addMessages(cur_msg_array, new_msg_array){
	var array = [];

	for (var i = 0; i < new_msg_array.length; i++) {
		var clone = Object.assign({},new_msg_array[i]);
		array.push(clone);
	}

	for (var i = 0; i < cur_msg_array.length; i++) {
		var clone = Object.assign({},cur_msg_array[i]);
		array.push(clone);
	}

	return array;
}
