import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { removePost, addLike, removeLike } from "../../actions/post";

const PostItem = ({
	post: { text, date, avatar, name, user, _id, likes, comments },
	auth,
	removePost,
	addLike,
	removeLike
}) => {
	return (
		<div className="post bg-white p-1 my-1">
			<div>
				<Link to={`/profile/${user}`}>
					<img className="round-img" src={avatar} alt="" />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p className="my-1">{text}</p>
				<p className="post-date">
					Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
				</p>
				<button
					onClick={() => {
						addLike(_id);
					}}
					type="button"
					className="btn btn-light"
				>
					<i className="fas fa-thumbs-up"></i>
					<span>{likes && likes.length > 0 && likes.length}</span>
				</button>
				<button
					onClick={() => {
						removeLike(_id);
					}}
					type="button"
					className="btn btn-light"
				>
					<i className="fas fa-thumbs-down"></i>
				</button>
				<Link to={`/post/${_id}`} className="btn btn-primary">
					Discussion{" "}
					{comments && comments.length > 0 && (
						<span className="comment-count">{comments.length}</span>
					)}
				</Link>
				{auth.user && user === auth.user._id && (
					<button
						type="button"
						className="btn btn-danger"
						onClick={() => {
							removePost(_id);
						}}
					>
						<i className="fas fa-times"></i>
					</button>
				)}
			</div>
		</div>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired
};
const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};
export default connect(mapStateToProps, { removePost, addLike, removeLike })(
	PostItem
);
