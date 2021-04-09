import axios from "axios";
import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	ACCOUNT_DELETED,
	GET_GITHUB_REPOS
} from "../actions/types";
import { setAlert } from "./alert";

export const getCurrentProfile = () => {
	return async dispatch => {
		try {
			const res = await axios.get("/api/profile/me");
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	};
};

//Create or update profile
export const createProfile = (profile, isEdit, history) => {
	return async dispatch => {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		const body = JSON.stringify(profile);
		try {
			const res = await axios.post("/api/profile", body, config);
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
			history.push("./dashboard");
			dispatch(
				setAlert(
					isEdit ? "Profile updated success" : "Profile created successfully",
					"success"
				)
			);
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				return errors.forEach(error => {
					dispatch(setAlert(error.msg, "danger"));
				});
			}
			dispatch({
				type: PROFILE_ERROR
			});
		}
	};
};

//Add Education
export const addEducation = (education, history) => {
	return async dispatch => {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		const body = JSON.stringify(education);
		try {
			const res = await axios.put("/api/profile/education", body, config);
			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data
			});
			history.push("./dashboard");
			dispatch(setAlert("Education Added Successfully", "success"));
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				return errors.forEach(error => {
					dispatch(setAlert(error.msg, "danger"));
				});
			}
			dispatch({
				type: PROFILE_ERROR
			});
		}
	};
};

//Add Experience
export const addExperience = (experience, history) => {
	return async dispatch => {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		const body = JSON.stringify(experience);
		try {
			const res = await axios.put("/api/profile/experience", body, config);
			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data
			});
			history.push("./dashboard");
			dispatch(setAlert("Experience Added Successfully", "success"));
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				return errors.forEach(error => {
					dispatch(setAlert(error.msg, "danger"));
				});
			}
			dispatch({
				type: PROFILE_ERROR
			});
		}
	};
};

//Remove Experience
export const deleteExperience = expId => {
	return async dispatch => {
		try {
			const res = await axios.delete(`/api/profile/experience/${expId}`);
			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data
			});
			dispatch(setAlert("Experience Removed Successfully", "success"));
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				return errors.forEach(error => {
					dispatch(setAlert(error.msg, "danger"));
				});
			}
			dispatch({
				type: PROFILE_ERROR
			});
		}
	};
};
//Remove Education
export const deleteEducation = eduId => {
	return async dispatch => {
		try {
			const res = await axios.delete(`/api/profile/education/${eduId}`);
			dispatch({
				type: UPDATE_PROFILE,
				payload: res.data
			});
			dispatch(setAlert("Education Removed Successfully", "success"));
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				return errors.forEach(error => {
					dispatch(setAlert(error.msg, "danger"));
				});
			}
			dispatch({
				type: PROFILE_ERROR
			});
		}
	};
};

// Delete Account
export const deleteProfile = () => {
	return async dispatch => {
		if (
			window.confirm(
				"Are you sure want to DELETE your account, this is cant REDONE"
			)
		) {
			try {
				await axios.delete(`/api/profile`);
				dispatch({
					type: CLEAR_PROFILE
				});
				dispatch({
					type: ACCOUNT_DELETED
				});
			} catch (err) {
				const errors = err.response.data.errors;
				if (errors) {
					return errors.forEach(error => {
						dispatch(setAlert(error.msg, "danger"));
					});
				}
				dispatch({
					type: PROFILE_ERROR
				});
			}
		}
	};
};

// Get All Profiles
export const getAllProfiles = () => {
	return async dispatch => {
		try {
			const res = await axios.get("/api/profile");
			dispatch({
				type: GET_PROFILES,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	};
};

// Get profile by id
export const getProfileByUserID = id => {
	return async dispatch => {
		try {
			const res = await axios.get(`/api/profile/user/${id}`);
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	};
};

// Get Github repos
export const getGithubRepos = userName => {
	return async dispatch => {
		try {
			const res = await axios.get(`/api/profile/github/${userName}`);
			dispatch({
				type: GET_GITHUB_REPOS,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	};
};
