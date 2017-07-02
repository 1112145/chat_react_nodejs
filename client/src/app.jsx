import React from 'react';
import ChatList from './containers/ChatList/index.jsx';


class ChatApp extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return <ChatList/>
	}

}


export default ChatApp;