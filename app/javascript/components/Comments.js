import React from "react"
import PropTypes from "prop-types"

class Comments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: props.comment,
			currentUser: props.currentUser,
			id: props.id
		}
	}

	render () {	
		let editComment = null
		let deleteComment = null
		if (this.state.currentUser != '') {
			if (this.state.currentUser.id==this.state.comment.user_id) {
				editComment = (<a data-remote="true" href={`/posts/${this.state.id}/comments/${this.state.comment.id}/edit`}>
						<i className="link-edit fa fa-edit edit-icon"></i>
					</a>);
				deleteComment = (<a data-method="delete" data-remote="true" href={`/posts/${this.state.id}/comments/${this.state.comment.id}`}>
						<i className="link-delete fa fa-trash del-icon"></i>
					</a>)
			}
		}
		return (	
			<div className="comment-blok" id={`comment_${this.state.comment.id}`}>
				<div className="comment-text">
					<a href={`/users/${this.state.comment.user_id}`} className="link-user">
					</a>
					{this.state.comment.text}
				</div>
				<div className="comment-edit">
					{ editComment }
					{ deleteComment }
				</div>
			</div>
		)
	}
}

export default Comments