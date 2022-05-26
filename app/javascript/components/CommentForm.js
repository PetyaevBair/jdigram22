import React from "react"
import PropTypes from "prop-types"

class CreateComment extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			commentableType: "Post",
			commentableId: props.id,
			userId: props.userId,
			token: props.token
		};
		this.handleTextChange = this.handleTextChange.bind(this);
	}

	handleTextChange(e) {
		this.setState({text: e.target.value});
	}

	handleCommentSubmit = event => {
		event.preventDefault();
		const comment = { text: this.state.text };
		fetch(`/posts/${this.state.commentableId}/comments`, {
			method: "POST",
			body: JSON.stringify(comment),
			dataType : "script",
			headers: {
				'Content-Type': 'application/json',
        		'X-CSRF-Token': this.state.token
		 	}
		}).then(response => response.text())
      .then(data => {
       eval(data);
    });
		// .then((response) => response.text());
		// .catch((error) => console.log(error));
	}

	render () {
		return (
			<div>
				<form onSubmit={this.handleCommentSubmit}>
					<div>
						<p className="comment-label">
							<label>Добавить комментарий</label>
						</p>
						<p>
							<input 
								type="text" 
								id={`comment-text-${this.props.id}`}
								name="text"
								onChange={this.handleTextChange} />
						</p>
					</div>
					<div className="comment-button">
						<p>
							<input type="submit" value="Отправить" className="btn btn-primary" />
						</p>
					</div>
				</form>
			</div>
		)
	}
}

export default CreateComment