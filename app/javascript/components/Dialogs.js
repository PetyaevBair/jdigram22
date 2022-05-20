import React from "react"
import PropTypes from "prop-types"

class Dialog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dialogId: this.props.dialog.id
			users: this.props.dialog.users
			messages: this.props.dialog.messages
		}
	}

	render () {
		return (
			<div className="dialog">
				<div className="user-part">
					<p>Учатсники:</p>
				</div>
				<div className="chat" data-channel-subscribe="dialog" data-dialog-id={dialog.id} id="dialog-messages">
				</div>
				<div className="send-message">
				</div>

		)
	}
}