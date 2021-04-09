import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({ experience }) => {
	return (
		<div className="profile-exp bg-white p-2">
			<h2 className="text-primary">Experience</h2>
			{experience.map(exp => {
				return (
					<div key={exp._id}>
						<h3 className="text-dark">{exp.company}</h3>
						<p>
							<Moment format="YYYY/MM/DD">
								{new Date(exp.from).toISOString()}
							</Moment>
							-
							{exp.current
								? "Current"
								: exp.to && (
										<Moment format="YYYY/MM/DD">
											{new Date(exp.to).toISOString()}
										</Moment>
								  )}
						</p>
						<p>
							{exp.status && (
								<Fragment>
									<strong>Position: </strong> {exp.status}
								</Fragment>
							)}
						</p>
						<p>
							{exp.description && (
								<Fragment>
									<strong>Description: </strong>
									{exp.description}
								</Fragment>
							)}
						</p>
					</div>
				);
			})}
		</div>
	);
};

ProfileExperience.propTypes = {
	experience: PropTypes.array.isRequired
};

export default ProfileExperience;
