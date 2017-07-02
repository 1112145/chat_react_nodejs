import React from 'react'; 
import $ from 'jquery';
import _ from 'lodash';

import style from '../styles/chatbubble.scss';
import v from '../ultils/validator';
import h from '../ultils/helper';




// A component that hold the message content and render it!.

class ChatBubble extends React.Component  {

	 constructor(props) {
    	super();

      this.popup = $('#popup');

  	}


    render(){
      return (<div className ="clearfix" >{this._renderMsg(this.props.message)}</div>);
    }


  	// Render a message in the bubble.
  	_renderMsg(message) {

      return (!message.isRecipient)? this._renderSenderMassage(message): this._renderRecipientMessage(message);
  	}

  	_renderRecipientMessage(message){

  		var messageContent = this._renderMessageContent(message);

  		return(<div className="talk-bubble round tri-right btm-left-in right">
					   {messageContent}
				      </div>);
  	}

  	_renderSenderMassage(message){

  		var messageContent = this._renderMessageContent(message);

  		return (<div className="talk-bubble round tri-right btm-right-in left">
					{messageContent}
				</div>);
  	}

  	_renderMessageContent(message){

  		if(message.type == "text"){
        return <div className="talktext">
                  {(v.urlValidator.isURL(message.data))? this._renderLink(message): this._renderRawText(message)}
                  <p className="time">{message.time}</p>
                  {this._renderMessageStatus(message)}
                </div>;

  		}else if(message.type == "image"){
  			
        return this._renderImage(message);
  		}
  	}

  	_renderImage(message) { 
      return (<div className="img_msg">
                <img  src={message.data} width = "80%"/><p className="time">{message.time}</p> {this._renderMessageStatus(message)}
              </div>);
    }

  	_renderRawText(message){
      const unread = (<b>{this._renderSenderName(message) + ": " + message.data}</b>);
      const read = (<p>{this._renderSenderName(message) + ": " + message.data}</p>);
      return (message.status == 'unread')? unread : read;
  	}

  	_renderLink(message){
      const read = <div><p>{ this._renderSenderName(message) }</p>
                    <a id="link" href={ message.data }>{ message.data }</a>
                    {this._renderLinkPreview(message)}</div>;

      const unread =  <div><b>{ this._renderSenderName(message) }</b>
                    <a id="link" href={ message.data }>{ message.data }</a>
                    {this._renderLinkPreview(message)}
                    </div>;            
  		
      return (message.status == 'unread')? unread : read;
  	}

    _renderLinkPreview(message){
      if(v.urlValidator.isYouTubeLink(message.data)){

        var video_id = h.urlHelper.getYouTubeId(message.data);

        if(video_id != ''){
          var url_youtube = "//www.youtube.com/embed/";
          return <iframe className="iframe" src={ url_youtube + video_id}>{url_youtube + video_id}</iframe>
        }

      }
    }

    _renderMessageStatus(message){

      return (message.isRecipient)? null: <p className="status">{message.status}</p>;
    }

    _renderSenderName(message){

      return (_.isEmpty(message.sender))? "Admin" : message.sender.name;
    }



  	
}

export default ChatBubble;

