import {
	GET_POSTS,
	POST_ERROR,
	GET_POST,
	ADD_POST,
	REMOVE_POST,
	UPDATE_LIKES,
	UPDATE_COMMENTS
} from "../actions/types";
const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: null
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_POSTS:
			return {
				...state,
				loading: false,
				error: null,
				posts: payload
			};
		case ADD_POST:
			return {
				...state,
				loading: false,
				error: null,
				posts: [payload, ...state.posts]
			};
		case REMOVE_POST:
			return {
				...state,
				loading: false,
				error: null,
				posts: state.posts.filter(pt => {
					return pt._id !== payload;
				})
			};
		case GET_POST:
			return {
				...state,
				loading: false,
				error: null,
				post: payload
			};
		case UPDATE_LIKES:
			return {
				...state,
				loading: false,
				error: null,
				posts: state.posts.map(post => {
					return post._id === payload.postId
						? { ...post, likes: payload.likes }
						: post;
				})
			};
		case UPDATE_COMMENTS:
			return {
				...state,
				loading: false,
				error: null,
				post: { ...state.post, comments: payload }
			};
		case POST_ERROR:
			return {
				...state,
				loading: false,
				error: payload
			};
		default:
			return state;
	}
};
