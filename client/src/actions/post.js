import axios from "axios";
import { setAlert } from "./alert";
import {
	GET_POSTS,
	POST_ERROR,
	GET_POST,
	ADD_POST,
	REMOVE_POST,
	UPDATE_LIKES,
	UPDATE_COMMENTS
} from "./types";

// Get all posts
export const getAllPosts = () => {
	return async dispatch => {
		try {
			let res = await axios.get("/api/post");
			dispatch({
				type: GET_POSTS,
				payload: res.data
			});
		} catch (err) {
			console.log(err.message);
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	};
};

// Get post by id
export const getPost = id => {
	return async dispatch => {
		try {
			let res = await axios.get(`/api/post/${id}`);
			dispatch({
				type: GET_POST,
				payload: res.data
			});
		} catch (err) {
			console.log(err.message);
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	};
};

// Add post
export const addPost = post => {
	return async dispatch => {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		const body = JSON.stringify(post);
		try {
			const res = await axios.post(`/api/post/`, body, config);
			dispatch({
				type: ADD_POST,
				payload: res.data
			});
			dispatch(setAlert("Post added successfully", "success"));
		} catch (err) {
			console.log(err.message);
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	};
};

// Remove post
export const removePost = id => {
	return async dispatch => {
		try {
			await axios.delete(`/api/post/${id}`);
			dispatch({
				type: REMOVE_POST,
				payload: id
			});
			dispatch(setAlert("Post removed successfully", "success"));
		} catch (err) {
			console.log(err.message);
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	};
};

// Like post
export const addLike = postId => {
	return async dispatch => {
		try {
			const res = await axios.put(`/api/post/like/${postId}`);
			dispatch({
				type: UPDATE_LIKES,
				payload: { postId, likes: res.data }
			});
		} catch (err) {
			console.log(err.message);
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	};
};

// Remove like
export const removeLike = postId => {
	return async dispatch => {
		try {
			const res = await axios.put(`/api/post/unlike/${postId}`);
			dispatch({
				type: UPDATE_LIKES,
				payload: { postId, likes: res.data }
			});
		} catch (err) {
			console.log(err.message);
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	};
};

// Add comment to post
export const addComment = (postId, comment) => {
	return async dispatch => {
		debugger;
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		const body = JSON.stringify(comment);
		try {
			const res = await axios.put(`/api/post/comment/${postId}`, body, config);
			dispatch({
				type: UPDATE_COMMENTS,
				payload: res.data
			});
		} catch (err) {
			console.log(err.message);
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	};
};

// Remove comment to post
export const removeComment = (postId, commentId) => {
	return async dispatch => {
		try {
			const res = await axios.delete(
				`/api/post/comment/${postId}/${commentId}`
			);
			dispatch({
				type: UPDATE_COMMENTS,
				payload: res.data
			});
		} catch (err) {
			console.log(err.message);
			dispatch({
				type: POST_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	};
};
