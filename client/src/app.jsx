import React from 'react';
import io from 'socket.io-client';
import { Container } from 'semantic-ui-react';

import User from './models/user.js';
import ChatList from './containers/ChatList/index.jsx';



class ChatApp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			recipients: [],
			currentRecipient: {}
		}
	}

	componentWillMount() {
		this.socket = io.connect();
		this.socket.on('connect', this.onConnect.bind(this));
		this.socket.on('disconnect', this.onDisconnect.bind(this));
		this.socket.on('online_users', function(users){
			this.setState({recipients: users});
		}.bind(this))
	}

	render() {
		return <Container>
				<ChatList users ={this.state.recipients} onSelectRecipient={this.onSelectRecipient.bind(this)} />
			</Container>
	}

	onConnect(){
		this.socket.emit('who',this.props.owner);
		if(this.props.onConnect) this.props.onConnect.call(this);
	}

	onDisconnect(){
		console.log('disconnected!');
		if(this.props.onDisconnect) this.props.onDisconnect.call(this);
	}

	onSelectRecipient(recipient){
		this.setState({currentRecipient: recipient});
	}

}


export default ChatApp;