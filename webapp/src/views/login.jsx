import React, { Component } from "react";
import { withStyles, Grid } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Button from "../templates/material-kit/components/CustomButtons/Button.jsx";
import IconButton from '@material-ui/core/IconButton';
import loginPageStyle from "../templates/material-kit/assets/jss/material-kit-react/views/loginPage.jsx";
import Card from "../templates/material-kit/components/Card/Card.jsx";
import combineStyles from "../services/combineStyles.js";
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import LoginForm from '../components/forms/login';
import RegisterForm from '../components/forms/register';
import { connect } from 'react-redux';
import { toast } from "react-toastify";

const styles = theme => ({
    appBar: {
        position: 'relative',
        color: '#fff',
        background: 'linear-gradient(60deg, #851099, #8e24aa)',
        boxShadow: '0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    cardTop: {
        paddingTop: '18vh',
    },
    btnRegister: {
        fontWeight: 'bold',
    }
});

const combinedStyles = combineStyles(loginPageStyle, styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoginForm: true
        }
    }

    componentWillMount() {
        if (this.props.loggedIn) {
            this.props.history.push('/');
            toast.warn('Vous êtes déjà connecté');
        }
    }

    swichForm() {
        this.setState({ isLoginForm: !this.state.isLoginForm })
    }

    render() {
        const { classes } = this.props;
        const { isLoginForm } = this.state;

        return (
            <Dialog fullScreen open={true} TransitionComponent={Transition}>
                <AppBar color={'primary'} className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="Close" onClick={() => { this.props.history.push('/') }}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Compte
                        </Typography>
                        <Button round color="rose" className={classes.btnRegister} onClick={this.swichForm.bind(this)}>
                            {isLoginForm ? 'Créer un compte' : 'Se connecter'}
                        </Button>
                    </Toolbar>
                </AppBar>

                <Grid container justify={'center'} className={classes.cardTop}>
                    <Grid item>
                        <Card>
                            {isLoginForm && <LoginForm history={this.props.history} />}
                            {!isLoginForm && <RegisterForm showLogin={this.swichForm.bind(this)} />}
                        </Card>
                    </Grid>
                </Grid>

            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn && state.user.token,
});

export default connect(mapStateToProps)(withStyles(combinedStyles)(Login));