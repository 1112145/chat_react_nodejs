
export const recipient = (state = {}, action) =>{
	switch(action.type) {
		case 'SELECT_RECIPIENT':
			return action.recipient
		default:
      		return state
	}
}

export const recipients = (state = [] , action) => {
	switch(action.type) {
		case 'GET_ONLINE_RECIPIENT_LIST': 
			return action.recipient_list;
		default:
			return state;
	}

}

