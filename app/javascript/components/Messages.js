import React from "react"
import PropTypes from "prop-types"

class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: props.message,
			messageId: props.messageId,
			messageBody: props.messageBody,
			dialogId: props.dialogId
		};
	};

	render(){
		return(
			<div className="message" id={`message-${this.state.messageId}`}>
				<div>
					{this.state.messageBody}
					<a data-method="delete" data-remote="true" href={`/dialogs/${this.state.dialogId}/messages/${this.state.messageId}`}>
						<i className="remove-message fa fa-trash"/>
					</a>
				</div>
			</div>
		)
	}
}

export default Message