import React, { Component } from "react";
import { withStyles, Typography, Button } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import LockOutlined from "@material-ui/icons/LockOutlined";
import { Field, reduxForm } from 'redux-form';
import { validateForm } from 'redux-form-validators';
import TextField from './fields/text-field';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { login } from '../../actions/user';
import userValidator from "../../validators/user.js";
import styles from '../../theme/styles/loginStyle';
import { Link } from 'react-router-dom'

class LoginForm extends Component {
  onSubmit({ ...props }) {
    this.props.login(props).then((res) => {
      if (res && res.success) {
        this.props.history.push('/');
      }
    });
  }

  render() {
    const { classes, handleSubmit, pristine, submitting } = this.props;

    return (
      <form className={classes.form} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Typography
          className={classes.title}
          variant="h2"
        >
          Connectez-vous
                      </Typography>
        <div className={classes.fields}>

          <Field
            name="username"
            component={TextField}
            label="Pseudonyme ou email"
            icon={<Person className={classes.inputIconsColor} />}
            formControlProps={{
              fullWidth: true
            }}
          />

          <Field
            name="password"
            component={TextField}
            label="Mot de passe"
            icon={<LockOutlined className={classes.inputIconsColor} />}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: 'password',
              autoComplete: "off"
            }}
          />
        </div>

        <Button
          className={classes.signInButton}
          color={'primary'}
          disabled={pristine || submitting}
          size={'large'}
          variant="contained"
          type={'submit'}
        >
          Connexion
              </Button>
        <Typography
          className={classes.signUp}
          variant="body1"
        >
          Pas encore de compte?{' '}
          <Link
            className={classes.signUpUrl}
            to="/sign-up"
          >
            S'enregistrer
                    </Link>
        </Typography>
      </form>
    );
  }
}

const validate = validateForm({
  username: userValidator.username,
  password: userValidator.password,
})

const form = {
  form: 'LoginForm',
  validate,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login
  }, dispatch)
}

export default reduxForm(form)(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginForm)));