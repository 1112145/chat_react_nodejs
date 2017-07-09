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
		this.socket.on('connect', function(){
			this.socket.emit('who',this.props.owner);
		}.bind(this));
		this.socket.on('connecting', function(){
			console.log('connecting!');
		});
		this.socket.on('disconnect', function(){
			console.log('disconnected!');
		})
		this.socket.on('online_users', function(users){
			console.log(users);
			this.setState({recipients: users});
		}.bind(this))
	}

	render() {
		return <Container>
				<ChatList users ={this.state.recipients} onSelectRecipient={this.onSelectRecipient.bind(this)} />
			</Container>
	}

	onSelectRecipient(recipient){
		this.setState({currentRecipient: recipient});
	}

}


export default ChatApp;