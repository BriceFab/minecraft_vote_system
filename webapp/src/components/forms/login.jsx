import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
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
import { login } from '../../actions/user';

const styles = theme => ({
});

const combinedStyles = combineStyles(loginPageStyle, styles);

class LoginForm extends Component {
  onSubmit({ ...props }) {
    //TODO VALIDATOR
    this.props.login(props, this.props.history).then((res) => {
      if (res && res.success) {
        this.props.history.push('/');
      }
    });
  }

  render() {
    const { classes, handleSubmit, pristine, submitting } = this.props;

    return (
      <form className={classes.form} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <CardHeader color="primary" className={classes.cardHeader}>
          <h4>Connectez-vous</h4>
        </CardHeader>
        <CardBody>

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

const form = {
  form: 'LoginForm',
  // validate,
  // asyncValidate,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login
  }, dispatch)
}

export default reduxForm(form)(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(LoginForm)));