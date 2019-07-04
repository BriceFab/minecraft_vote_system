import React, { Component } from "react";
import { withStyles, Paper, Grid, Typography, MenuItem } from "@material-ui/core";
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
import SelectField from './fields/select-field';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { register } from '../../actions/user';
import { validateForm } from "redux-form-validators";
import userValidator from "../../validators/user.js";
import { isMobile } from "react-device-detect";

const styles = theme => ({
  root: {
    // margin: '90px 30px',
    margin: `90px ${isMobile ? '26px' : '13px'} 0px 26px`,
    padding: 25,
  },
  title: {
    textDecoration: 'underline',
    fontWeight: 'bold'
  },
  gridItem: {
    paddingBottom: 15
  }
});

const combinedStyles = combineStyles(loginPageStyle, styles);

class ServerForm extends Component {
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
      <Paper className={classes.root}>
        <Grid container>
          <Grid item xs={12} className={classes.gridItem}>
            <Typography className={classes.title} color={'primary'} variant={'h3'} component={'h1'}>
              Ajouter un serveur
          </Typography>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <Field
              name="type"
              component={SelectField}
              label="Pseudonyme ou email"
              icon={<Person className={classes.inputIconsColor} />}
              formControlProps={{
                fullWidth: true
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
            </Field>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <Field
              name="name"
              component={TextField}
              label="Nom"
              icon={<Person className={classes.inputIconsColor} />}
              formControlProps={{
                fullWidth: true
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const validate = validateForm({
  username: userValidator.username,
  email: userValidator.email,
  password: userValidator.password,
})

const form = {
  form: 'ServerForm',
  validate,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    register
  }, dispatch)
}

export default reduxForm(form)(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(ServerForm)));