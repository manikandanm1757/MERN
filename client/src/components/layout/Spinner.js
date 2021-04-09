import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => {
    return (
        <Fragment>
            <img src={spinner} alt="spinner" style={{ width: '200px', height: '200px', margin: 'auto' }} />
        </Fragment>
    )
}
