import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ education }) => {
	return (
		<div className="profile-edu bg-white p-2">
			<h2 className="text-primary">Education</h2>
			{education.map(
				({
					_id,
					school,
					from,
					to,
					current,
					fieldOfStudy,
					description,
					degree
				}) => {
					return (
						<div key={_id}>
							<h3>{school}</h3>
							<p>
								<Moment format="YYYY/MM">{new Date(from).toISOString()}</Moment>
								-
								{current
									? "Current"
									: to && (
											<Moment format="YYYY/MM">
												{new Date(to).toISOString()}
											</Moment>
									  )}
							</p>
							<p>
								{degree && (
									<Fragment>
										<strong>Degree: </strong>
										{degree}
									</Fragment>
								)}
							</p>
							<p>
								{fieldOfStudy && (
									<Fragment>
										<strong>Field Of Study: </strong>
										{fieldOfStudy}
									</Fragment>
								)}
							</p>
							<p>
								{description && (
									<Fragment>
										<strong>Description: </strong>
										{description}
									</Fragment>
								)}
							</p>
						</div>
					);
				}
			)}
		</div>
	);
};

ProfileEducation.propTypes = {
	education: PropTypes.array.isRequired
};

export default ProfileEducation;
