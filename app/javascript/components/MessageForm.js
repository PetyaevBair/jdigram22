import React from "react"
import PropTypes from "prop-types"

class MessageForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dialog: props.dialog,
			currentUser: props.currentUser,
			body: '',
			token: props.token,
			userId: props.currentUser.id
		};
		this.handleBodyChange = this.handleBodyChange.bind(this);
	}

	handleBodyChange(e) {
		this.setState({body: e.target.value});
	}

	handleMessageSubmit = event => {
		event.preventDefault();
		/*const message = { body: this.state.body, 
											user_id: this.state.userId };
		console.log(message);*/
		const formData = new FormData();
		formData.append('body', this.state.body);
		formData.append('user_id', this.state.userId);
		fetch(`/dialogs/${this.state.dialog.id}/messages`, {
			method: "POST",
			body: formData,
			dataType: "script",
			headers: {
				'Content_Type': 'application/json',
				'X-CSRF-Token': this.state.token
			}
		}).then(response => response.text())
	.then(data => {
  eval(data);
  });
	}

	render () {
		return(
			<div className="msg">
				<form onSubmit={this.handleMessageSubmit}>
					<div className="form-group">
						<textarea 
							id={`message-text-${this.state.dialog.id}`}
							name="body"
							onChange={this.handleBodyChange}>
						</textarea>
					</div>
					<div>
						<input type="submit" value="Отправить" className="btn btn-primary" />
					</div>
				</form>
			</div>
		)
	}
}

export default MessageForm