import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ post: { loading, posts }, getAllPosts }) => {
	useEffect(() => {
		getAllPosts();
	}, [getAllPosts]);
	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary">Posts</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Welcome to the community!
			</p>
			<div className="post-form">
				<PostForm />
			</div>
			{posts.length > 0 &&
				posts.map(post => {
					return <PostItem key={post._id} post={post} />;
				})}
		</Fragment>
	);
};

Posts.propTypes = {
	getAllPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		post: state.post
	};
};

export default connect(mapStateToProps, { getAllPosts })(Posts);
