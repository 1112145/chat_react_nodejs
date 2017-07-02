import React from 'react';
import { Container, Segment, Input, Icon, Divider, List, Image } from 'semantic-ui-react';

import style from './style.scss';


// A component to show all online clients in a list.

class ChatList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			users: this.props.users || this.createDummyUser(),
			isToggled: true
		}
	}

	createDummyUser() {
		var users = [];
		for (var i = 1; i < 20; i++) {
			users.push({ id: i, name: "User " + i })
		}
		return users;
	}

	render() {
		return (<div className="chatlist" ref={(container) => { this.container = container }}>
			<Segment className='segment-chatlist'>
				<Container className='chatlist-head' onClick={this.onClickToggle.bind(this)} >
					{this.renderBtnToggle()}
				</Container>

				<Container className='userlist'>
					{this.renderUserList()}
				</Container>
				<Input className='search-user' icon='search' placeholder='Search' />
			</Segment>
		</div>);
	}

	renderBtnToggle() {
		return <Icon name={(this.state.isToggled) ? "angle down" : "angle up"}
			size='large' />
	}

	renderUserList() {
		var items = [];
		for (var i = 0; i < this.state.users.length; i++) {
			var item = <List.Item key={i} className='listview-item' onClick={this.onUserListItemClick.bind(this, this.state.users[i])}>
				<Image src='https://image.flaticon.com/icons/svg/145/145867.svg' avatar />
				{this.state.users[i].name}
				<Icon className='dot' name='circle' color='green'></Icon>
			</List.Item>
			items.push(item);
		}
		return <List className='listview' animated divided verticalAlign='middle'>{items}</List>
	}


	onUserListItemClick(data) {
	}


	onClickToggle() {
		this.setState({ isToggled: !this.state.isToggled });
		this.container.style.bottom = (this.state.isToggled) ? "-320px" : "0px";
	}

}



export default ChatList;