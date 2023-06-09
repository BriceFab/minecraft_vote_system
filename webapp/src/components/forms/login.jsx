import React, { Component } from "react";
import { withStyles, Button } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import LockOutlined from "@material-ui/icons/LockOutlined";
import { Field, reduxForm } from 'redux-form';
import { validateForm } from 'redux-form-validators';
import TextField from './fields/text-field';
import Switch from './fields/switch';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { login } from '../../actions/user';
import userValidator from "../../validators/user.js";
import styles from '../../theme/styles/loginStyle';
import CONFIG from "../../config";

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
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
          <Field
            name="remember"
            component={Switch}
            label="Se souvenir de moi"
            inputProps={{
              color: 'primary',
            }}
          />
        </div>
        <Button
          className={classes.signInButton}
          color={'primary'}
          disabled={JSON.parse(localStorage.getItem(CONFIG.STORAGE.REMEMBER)) === true ? false : pristine || submitting}
          size={'large'}
          variant="contained"
          type={'submit'}>
          Connexion
        </Button>
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
  initialValues: JSON.parse(localStorage.getItem(CONFIG.STORAGE.REMEMBER)) === true ? {
    remember: localStorage.getItem(CONFIG.STORAGE.REMEMBER),
    username: localStorage.getItem(CONFIG.STORAGE.USERNAME),
    password: localStorage.getItem(CONFIG.STORAGE.PASSWORD),
  } : {}
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login
  }, dispatch)
}

export default reduxForm(form)(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginForm)));