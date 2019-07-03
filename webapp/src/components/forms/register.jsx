import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import Person from "@material-ui/icons/Person";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Button from "../../templates/material-kit/components/CustomButtons/Button.jsx";
import CardBody from "../../templates/material-kit/components/Card/CardBody.jsx";
import CardHeader from "../../templates/material-kit/components/Card/CardHeader.jsx";
import CardFooter from "../../templates/material-kit/components/Card/CardFooter.jsx";
import loginPageStyle from "../../templates/material-kit/assets/jss/material-kit-react/views/loginPage.jsx";
import combineStyles from "../../services/combineStyles.js";
import { Field, reduxForm } from 'redux-form';
import TextField from './fields/text-field';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { register } from '../../actions/user';
import { validateForm } from "redux-form-validators";
import userValidator from "../../validators/user.js";

const styles = theme => ({
});

const combinedStyles = combineStyles(loginPageStyle, styles);

class RegisterForm extends Component {
  onSubmit({ ...props }) {
    this.props.register(props).then((res) => {
      if (res && res.success) {
        this.props.showLogin();
      }
    });
  }

  render() {
    const { classes, handleSubmit, pristine, submitting } = this.props;

    return (
      <form className={classes.form} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <CardHeader color="primary" className={classes.cardHeader}>
          <h4>S'enregistrer</h4>
        </CardHeader>
        <CardBody>

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

        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <Button type={'submit'} simple color="primary" size="lg" disabled={pristine || submitting}>
            Connexion
          </Button>
        </CardFooter>
      </form>
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