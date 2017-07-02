import React from 'react'; 
import $ from 'jquery';
import _ from 'lodash';
import { connect } from 'react-redux';


import { addMessage, addMessages, clearAllMessage, readAllMessages} from '../actions/actions';
import style from '../styles/chatfeed.scss';
import ChatBubble from '../components/chatbubble';
import ChatInput from '../containers/chatinput';



// A component hold bubbles and chat input.

class ChatFeed extends React.Component  {

	constructor(props) {
    	super(props);

    	this.state = {
    		isRecipientTying: false,
    	}


    	this.props.io.socket.on('HISTORY', this.onReceiveHistoryMessages.bind(this));
    	this.props.io.socket.on('MESSAGE', this.onRecieveMessage.bind(this));
    	this.props.io.socket.on('TYPING', this.onTypingSocketEvent.bind(this));
  	}

  	componentWillMount(){
  		if(this.props.user.role == 'Client'){
  			this.props.io.getChatHistory(this.props.user.id, 0);
  		}
  	}

  	render(){
  		if(this.props.user.role != "Client" && _.isEmpty(this.props.recipient)) 
  			return null;

		return (<div className="chatfeed" onClick={this.onClickChatFeed.bind(this)}>
				<div id = "messages">
					<div>
						{this._renderMessages(this.props.messages)}
					</div> 
					{this._renderRecipientTypingState()}
				</div>
				<ChatInput io={this.props.io} user={this.props.user}/>
				</div>);
	}

	componentDidUpdate(){
		if(_.isUndefined(this.scrollView)) {
			$('#messages').on('scroll', this.onFeedScroll.bind(this));
			this.scrollView = $('#messages');
		}
		this._scrollToBottom();
	}
	
	_renderRecipientTypingState(){
		var divStyle = { display: 'block'};
		const element = <img style = {divStyle} src="http://principlerepo.com/wp-content/uploads/2017/03/wsi-imageoptim-typing-status.gif" width='40px' height='32px'/>;
		divStyle.display = (this.state.isRecipientTying)? 'block': 'none';
		return element;
	}

	onFeedScroll(){
		var scrollTop = this.scrollView.scrollTop();

		if(scrollTop <= 0){
			console.log('top reached! load more! ' + this.props.messages[0].time);
			this.props.io.getChatHistory(this.props.user.id, this.props.recipient.id, this.props.messages[0].time);
		}	
	}


  	_renderMessages(messages){
  		if(messages.length == 0) return null;

  		var bubbles = [];

  		for (var i = 0 ; i < messages.length; i++) {
  			bubbles.push(<ChatBubble message = {messages[i]} key={i}/>)
  		}

  		return <div id = "bubbles"> {bubbles} </div>
  	}

	_scrollToBottom(){
		this.scrollView.scrollTop(this.scrollView.prop("scrollHeight"));
	}

	componentWillReceiveProps(props){
		if(props.recipient != this.props.recipient){
			this.props.dispatch(clearAllMessage());
			this.props.io.getChatHistory(props.user.id, props.recipient.id);
		}
		
	}

	onTypingSocketEvent(params){
		if(params.recipientId == this.props.user.id){
			this.setState({ isRecipientTying: params.isTyping});
		}
	}

	onRecieveMessage(message) {

		if(_.isEmpty(message.recipient) && message.sender.id == this.props.recipient.id ){
			message.isRecipient = true;
			this.props.dispatch(addMessage(message));
		}
		else if(message.recipient.id == this.props.user.id){
			message.isRecipient = true;
			this.props.dispatch(addMessage(message));
		}
	}

	onClickChatFeed(){
		var unread_messages = _.filter(this.props.messages,['status','unread']);

		if(!_.isEmpty(unread_messages)){
			var unread_message_id_list = _.map(unread_messages,'messageId');
			this.props.io.markAsRead(unread_message_id_list,this.props.user);
		}

		this.props.dispatch(readAllMessages());
		
	}

	onReceiveHistoryMessages(history_messages){

		for (var i = 0; i < history_messages.length; i++) {
			history_messages[i].sender = (history_messages[i].senderId == this.props.user.id)? this.props.user: this.props.recipient;
			history_messages[i].recipient = (history_messages[i].recipientId == this.props.user.id)? this.props.user: this.props.recipient;
			history_messages[i].isRecipient = (history_messages[i].recipientId == this.props.user.id)? true : false;
		}

		history_messages.sort(function(a,b){ 
			var unix_time1 = new Date(a.createdAt).getTime()/1000;
			var unix_time2 = new Date(b.createdAt).getTime()/1000;
			return unix_time1 - unix_time2;
		});

		this.props.dispatch(addMessages(history_messages));

	}


}

const mapStateToProps = function(state){
	return {messages: state.messages, recipient: state.recipient }
}



export default connect(mapStateToProps,null) (ChatFeed);