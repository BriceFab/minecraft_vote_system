import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default () => Component => {
    class RequiredAuth extends React.Component {
        render() {
            const { loggedIn, ...passThroughProps } = this.props;

            if (loggedIn) {
                return <Component {...passThroughProps} />;
            } else {
                return <Redirect to={'/login'} />
            }
        }
    }

    const mapStateToProps = (state) => ({
        loggedIn: state.user.loggedIn && state.user.token,
    });

    return connect(mapStateToProps)(RequiredAuth);
};