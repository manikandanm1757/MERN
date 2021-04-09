import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import PropTypes from "prop-types";

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getAllProfiles();
	}, [getAllProfiles]);
	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary">Developers</h1>
			<p className="lead">
				<i className="fab fa-connectdevelop"></i> Browse and connect with
				developers
			</p>
			<div className="profiles">
				{profiles &&
					profiles.length > 0 &&
					profiles.map((profile, index) => {
						return <ProfileItem key={index} profile={profile} />;
					})}
			</div>
		</Fragment>
	);
};

Profiles.propTypes = {
	profile: PropTypes.object.isRequired,
	getAllProfiles: PropTypes.func.isRequired
};
const mapStateToProps = state => {
	return {
		profile: state.profile
	};
};
export default connect(mapStateToProps, { getAllProfiles })(Profiles);
