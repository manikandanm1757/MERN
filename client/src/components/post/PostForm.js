import React, { useState } from "react";
import PropTypes from "prop-types";
import { addPost } from "../../actions/post";
import { connect } from "react-redux";

const PostForm = ({ addPost, auth: { user } }) => {
	const [text, setText] = useState("");
	const onSubmit = e => {
		e.preventDefault();
		const postObject = {
			text,
			name: user.name,
			avatar: user.avatar,
			user: user._id
		};
		addPost(postObject);
		setText("");
	};
	return (
		<div>
			<div className="post-form">
				<div className="bg-primary p">
					<h3>Say Something...</h3>
				</div>
				<form
					className="form my-1"
					onSubmit={e => {
						onSubmit(e);
					}}
				>
					<textarea
						name="text"
						cols="30"
						rows="5"
						placeholder="Create a post"
						required
						value={text}
						onChange={e => {
							setText(e.target.value);
						}}
					></textarea>
					<input type="submit" className="btn btn-dark my-1" value="Submit" />
				</form>
			</div>
		</div>
	);
};

PostForm.propTypes = {
	auth: PropTypes.object.isRequired,
	addPost: PropTypes.func.isRequired
};
const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps, { addPost })(PostForm);
