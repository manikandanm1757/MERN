import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { getCurrentProfile, deleteProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Education from './Education';
import Experience from './Experience';

const Dashboard = ({ profile: { profile, loading }, auth: { user }, getCurrentProfile, deleteProfile }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return loading && !profile ?
        <Spinner /> :
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
            {!profile ?
                <Fragment>
                    <p>You have not yet setup your profile, please add some info</p>
                    <Link to="./create-profile" className="btn btn-primary my-1">Create Profile</Link>
                </Fragment> :
                <Fragment>
                    <div className="dash-buttons">
                        <Link to="/edit-profile" className="btn btn-light">
                            <i className="fas fa-user-circle text-primary"></i> Edit Profile
                        </Link>
                        <Link to="/add-experience" className="btn btn-light">
                            <i className="fab fa-black-tie text-primary"></i> Add Experience
                        </Link>
                        <Link to="/add-education" className="btn btn-light">
                            <i className="fas fa-graduation-cap text-primary"></i> Add Education
                        </Link>
                    </div>
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={() => { deleteProfile(); }}>
                            <i className="fas fa-user mx-1"></i>
                            {'  '}Delete My Account
                        </button>
                    </div>
                </Fragment>
            }
        </Fragment>
}

Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentProfile: bindActionCreators(getCurrentProfile, dispatch),
        deleteProfile: bindActionCreators(deleteProfile, dispatch)
    }
}
const mapStateToProps = ({ profile, auth }) => {
    return { profile, auth };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
