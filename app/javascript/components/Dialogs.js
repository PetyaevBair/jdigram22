import React from "react"
import PropTypes from "prop-types"
import Message from "./Messages"
import MessageForm from "./MessageForm"

class Dialog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dialogId: this.props.id,
			users: this.props.users,
			messages: this.props.messages,
			currentUser: this.props.current_user,
			dialog: this.props.dialog,
			token: this.props.token
		};
	}

	render () {
		return (
			<div className="dialog">
				<div className="user-part">
					<p>Участники:</p>
						{ this.state.users.map((user, index) => {
							return (<p key={index}><a className="list-user" href={`/users/${user.id}`}>{user.username}</a></p>)
							})
						}
				</div>
				<div className="chat" id="dialog-messages" data-channel-subscribe="dialog" data-dialog-id={this.state.dialog.id}>
					{ this.state.messages.map(message => {
							return(
									<Message
										key={message.id}
										message={message}
										messageId={message.id}
										messageBody={message.body}
										dialogId={this.state.dialogId}
									/>
								)
						}) 
					}
				</div>
				<div className="send-message">
					<MessageForm
						currentUser={this.state.currentUser}
						dialog={this.state.dialog}
						token={this.state.token}
					/>
				</div>
			</div>
		)
	}
}

export default Dialog