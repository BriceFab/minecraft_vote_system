import React, { Component } from "react";
import { withStyles, Button } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import Person from "@material-ui/icons/Person";
import LockOutlined from "@material-ui/icons/LockOutlined";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import loginPageStyle from "../../templates/material-kit/assets/jss/material-kit-react/views/loginPage.jsx";
import combineStyles from "../../services/combineStyles.js";
import { Field, reduxForm } from 'redux-form';
import TextField from './fields/text-field';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { register } from '../../actions/user';
import { validateForm, confirmation } from "redux-form-validators";
import userValidator from "../../validators/user.js";
import styles from '../../theme/styles/loginStyle';

const combinedStyles = combineStyles(loginPageStyle, styles);

class RegisterForm extends Component {
  onSubmit({ ...props }) {
    this.props.register(props).then((res) => {
      if (res && res.success) {
        this.props.history.push('/login');
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
            label="Pseudonyme"
            icon={<Person className={classes.inputIconsColor} />}
            formControlProps={{
              fullWidth: true
            }}
          />
          <Field
            name="email"
            component={TextField}
            label="Email"
            icon={<Email className={classes.inputIconsColor} />}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: 'email',
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
            name={'confirmation'}
            component={TextField}
            label="Confirmation du mot de passe"
            icon={<VerifiedUser className={classes.inputIconsColor} />}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: 'password',
              autoComplete: "off"
            }}
            validate={confirmation({ field: 'password', fieldLabel: 'Mot de passe' })}
          />
        </div>
        <Button
          className={classes.signInButton}
          color={'primary'}
          disabled={pristine || submitting}
          size={'large'}
          variant="contained"
          type={'submit'}>
          S'inscrire
        </Button>
      </form >
    );
  }
}

const validate = validateForm({
  username: userValidator.username,
  email: userValidator.email,
  password: userValidator.password,
})

const form = {
  form: 'RegisterForm',
  validate,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    register
  }, dispatch)
}

export default reduxForm(form)(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(RegisterForm)));