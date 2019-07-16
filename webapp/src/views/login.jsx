import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import LoginForm from '../components/forms/login';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import styles from '../theme/styles/loginStyle';
import LoginLayout from './layouts/login-layout';
import { Helmet } from "react-helmet";
import CONFIG from '../config';

class LoginPage extends Component {
    componentWillMount() {
        if (this.props.loggedIn) {
            this.props.history.push('/');
            toast.warn('Vous êtes déjà connecté');
        }
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>{CONFIG.APP.NAME} - Se connecter</title>
                    <link rel="canonical" href={`${CONFIG.APP.FULL_URL}/login`} />
                    <meta charSet="utf-8" />
                    <meta name="description" content="TODO" />
                    <meta name="keywords" content="TODO" />
                </Helmet>

                <LoginLayout>
                    <LoginForm history={this.props.history} />
                </LoginLayout>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn && state.user.token,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));