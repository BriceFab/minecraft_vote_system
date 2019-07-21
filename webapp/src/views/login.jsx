import React, { Component } from "react";
import { withStyles, Typography } from "@material-ui/core";
import LoginForm from '../components/forms/login';
import { connect } from 'react-redux';
import styles from '../theme/styles/loginStyle';
import LoginLayout from './layouts/login-layout';
import { Helmet } from "react-helmet";
import CONFIG from '../config';
import { Link } from 'react-router-dom'

class LoginPage extends Component {
    componentWillMount() {
        if (this.props.loggedIn) {
            this.props.history.push('/');
            // toast.warn('Vous êtes déjà connecté');
        }
    }

    render() {
        const { classes } = this.props;

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
                    <div className={classes.form}>
                        <Typography
                            className={classes.title}
                            variant="h2">
                            Connectez-vous
                      </Typography>
                        <LoginForm history={this.props.history} />
                        <Typography
                            className={classes.signUp}
                            variant="body1"
                        >
                            Pas encore de compte?{' '}
                            <Link
                                className={classes.signUpUrl}
                                to="/register"
                            >
                                S'enregistrer
                    </Link>
                        </Typography>
                    </div>
                </LoginLayout>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn && state.user.token,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));