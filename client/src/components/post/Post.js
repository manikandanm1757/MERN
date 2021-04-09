import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getPost, addComment, removeComment } from "../../actions/post";
import Spinner from "../layout/Spinner";
import Comment from "./Comment";

const Post = ({
	getPost,
	posts: { post, loading },
	match,
	addComment,
	removeComment
}) => {
	const [commentText, setCommentText] = useState("");
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost]);
	return post == null || loading ? (
		<Spinner />
	) : (
		<Fragment>
			<Link to="/posts" className="btn">
				Back To Posts
			</Link>
			<div className="post bg-white p-1 my-1">
				<div>
					<Link to={`/profile/${post.user}`}>
						<img className="round-img" src={post.avatar} alt="" />
						<h4>{post.name}</h4>
					</Link>
				</div>
				<div>
					<p className="my-1">{post.text}</p>
				</div>
			</div>

			<div className="post-form">
				<div className="bg-primary p">
					<h3>Leave A Comment</h3>
				</div>
				<form
					onSubmit={e => {
						e.preventDefault();
						addComment(post._id, { text: commentText });
						setCommentText("");
					}}
					className="form my-1"
				>
					<textarea
						name="text"
						cols="30"
						rows="5"
						placeholder="Comment on this post"
						value={commentText}
						onChange={e => {
							setCommentText(e.target.value);
						}}
						required
					></textarea>
					<input type="submit" className="btn btn-dark my-1" value="Submit" />
				</form>
			</div>
			{post.comments.length > 0 && (
				<div className="comments">
					{post.comments.map(comment => {
						return (
							<Comment
								key={comment._id}
								comment={comment}
								deleteComment={() => {
									removeComment(post._id, comment._id);
								}}
							/>
						);
					})}
				</div>
			)}
		</Fragment>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired,
	addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		posts: state.post
	};
};

export default connect(mapStateToProps, { getPost, addComment, removeComment })(
	withRouter(Post)
);
