import React from 'react';
import ReactDOM from 'react-dom';

import Chat from '../index.js';
import User from '../src/models/user.js';
import style from './style.scss';
import { Segment, Header, Button, Image } from 'semantic-ui-react';




class DemoUsingChat extends React.Component {

    constructor(props) {
        super(props);

        this.demoUsers = [
            new User(0, "Fox", "https://image.flaticon.com/icons/svg/194/194187.svg"),
            new User(1, 'Tiger', "https://image.flaticon.com/icons/svg/235/235372.svg"),
            new User(2, "Monkey", "https://image.flaticon.com/icons/svg/194/194199.svg"),
            new User(3, "Eagle", "https://image.flaticon.com/icons/svg/187/187064.svg")
        ]

        this.state = {
            me: this.demoUsers[0],
            isReadyToChat: false
        }
    }

    render() {
        return <div> {(!this.state.isReadyToChat) ? this.renderPreChat() : this.renderChat()}</div>
    }


    renderPreChat() {
        return <Segment>
            <Header as='h1' color='black' textAlign='center'>CHOOSE YOUR AVATAR</Header>
            <Button.Group className='center' color='blue'>
                {this.renderButtonGroup()}
            </Button.Group>
            <Image className='center' src={this.state.me.avatar} size='tiny'></Image>
            <Button className="center" color='green' onClick={()=>{this.setState({isReadyToChat: true});}}>READY TO CHAT</Button>
        </Segment>

    }

    renderChat() {
        return <Chat owner={this.state.me} onDisconnect={()=>{this.setState({isReadyToChat: false});}}/>;
    }

    renderButtonGroup() {
        var buttons = [];
        for (var i = 0; i < this.demoUsers.length; i++) {
            buttons.push(<Button key={i} onClick={this.onClickChooseAvatar.bind(this, i)}>{this.demoUsers[i].name}</Button>)
        }
        return buttons;
    }

    onClickChooseAvatar(index) {
       this.setState({me: this.demoUsers[index]});
    }


}




ReactDOM.render(<DemoUsingChat></DemoUsingChat>, document.getElementById('root'));