import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

const ProfileGithubRepos = ({
	gitHubUserName,
	getGithubRepos,
	repos,
	loading
}) => {
	useEffect(() => {
		getGithubRepos(gitHubUserName);
	}, [gitHubUserName, getGithubRepos]);
	console.log(repos);
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					{repos && repos.length > 0 ? (
						<div className="profile-github">
							<h2 className="text-primary my-1">
								<i className="fab fa-github"></i> Github Repos
							</h2>
							{repos.map((repo, index) => {
								return (
									<div className="repo bg-white p-1 my-1" key={repo.id}>
										<div>
											<h4>
												<a
													href={repo.html_url}
													target="_blank"
													rel="noopener noreferrer"
												>
													{repo.full_name}
												</a>
											</h4>
											<p>{repo.description}</p>
										</div>
										<div>
											<ul>
												<li className="badge badge-primary">
													Stars: {repo.stargazers_count}
												</li>
												<li className="badge badge-dark">
													Watchers: {repo.watchers_count}
												</li>
												<li className="badge badge-light">
													Forks: {repo.forks}
												</li>
											</ul>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						"No Github Repos Found"
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

ProfileGithubRepos.propTypes = {
	gitHubUserName: PropTypes.string.isRequired,
	getGithubRepos: PropTypes.func.isRequired,
	repos: PropTypes.array,
	loading: PropTypes.bool
};

const mapStateToProps = ({ profile }) => {
	return {
		repos: profile.repos,
		loading: profile.loading
	};
};

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithubRepos);
