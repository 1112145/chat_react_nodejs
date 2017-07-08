import React from 'react';
import _ from 'lodash';
import { Container, Segment, Input, Icon, Divider, List, Image, Header } from 'semantic-ui-react';

import style from './style.scss';


// A component to show all online clients in a list.

class ChatList extends React.Component {

	constructor(props) {
		super(props);

		this.users = this.props.users || this.createDummyUser();

		this.state = {
			users: this.users,
			isToggled: true,
			isSearching: false
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
				<div className='chatlist-head' onClick={this.onClickToggle.bind(this)} >
					{this.renderBtnToggle()}
				</div>
				<div className='userlist'>
					{this.renderUserList()}
				</div>
				<Input className='search-user'
					icon='search' placeholder='Search' loading={this.state.isSearching}
					onChange={this.onSearch.bind(this)} />
			</Segment>
		</div>);
	}

	renderBtnToggle() {
		return <Icon color='black' name={(this.state.isToggled) ? "angle down" : "angle up"}
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
		return <List className='listview' selection divided verticalAlign='middle'>{items}</List>
	}


	onUserListItemClick(data) {
	}


	onClickToggle() {
		this.setState({ isToggled: !this.state.isToggled });
		this.container.style.bottom = (this.state.isToggled) ? "-320px" : "0px";
	}

	onSearch(event, data) {
		this.setState({ isSearching: true, value: data.value });
		setTimeout(() => {
			if (this.state.value.length < 1) this.setState({ users: this.users });

			const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
			const isMatch = (result) => re.test(result.name)

			this.setState({
				isSearching: false,
				users: _.filter(this.users,isMatch)
			});

		}, 500);
	}

}



export default ChatList;