import React from 'react'; 
import $ from 'jquery';
import { connect } from 'react-redux';

import h from '../ultils/helper';
import { addMessage, sentSuccess, readAllMessages } from '../actions/actions';
import SmartInput from '../components/smartinput';
import style from '../styles/chatinput.scss';

// Component to handle user input to send messages.

class ChatInput extends React.Component  {

	constructor(props) {
    	super(props);

	}
    	

  	componentDidMount(){

    	this.inputImage = $('#img_upload')[0];

    	this.smartInput.onEnterKeyDown = this.onEnterKeyDown.bind(this);

    	this.smartInput.onInputChange = this.onChangeInputText.bind(this);

    	this.smartInput.onClick = this.onClickInputText.bind(this);
  	}

	render(){

		return (
				<div>
					<SmartInput ref={(smartInput) => { this.smartInput = smartInput }}/>
					<label id="label_image_upload" htmlFor="img_upload">
						<img src="http://www.freeiconspng.com/uploads/photos-icon-8.png" width="32px" height="32px"/>
					</label>
					<input id="img_upload" type="file" onChange = {this.sendImageMessage.bind(this)}/>
				</div>);
	}

	onEnterKeyDown(){
		this.sendTextMessage();
		this._emitTypingState(false);
	}



	onChangeInputText(){
		this._checkIsTyping();
	}
		



	onClickInputText(){
		this.props.dispatch(readAllMessages());
	}


	sendTextMessage(){
		
		var msg = this.smartInput.m_input.val();

      	var message = this._createMessage(msg,'text');
		
		this._send(message);
	}


	sendImageMessage(){

		if (this.inputImage.files && this.inputImage.files[0]) {

	        var reader = new FileReader();

	        reader.onload = function (e) {

	        	var message = this._createMessage(e.target.result,'image');

				this._send(message);
				
			}.bind(this);
				
	      }

	    reader.readAsDataURL(this.inputImage.files[0]);
	}


	_send(message){

		message.status = 'sending...';

		this.props.dispatch(addMessage(message));

		this.props.io.sendMessage(message , function(res){
			if(res == "success"){
				this.props.dispatch(sentSuccess(message));
			}
		}.bind(this));
		
	}

	_createMessage(data, type){
		return {
			id: h.Date.generateUUID(),
			data: data,
			type: type,
			sender: this.props.user,
			recipient: this.props.recipient,
			time: h.Date.getTime(),
			isRecipient: false
		}
	}

	_checkIsTyping(){
		
		if(this.smartInput.m_input.val() != ''){
			this._emitTypingState(true);
		}
		else {
			this._emitTypingState(false);
		}
	}


	_emitTypingState(isTyping){

		var senderId = this.props.user.id;

		var recipientId = (_.isEmpty(this.props.recipient))? 0: this.props.recipient.id;
		
		this.props.io.emitTyping(isTyping, senderId, recipientId);
	}
}

const mapStateToProps = function(state){
	return {recipient: state.recipient, recipients: state.recipients}
}


export default connect(mapStateToProps, null)(ChatInput);

