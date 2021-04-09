import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getProfileByUserID, getGithubRepos } from "../../actions/profile";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithubRepos from "./ProfileGithubRepos";

const ProfileView = ({
	auth: { user },
	profile: { profile, loading },
	getProfileByUserID,
	match
}) => {
	useEffect(
		() => {
			getProfileByUserID(match.params.id);
		},
		[getProfileByUserID, match.params.id],
		profile && profile.gitHubUserName
	);
	return loading ? (
		<Spinner />
	) : !profile ? (
		<p>profile Not Found</p>
	) : (
		<Fragment>
			<Link to="/developers" className="btn btn-light">
				Back To Profiles
			</Link>
			{user && user._id === profile.user._id && (
				<Link to="/edit-profile" className="btn btn-light">
					Edit Profile
				</Link>
			)}
			<div className="profile-grid my-1">
				<ProfileTop profile={profile} />
				<ProfileAbout profile={profile} />
				{profile.experience && profile.experience.length > 0 ? (
					<ProfileExperience experience={profile.experience} />
				) : (
					<span>No Experience Credentials Found</span>
				)}
				{profile.education && profile.education.length > 0 ? (
					<ProfileEducation education={profile.education} />
				) : (
					<span>No Education Credentials Found</span>
				)}
				{profile.gitHubUserName && (
					<ProfileGithubRepos gitHubUserName={profile.gitHubUserName} />
				)}
			</div>
		</Fragment>
	);
};

ProfileView.propTypes = {
	getProfileByUserID: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		profile: state.profile
	};
};

export default connect(mapStateToProps, { getProfileByUserID, getGithubRepos })(
	withRouter(ProfileView)
);
