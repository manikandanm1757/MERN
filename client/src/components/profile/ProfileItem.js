import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
	profile: {
		user: { name, avatar, _id },
		company,
		location,
		status,
		skills
	}
}) => {
	return (
		<Fragment>
			<div className="profile bg-light">
				<img className="round-img" src={avatar} alt="" />
				<div>
					<h2>{name}</h2>
					<p>
						{status} at {company}
					</p>
					<p>{location && location}</p>
					<Link to={`profile/${_id}`} className="btn btn-primary">
						View Profile
					</Link>
				</div>

				<ul>
					{skills &&
						skills.length > 0 &&
						skills.map((skill, index) => {
							return (
								<li className="text-primary" key={index}>
									<i className="fas fa-check"></i> {skill}
								</li>
							);
						})}
				</ul>
			</div>
		</Fragment>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
