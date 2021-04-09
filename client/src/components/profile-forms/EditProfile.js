import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { bindActionCreators } from 'redux';
import Spinner from '../layout/Spinner'

const EditProfile = ({ createProfile, getCurrentProfile, history, profile: { profile, loading } }) => {
    const [showSocialInput, setSocialInput] = useState(false);
    const [formData, setFormData] = useState({
        status: '',
        skills: '',
        location: '',
        company: '',
        website: '',
        bio: '',
        gitHubUserName: '',
        youtube: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: ''
    });

    useEffect(() => {
        getCurrentProfile();
        if (profile) {
            setFormData({
                status: loading || !profile.status ? '' : profile.status,
                skills: loading || !profile.skills ? '' : profile.skills.join(','),
                location: loading || !profile.location ? '' : profile.location,
                company: loading || !profile.company ? '' : profile.company,
                website: loading || !profile.website ? '' : profile.website,
                bio: loading || !profile.bio ? '' : profile.bio,
                gitHubUserName: loading || !profile.gitHubUserName ? '' : profile.gitHubUserName,
                youtube: loading || !profile.social?.youtube ? '' : profile.social.youtube,
                facebook: loading || !profile.social?.facebook ? '' : profile.social.facebook,
                twitter: loading || !profile.social?.twitter ? '' : profile.social.twitter,
                instagram: loading || !profile.social?.instagram ? '' : profile.social.instagram,
                linkedin: loading || !profile.social?.linkedin ? '' : profile.social.linkedin
            });
        }
    }, [loading, getCurrentProfile, profile]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, true, history);
    }
    if (!profile && loading) {
        return <Spinner />
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
                Update Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Update your information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => { onSubmit(e) }}>
                <div className="form-group">
                    <select name="status" value={formData.status} onChange={(e) => { onChange(e) }}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={formData.company} onChange={(e) => { onChange(e) }} />
                    <small className="form-text">Could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={formData.website} onChange={(e) => { onChange(e) }} />
                    <small className="form-text">Could be your own or a company website</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={formData.location} onChange={(e) => { onChange(e) }} />
                    <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={formData.skills} onChange={(e) => { onChange(e) }} />
                    <small className="form-text">Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="gitHubUserName"
                        value={formData.gitHubUserName}
                        onChange={(e) => { onChange(e) }}
                    />
                    <small className="form-text">If you want your latest repos and a Github link, include your username</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" value={formData.bio} name="bio" onChange={(e) => { onChange(e) }}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button type="button" className="btn btn-light" onClick={() => { setSocialInput(!showSocialInput) }}>
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                {
                    showSocialInput && <Fragment>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={formData.twitter} onChange={(e) => { onChange(e) }} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={formData.facebook} onChange={(e) => { onChange(e) }} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={formData.youtube} onChange={(e) => { onChange(e) }} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value={formData.linkedin} onChange={(e) => { onChange(e) }} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" value={formData.instagram} name="instagram" onChange={(e) => { onChange(e) }} />
                        </div>
                    </Fragment>
                }
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        profile: state.profile
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: bindActionCreators(createProfile, dispatch),
        getCurrentProfile: bindActionCreators(getCurrentProfile, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));