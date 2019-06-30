import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default () => Component => {
    class RequiredAuth extends React.Component {

        render() {
            const { authenticating, loggedIn, error, ...passThroughProps } = this.props;

            if (authenticating) {
                return (
                    <div>
                        Login en cours
                    </div>
                );
            } else if (!loggedIn || error) {
                return <Redirect to={'/login'} />
            }
            
            return <Component {...passThroughProps} />;
        }

    }

    const mapStateToProps = (state, props) => ({
        authenticating: state.auth.loading,
        loggedIn: state.auth.app_user !== null,
        error: state.auth.error
    });

    return connect(mapStateToProps)(RequiredAuth);
};