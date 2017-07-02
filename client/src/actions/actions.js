

export function addMessage(message) {
	return {
		type: 'ADD_MESSAGE',
		message
	}
}

export function sentSuccess(message) {
	return {
		type: 'SENT_SUCCESS',
		message
	}
}

export function readAllMessages() {
	return {
		type: 'READ_ALL_MESSAGES'
	}
}

export function addMessages(messages) {
	return {
		type: 'ADD_MESSAGES',
		messages
	}
}

export function clearAllMessage() {
	return {
		type: 'CLEAR_ALL_MESSAGES'
	}
}

export function selectRecipient(recipient) {
	return {
		type: 'SELECT_RECIPIENT',
		recipient
	}
}

export function receiveOnlineRecipientList(recipient_list){
	return {
		type: 'GET_ONLINE_RECIPIENT_LIST',
		recipient_list
	}
}

