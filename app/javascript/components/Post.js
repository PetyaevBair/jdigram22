import React from "react"
import PropTypes from "prop-types"
import Avatar from "./Avatar"
import Comments from "./Comments"
import CreateComment from "./CommentForm"

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: this.props.post.description,
			image: this.props.post.image,
			id: this.props.post.id,
			user_id: this.props.post.user_id,
			image: this.props.post.image,
			username: this.props.user.username,
			imageUrl: this.props.url,
			avatarUrl: this.props.user_url,
			comments: this.props.comments,
			currentUser: this.props.current_user,
			like: this.props.like,
			countLikes: this.props.count_likes,
			token: this.props.token
		};
		/*this.avatarImage = this.avatarImage.bind(this);*/
		console.log(this.state.currentUser);
	}

	render () {
		let avatar = null

		if (this.state.avatarUrl != '') {
			avatar = <Avatar 
						url={this.state.avatarUrl} 
					/>
		}

		let likePost = (<p className="like">
							<i className="fa fa-heart like_off" />
						</p>);
		let commentForm = null
		let editPost = null
		let deletePost = null

		if (this.state.currentUser != '') {
			if (this.state.like != '') {
				likePost = (<a data-method="post" data-remote="true" href={`/likes/Post/${this.state.id}`}><i className="like fa fa-heart like_on" id={this.state.id} /></a>)
			} else {
				likePost = (<a data-method="post" data-remote="true" href={`/likes/Post/${this.state.id}`}><i className="like fa fa-heart like_off" id={this.state.id} /></a>)
			};
			commentForm = <CreateComment
							userId={this.state.currentUser.id}
							id={this.state.id}
							token={this.state.token} />
			if (this.state.user_id == this.state.currentUser.id) {
				editPost = (<a href={`/posts/${this.state.id}/edit`}>
								<i className="link-post-edit fa fa-edit edit-icon"></i>
							</a>)
				deletePost =(<a data-method="delete" data-remote="true" href={`/posts/${this.state.id}`}>
								<i className="link-post-delete fa fa-trash del-icon"></i>
							</a>)
			}
		}

		return (
			<div className="post" id={`post_${this.state.id}`}>
				<div className="user">
					{ avatar }
					<div className="username">
						<a href={`/users/${this.state.user_id}`} className="nickname">
							{this.state.username}
						</a>
					</div>
					<div className="post-edit">
						{ editPost }
						{ deletePost }
					</div>
				</div>
				<img className="post-image" src={this.state.imageUrl}/>
				<div className="likes">
					{ likePost }
					<input className="count-likes" id={`like_${this.state.id}`} value={this.state.countLikes} />
				</div>
				<div className="description">
					{this.state.description}
				</div>
				<div className="comments-form">
					{ commentForm }
				</div>
				<div className="comments" id={`comment_box_${this.state.id}`}>
					{ this.state.comments.map(comment => {
						return (
							<Comments
								key={comment.id}
								comment={comment}
								id={this.state.id}
								currentUser={this.state.currentUser}
							/>
							)
						}) 
					}
				</div>
			</div>
		)
	}
}

export default Post