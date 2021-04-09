import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/developers">Developers</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</Fragment>
	);
	const authLinks = (
		<Fragment>
			<li>
				<Link to="/posts">Posts</Link>
			</li>
			<li>
				<Link to="/dashboard">
					<i className="fas fa-user" />{" "}
					<span className="hide-sm">Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/developers">Developers</Link>
			</li>
			<li>
				<Link to="/login" onClick={logout}>
					<i className="fas fa-sign-out-alt" />{" "}
					<span className="hide-sm">Logout</span>
				</Link>
			</li>
		</Fragment>
	);
	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<i className="fas fa-code"></i> DevConnector
				</Link>
			</h1>
			<ul>{!loading && isAuthenticated ? authLinks : guestLinks}</ul>
		</nav>
	);
};
const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};
Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
};
export default connect(mapStateToProps, { logout })(Navbar);
