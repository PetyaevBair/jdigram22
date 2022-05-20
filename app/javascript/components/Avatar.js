import React from "react"
import PropTypes from "prop-types"

function Avatar(props) {
	if (props.url == '') {
		} else {
			return (
				<div className="avatar">
					<img className="user-image" src={props.url} />
				</div>
			);
		}
}

export default Avatar