import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Comment = ({
	comment: { user, text, name, avatar, date, _id },
	auth,
	deleteComment
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
				{auth.user && user === auth.user._id && (
					<button
						onClick={() => {
							deleteComment();
						}}
						type="button"
						className="btn btn-danger"
					>
						<i className="fas fa-times"></i>
					</button>
				)}
			</div>
		</div>
	);
};

Comment.propTypes = {
	auth: PropTypes.object.isRequired
};
const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};
export default connect(mapStateToProps)(Comment);
